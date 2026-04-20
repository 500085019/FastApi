from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.user import UserCreate
from app.crud import user as crud_user
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.api.rate_limits import RATE_LIMITS
from app.api.deps import get_db

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

# DB dependency

@router.get("/")
@limiter.limit(RATE_LIMITS["get_all"])
def get_users(
    request: Request,
    skip: int = Query(0, ge=0, description="Number of users to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of users to return (max 100)"),
    db: Session = Depends(get_db)
):
    """Get all users with pagination. Rate limited to 100 requests per minute."""
    return crud_user.get_users(db, skip, limit)

@router.post("/")
@limiter.limit(RATE_LIMITS["create"])
def create_user(request: Request, user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user. Rate limited to 50 requests per minute."""
    return crud_user.create_user(db, user)

@router.get("/{user_id}")
@limiter.limit(RATE_LIMITS["get_single"])
def get_user(request: Request, user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID. Rate limited to 200 requests per minute."""
    user = crud_user.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
@limiter.limit(RATE_LIMITS["delete"])
def delete_user(request: Request, user_id: int, db: Session = Depends(get_db)):
    """Delete a user by ID. Rate limited to 50 requests per minute."""
    user = crud_user.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}