from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

import os

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


# ======================================================
# CREATE REQUIRED DIRECTORIES
# ======================================================
os.makedirs("app/static/products", exist_ok=True)

# ======================================================
# CREATE DATABASE TABLES
# ======================================================
Base.metadata.create_all(bind=engine)

# ======================================================
# CREATE FASTAPI APPLICATION
# ======================================================
app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

# ======================================================
# REGISTER MIDDLEWARE
# ======================================================
app.add_middleware(LoggingMiddleware)

# ======================================================
# REGISTER EXCEPTION HANDLERS
# ======================================================
app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.add_exception_handler(
    Exception,
    generic_exception_handler,
)

# ======================================================
# STATIC FILES
# ======================================================
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static",
)

# ======================================================
# ROUTERS
# ======================================================
app.include_router(product_router)
app.include_router(user.router)


# ======================================================
# HOME
# ======================================================
@app.get("/")
def home():
    return {
        "message": "Welcome to Akanksha & Abhishek's Cloth Inventory API 🚀"
    }


# ======================================================
# HEALTH CHECK
# ======================================================
@app.get("/health")
def health():
    return {
        "status": "OK"
    }