from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.settings import APP_NAME, APP_VERSION
from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler,
)

from app.middleware.logging import LoggingMiddleware

from app.api.routers import product_router
from app.api.routers import user

from app.db.database import Base, engine

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Create FastAPI App
app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION
)

# Register Logging Middleware
app.add_middleware(LoggingMiddleware)

# Register Exception Handlers
app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    Exception,
    generic_exception_handler
)

# Include Routers
app.include_router(product_router)
app.include_router(user.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Akanksha & Abhishek's Cloth Inventory API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }