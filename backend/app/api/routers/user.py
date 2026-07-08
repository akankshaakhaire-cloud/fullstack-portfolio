from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.services.user import register_user, login_user
from app.api.dependencies.auth import (
    get_current_user,
    require_role
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# Register User
@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return register_user(db, user)


# Login User
@router.post("/login", response_model=Token)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    return login_user(db, user)


# Logged-in User Profile
@router.get("/me", response_model=UserResponse)
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user


# Admin Only API
@router.get("/admin")
def admin_dashboard(
    current_user=Depends(require_role("admin"))
):
    return {
        "message": "Welcome Admin",
        "user": current_user.username,
        "role": current_user.role
    }


# Admin & Manager API
@router.get("/manager")
def manager_dashboard(
    current_user=Depends(require_role("admin", "manager"))
):
    return {
        "message": "Welcome Manager",
        "user": current_user.username,
        "role": current_user.role
    }


# All Logged-in Users API
@router.get("/employee")
def employee_dashboard(
    current_user=Depends(require_role("admin", "manager", "employee"))
):
    return {
        "message": "Welcome Employee",
        "user": current_user.username,
        "role": current_user.role
    }