from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.item import ItemCreate
from app.crud import item as crud_item

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_item.get_items(db, skip, limit)

@router.post("/")
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    return crud_item.create_item(db, item)

@router.get("/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = crud_item.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = crud_item.delete_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}

