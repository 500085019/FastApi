from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.comment import CommentCreate, CommentUpdate, Comment
from app.crud import comment as crud_comment
from app.api.deps import get_db

router = APIRouter()

@router.get("/", response_model=list[Comment])
def get_comments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_comment.get_comments(db, skip, limit)


@router.post("/", response_model=Comment)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    return crud_comment.create_comment(db, comment)


@router.get("/{comment_id}", response_model=Comment)
def get_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud_comment.get_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment


@router.get("/post/{post_id}", response_model=list[Comment])
def get_post_comments(post_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_comment.get_post_comments(db, post_id, skip, limit)


@router.get("/author/{author_id}", response_model=list[Comment])
def get_author_comments(author_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_comment.get_author_comments(db, author_id, skip, limit)


@router.put("/{comment_id}", response_model=Comment)
def update_comment(comment_id: int, comment: CommentUpdate, db: Session = Depends(get_db)):
    db_comment = crud_comment.update_comment(db, comment_id, comment)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment


@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud_comment.delete_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment deleted"}
