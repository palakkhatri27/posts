import axios from "axios";

export default class ApiService {
    static API_BASE_URL  = "https://postsbackend-csln.onrender.com";
    static API_KEY = process.env.REACT_APP_API_KEY;

    static get authHeaders() {
        return {
            "x-api-key": this.API_KEY
        };
    }

    static async getPosts(page = 1) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    static async getPostById(id) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}/post/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch post with id ${id}:`, error);
        }
    }

    static async updatePost(postId, postData) {
        try {
            const response = await axios.put(`${this.API_BASE_URL}/post/${postId}`, postData, {
                headers: {
                    ...this.authHeaders,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to update post with id ${postId}:`, error);
        }
    }

    static async createPost(postData) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/create`, postData, {
                headers: {
                    ...this.authHeaders,
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    }

    static async deletePost(postId) {
        try {
            const response = await axios.delete(`${this.API_BASE_URL}/delete/${postId}`, {
                headers: this.authHeaders,
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to delete post with id ${postId}:`, error);
        }
    }
}