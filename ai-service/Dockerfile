FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .

# Install dependencies (no giant PyTorch downloads will happen now!)
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download the FastEmbed model so it's baked into the image
RUN python -c "from fastembed import TextEmbedding; TextEmbedding('sentence-transformers/all-MiniLM-L6-v2')"

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]