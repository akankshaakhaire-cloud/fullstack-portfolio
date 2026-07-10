from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user import UserCreate
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


def login_user(db: Session, form_data: OAuth2PasswordRequestForm):
    print("\n========== LOGIN DEBUG ==========")

    try:
        # OAuth2 मध्ये username field मध्ये email येतो
        email = form_data.username

        print("Input Email:", email)

        db_user = get_user_by_email(db, email)
        print("DB User:", db_user)

        if not db_user:
            print("❌ User not found")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        print("Stored Hash:", db_user.hashed_password)

        password_match = verify_password(
            form_data.password,
            db_user.hashed_password
        )

        print("Password Match:", password_match)

        if not password_match:
            print("❌ Password does not match")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        access_token = create_access_token(
            data={"sub": db_user.email}
        )

        print("✅ Login Successful")
        print("Generated Token:", access_token)

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except Exception as e:
        print("===================================")
        print("LOGIN ERROR:", repr(e))
        print("===================================")
        raise