const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const { Pool } = require("pg");
const countChar = require("./build/Release/countChar");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
const port = 4000;
const API_URL = "https://jsonplaceholder.typicode.com/posts";

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Render’s self-signed certs
    },
    max: process.env.PG_MAX,
    connectionTimeoutMillis: process.env.PG_CONNTIMEOUT,
    idleTimeoutMillis: process.env.PG_IDLETIMEOUT,
});


// Use public folder for static files.
app.use(express.static('public'));

function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
    next();
}

async function getAllPosts(page = 1) {
    const LIMIT = 9;
    const offset = (page - 1) * LIMIT;
    const result = await pool.query(
        "SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2",
        [LIMIT, offset]
    );
    return result.rows;
}

async function insertPosts(postsList) {
    for (const post of postsList) {
        try {
            // Check if the user exists
            const userCheckQuery = `SELECT id FROM users WHERE id = $1`;
            const userCheckResult = await pool.query(userCheckQuery, [post.userId]);

            // If user does not exist, insert the user
            if (userCheckResult.rowCount === 0) {
                const insertUserQuery = `INSERT INTO users (id) VALUES ($1)`;
                await pool.query(insertUserQuery, [post.userId]);
                console.log(`Inserted new user with id: ${post.userId}`);
            }

            // Insert post after checking userId
            const insertPostQuery = `
                INSERT INTO posts (userId, id, title, body)
                VALUES ($1, $2, $3, $4)
            `;
            const postValues = [post.userId, post.id, post.title, post.body];
            const result = await pool.query(insertPostQuery, postValues);
        } catch (error) {
            console.error(`Error processing post with id ${post.id}:`, error);
        }
    } 
}

// Homepage
// Get all posts (with pagination)
app.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const posts = await getAllPosts(page);
        // Send only userId, id and title
        const filteredPosts = posts.map(post => ({
            id: post.id,
            userId: post.userid,
            title: post.title,
        }));
        return res.status(200).json(filteredPosts);
    } catch (error) {
        console.error("Failed to get all posts:", error.response);
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


// Get all posts from demo api
app.get('/fromApi', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const LIMIT = 9;
    const startIndex = (page - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;
    try {
        const response = await axios.get(API_URL);
        const result = response.data;
        const paginatedPosts = result.slice(startIndex, endIndex);
        const filteredPosts = paginatedPosts.map(post => ({
            id: post.id,
            userId: post.userId,
            title: post.title
        }));
        return res.status(200).json(filteredPosts);
    } catch (error) {
        console.error("Failed to make request:", error.response.data);
    }
});

// Get post with id
app.get('/post/:id', async (req, res) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = result.rows[0];
        const charTitle = countChar.countChars(post.title);
        const charBody = countChar.countChars(post.body);

        return res.status(200).json({
            id: post.id,
            userId: post.userid,
            title: post.title,
            charTitle: charTitle,
            body: post.body,
            charBody: charBody,
        });
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update title or body or both
app.put('/post/:id', authenticateApiKey, async (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, body } = req.body;
    
    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    if (!title && !body) {
        return res.status(400).json({ error: 'Nothing to update' });
    } else {
        try {
            const fields = [];
            const values = [];
            let index = 1;

            if (title) {
                fields.push(`title = $${index++}`);
                values.push(title);
            }

            if (body) {
                fields.push(`body = $${index++}`);
                values.push(body);
            }

            values.push(postId);
            const result = await pool.query(`
                UPDATE posts
                SET ${fields.join(', ')}
                WHERE id = $${index}
            `, values);

            return res.status(200).json({ error: 'Post updated successfully' });;
        } catch (error) {
            console.error('Update failed:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Function to persist data from API_URL to our own postgresql database
app.post('/insertfromapi', authenticateApiKey, async (req, res) => {
    const response = await axios.get(API_URL);
    const result = response.data;
    await insertPosts(result);
    return res.redirect('/');
});

// Create a new post
app.post('/create', authenticateApiKey, async (req, res) => {
    const { userId, title, body } = req.body;

    if (!userId || !title || !body) {
        return res.status(400).json({ error: 'userId, title, and body are required' });
    }

    try {
        // Ensure user exists
        const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);

        if (userCheck.rowCount === 0) {
            await pool.query('INSERT INTO users (id) VALUES ($1)', [userId]);
        }

        // Insert new post
        const insertPostQuery = `
            INSERT INTO posts (userId, title, body)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const result = await pool.query(insertPostQuery, [userId, title, body]);

        return res.status(201).json({ message: 'Post created successfully', postId: result.rows[0].id });
    } catch (error) {
        console.error('Failed to create post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a post by ID
app.delete('/delete/:id', authenticateApiKey, async (req, res) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1', [postId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Failed to delete post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});