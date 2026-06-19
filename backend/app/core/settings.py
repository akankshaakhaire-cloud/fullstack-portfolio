from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "Cloth Inventory API")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

DEBUG = os.getenv("DEBUG", "False").lower() == "true"

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8000))

DATABASE_URL = os.getenv("DATABASE_URL")