from fastapi import FastAPI
from app.core.settings import APP_NAME, APP_VERSION
from app.api.routers import product_router

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION
)
app.include_router(product_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Akanksha's Cloth Inventory API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }