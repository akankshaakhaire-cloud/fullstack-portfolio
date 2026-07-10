import time
import logging

from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("cloth_inventory")


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("===== MIDDLEWARE EXECUTED =====")

        start_time = time.time()

        response = await call_next(request)

        process_time = (time.time() - start_time) * 1000

        logger.info(
            "%s %s | Status: %s | %.2f ms",
            request.method,
            request.url.path,
            response.status_code,
            process_time,
        )

        return response