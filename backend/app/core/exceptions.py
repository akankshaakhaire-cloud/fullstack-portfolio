import traceback

from fastapi.encoders import jsonable_encoder
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException


async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail
        }
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({
            "success": False,
            "message": "Validation Error",
            "errors": exc.errors()
        })
    )


async def generic_exception_handler(request: Request, exc: Exception):
    print("\n========== UNHANDLED EXCEPTION ==========")
    traceback.print_exception(type(exc), exc, exc.__traceback__)
    print("========================================")

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal Server Error"
        }
    )