from fastapi import FastAPI, Query
from pydantic import BaseModel
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download VADER lexicon if not already downloaded
nltk.download('vader_lexicon')

# Initialize app and sentiment analyzer
app = FastAPI()
sia = SentimentIntensityAnalyzer()

# Request model
class SamplePost(BaseModel):
    text: str

# Sentiment classification function
def classify_sentiment(SamplePost: str) -> str:
    score = sia.polarity_scores(samplepost)['compound']
    if score >= 0.05:
        return 'Positive'
    elif score <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'

# API endpoint
@app.post("/analyze")
def analyze_sentiment(samplepost: SamplePost):
    sentiment = classify_sentiment(samplepost.text)
    return {"sentiment": sentiment}