#!/bin/bash

# Set Python to unbuffered mode (useful for logging)
export PYTHONUNBUFFERED=1

# Start FastAPI using Uvicorn
uvicorn sentiment_fastapi:app --host 0.0.0.0 --port 10000
