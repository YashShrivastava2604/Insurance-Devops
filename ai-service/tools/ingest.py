import os
import pickle
import faiss
import numpy as np
from fastembed import TextEmbedding

DATA_PATH = "data/insurance_knowledge.txt"
VECTOR_PATH = "vectorstore/faiss_index"
CHUNKS_PATH = "vectorstore/chunks.pkl"


def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    chunks = [chunk.strip() for chunk in text.split("\n") if chunk.strip()]
    return chunks


def create_embeddings(chunks):
    model = TextEmbedding("sentence-transformers/all-MiniLM-L6-v2")

    # fastembed returns a generator, convert to list then stack into a numpy array
    embeddings_list = list(model.embed(chunks))
    embeddings = np.vstack(embeddings_list)

    return embeddings.astype("float32")


def build_faiss_index(embeddings):
    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    return index


def save(index, chunks):
    os.makedirs("vectorstore", exist_ok=True)

    faiss.write_index(index, VECTOR_PATH)

    with open(CHUNKS_PATH, "wb") as f:
        pickle.dump(chunks, f)


if __name__ == "__main__":
    print("Loading data...")
    chunks = load_data()

    print("Creating embeddings...")
    embeddings = create_embeddings(chunks)

    print("Embeddings shape:", embeddings.shape)

    print("Building FAISS index...")
    index = build_faiss_index(embeddings)

    print("Saving...")
    save(index, chunks)

    print("✅ FAISS index created successfully!")