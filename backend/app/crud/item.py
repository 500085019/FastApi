from sqlalchemy.orm import Session
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


# 🔹 Get all items (with pagination)
def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Item).offset(skip).limit(limit).all()


# 🔹 Get single item by ID
def get_item(db: Session, item_id: int):
    return db.query(Item).filter(Item.id == item_id).first()


# 🔹 Create new item
def create_item(db: Session, item: ItemCreate):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# 🔹 Update item
def update_item(db: Session, item_id: int, item: ItemUpdate):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    
    if not db_item:
        return None

    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


# 🔹 Delete item
def delete_item(db: Session, item_id: int):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    
    if not db_item:
        return None

    db.delete(db_item)
    db.commit()
    return db_item


# 🔹 Get items for a specific user
def get_user_items(db: Session, user_id: int):
    return db.query(Item).filter(Item.owner_id == user_id).all()