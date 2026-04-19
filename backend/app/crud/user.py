from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

def get_users(db: Session, skip: int = 0, limit: int = 10):
    """Get all users with pagination"""
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    """Create a new user"""
    db_user = User(
        username=user.username,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        password=user.password  # In production, hash this!
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    """Get a specific user by ID"""
    return db.query(User).filter(User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    """Delete a user"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user