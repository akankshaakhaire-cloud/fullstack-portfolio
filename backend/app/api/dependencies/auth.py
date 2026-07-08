from fastapi import Depends, HTTPException, Header, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.user_repository import get_user_by_email
from app.core.security import decode_access_token
from app.models.user import User


def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    print("\n========== AUTH DEBUG ==========")
    print("Authorization Header:", authorization)

    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )

    token = authorization.replace("Bearer ", "")
    print("Token:", token)

    payload = decode_access_token(token)
    print("Payload:", payload)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    email = payload.get("sub")
    print("Email:", email)

    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user = get_user_by_email(db, email)
    print("User:", user)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user


def require_role(*allowed_roles):
    """
    Role-Based Access Control (RBAC)

    Example:
    Depends(require_role("admin"))
    Depends(require_role("admin", "manager"))
    """

    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to perform this action."
            )
        return current_user

    return role_checker
