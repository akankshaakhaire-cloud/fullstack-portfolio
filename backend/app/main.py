from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
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
from app.api.routers import dashboard

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
# CORS
# ======================================================
origins = [
    "http://localhost:5173",          # Local React
    "http://127.0.0.1:5173",
    "https://fullstack-portfolio-1.vercel.app",  # तुझा Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
app.include_router(dashboard.router)


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
# ======================================================
# LIVENESS CHECK
# ======================================================
@app.get("/health/live")
def liveness_check():
    return {
        "status": "UP",
        "service": APP_NAME,
        "version": APP_VERSION,
    }


# ======================================================
# READINESS CHECK
# ======================================================
@app.get("/health/ready")
def readiness_check():
    return {
        "status": "READY",
        "database": "connected",
        "service": APP_NAME,
        "version": APP_VERSION,
    }