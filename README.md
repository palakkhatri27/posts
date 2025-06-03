<h1> Posts App with Sentiment Analysis </h1>
<table border="1">
  <thead>
    <tr>
      <th>Service</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend (Vercel)</td>
      <td><a href="https://posts-eta-ashen.vercel.app/" target="_blank">posts-eta-ashen.vercel.app</a></td>
    </tr>
    <tr>
      <td>Node.js API</td>
      <td><a href="https://dashboard.render.com/web/srv-d0uo67ripnbc73elej50" target="_blank">NodeJS Backend</a></td>
    </tr>
    <tr>
      <td>FastAPI Sentiment API</td>
      <td><a href="https://dashboard.render.com/web/srv-d0v8ojfdiees73ck4qe0" target="_blank">FastAPI Backend</a></td>
    </tr>
    <tr>
      <td>PostgreSQL DB</td>
      <td><a href="https://dashboard.render.com/d/dpg-d0uoirbe5dus739uck90-a" target="_blank">Render DB Dashboard</a></td>
    </tr>
  </tbody>
</table>
<hr>
Features <br>
- Create, read, update, and delete blog posts <br>
- Analyze sentiment of blog content or user input (Positive, Negative, Neutral) <br>
- Backend API (CRUD): Node.js/Express (Render) <br>
    Character count in C++ included with NodeJS
- Sentiment API: FastAPI + nltk (OnRender) <br>
- Frontend: React (Vite, deployed on Vercel) <br>
<hr>
Project Structure<br>
/client           # React frontend (Vercel) <br>
/backend          # Express backend (Render) <br>
/sentiment-api    # FastAPI sentiment analyzer (OnRender) <br>
<hr>
<h2>NodeJS API Endpoints</h2>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/</code></td>
      <td>Get paginated list of posts</td>
      <td>–</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/post/:id</code></td>
      <td>Get a specific post by ID</td>
      <td>–</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/create</code></td>
      <td>Create a new post</td>
      <td><code>title</code>, <code>body</code>, <code>userId</code> (form data)</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/post/:id</code></td>
      <td>Update a post by ID</td>
      <td><code>title</code>, <code>body</code> (form data)</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/delete/:id</code></td>
      <td>Delete a post by ID</td>
      <td>–</td>
    </tr>
  </tbody>
</table>

<hr />
<h2>FastAPI Endpoints</h2>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/</code></td>
      <td>Welcome message</td>
      <td>–</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/analyze</code></td>
      <td>Analyze sentiment of input text</td>
      <td><code>{ "text": "Your text here" }</code></td>
    </tr>
  </tbody>
</table>



