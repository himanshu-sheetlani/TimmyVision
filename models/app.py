from fastapi import FastAPI
from pydantic import BaseModel
from tavily import TavilyClient
from transformers import pipeline
from keybert import KeyBERT

# --------- Config ---------
TAVILY_API_KEY = "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"  # put your key here

# --------- Load once ---------
tavily_client = TavilyClient(api_key=TAVILY_API_KEY)
sentiment_pipeline = pipeline("sentiment-analysis")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
kw_model = KeyBERT()

CATEGORIES = ["disaster", "political", "terrorism", "social", "economy", "military"]

# --------- FastAPI app ---------
app = FastAPI(title="News Analysis API")

class Query(BaseModel):
    title: str

def analyze_text(text: str):
    # Sentiment
    sentiment = sentiment_pipeline(text[:512])[0]

    # Categorization
    category = classifier(text, candidate_labels=CATEGORIES)
    best_category = {
        "label": category["labels"][0],
        "score": round(category["scores"][0], 3)
    }

    # Semantic keywords
    keywords = [kw[0] for kw in kw_model.extract_keywords(text, top_n=5)]

    return {
        "sentiment": sentiment["label"].lower(),
        "sentiment_score": round(sentiment["score"], 3),
        "category": best_category,
        "keywords": keywords
    }

@app.post("/analyze")
def analyze(query: Query):
    # Search Tavily with input title
    response = tavily_client.search(query.title)

    if not response["results"]:
        return {"error": "No results found from Tavily"}

    # Take first result
    first_result = response["results"][0]
    text = (first_result.get("title", "") + " " + first_result.get("content", "")).strip()

    if not text:
        return {"error": "No content available in Tavily result"}

    analysis = analyze_text(text)

    return {
        "query": query.title,
        "source": first_result["url"],
        "title": first_result["title"],
        "analysis": analysis
    }