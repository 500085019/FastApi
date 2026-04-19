from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.item import ItemCreate
from app.crud import item as crud_item
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
@limiter.limit("100/minute")
def get_items(
    request,
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of items to return (max 100)"),
    db: Session = Depends(get_db)
):
    """Get all items with pagination support. Rate limited to 100 requests per minute."""
    return crud_item.get_items(db, skip, limit)

@router.post("/")
@limiter.limit("50/minute")
def create_item(request, item: ItemCreate, db: Session = Depends(get_db)):
    """Create a new item. Rate limited to 50 requests per minute."""
    return crud_item.create_item(db, item)

@router.get("/{item_id}")
@limiter.limit("200/minute")
def get_item(request, item_id: int, db: Session = Depends(get_db)):
    """Get a specific item by ID. Rate limited to 200 requests per minute."""
    item = crud_item.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.delete("/{item_id}")
@limiter.limit("50/minute")
def delete_item(request, item_id: int, db: Session = Depends(get_db)):
    """Delete an item by ID. Rate limited to 50 requests per minute."""
    item = crud_item.delete_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}

