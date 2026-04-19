from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CommentCreate(BaseModel):
    content: str
    post_id: int
    author_id: int


class CommentUpdate(BaseModel):
    content: Optional[str] = None


class Comment(BaseModel):
    id: int
    content: str
    post_id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
