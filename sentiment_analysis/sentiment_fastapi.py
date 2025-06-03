from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.data.path.append("nltk_data")

# Initialize FastAPI and Sentiment Analyzer
app = FastAPI()
sia = SentimentIntensityAnalyzer()

# Input model for post
class BlogPost(BaseModel):
    text: str

# Sentiment classifier function
def classify_sentiment(post: str) -> str:
    score = sia.polarity_scores(post)['compound']
    if score >= 0.05:
        return 'Positive'
    elif score <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'

# Error handler for empty string
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"error": "Missing or invalid text in request body."}
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to the Blog Sentiment API!"}

# POST endpoint for sentiment analysis
@app.post("/analyze")
def analyze_sentiment(post: BlogPost):
    sentiment = classify_sentiment(post.text)
    return {"sentiment": sentiment}