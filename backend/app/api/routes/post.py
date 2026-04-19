from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.post import PostCreate, PostUpdate, Post
from app.crud import post as crud_post

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[Post])
def get_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_post.get_posts(db, skip, limit)


@router.post("/", response_model=Post)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    return crud_post.create_post(db, post)


@router.get("/{post_id}", response_model=Post)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = crud_post.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.get("/author/{author_id}", response_model=list[Post])
def get_author_posts(author_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_post.get_author_posts(db, author_id, skip, limit)


@router.put("/{post_id}", response_model=Post)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    db_post = crud_post.update_post(db, post_id, post)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = crud_post.delete_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted"}
