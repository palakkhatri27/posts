<h1> Posts App with Sentiment Analysis </h1>
<hr>
Features <br>
- Create, read, update, and delete blog posts <br>
- Analyze sentiment of blog content or user input (Positive, Negative, Neutral) <br>
- Backend API (CRUD): Node.js/Express (Render) <br>
- Sentiment API: FastAPI + nltk (OnRender) <br>
- Frontend: React (Vite, deployed on Vercel) <br>
<hr>
Project Structure<br>
/client           # React frontend (Vercel) <br>
/backend          # Express backend (Render) <br>
/sentiment-api    # FastAPI sentiment analyzer (OnRender) <br>
<hr>
NodeJS API Endpoints
| Method | Endpoint      | Description                 | Body                                  |
| ------ | ------------- | --------------------------- | ------------------------------------- |
| GET    | `/`           | Get paginated list of posts | –                                     |
| GET    | `/post/:id`   | Get a specific post by ID   | –                                     |
| POST   | `/create`     | Create a new post           | `title`, `body`, `userId` (form data) |
| PUT    | `/post/:id`   | Update a post by ID         | `title`, `body` (form data)           |
| DELETE | `/delete/:id` | Delete a post by ID         | –                                     |
<hr>
FastAPI Endpoints
| Method | Endpoint   | Description                     | Body                              |
| ------ | ---------- | ------------------------------- | --------------------------------- |
| GET    | `/`        | Welcome message                 | –                                 |
| POST   | `/analyze` | Analyze sentiment of input text | `{ "text": "Your text here" }`    |


