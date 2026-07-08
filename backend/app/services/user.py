from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.schemas.user import UserCreate, UserLogin
from app.repositories.user_repository import create_user, get_user_by_email
from app.core.security import verify_password, create_access_token


def register_user(db: Session, user: UserCreate):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    return create_user(db, user)


def login_user(db: Session, user: UserLogin):
    print("\n========== LOGIN DEBUG ==========")
    print("Input Email:", user.email)

    db_user = get_user_by_email(db, user.email)

    print("DB User:", db_user)

    if not db_user:
        print("❌ User not found")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_match = verify_password(
        user.password,
        db_user.hashed_password
    )

    print("Password Match:", password_match)

    if not password_match:
        print("❌ Password does not match")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("✅ Login Successful")

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    print("Generated Token:", access_token[:30], "...")

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }