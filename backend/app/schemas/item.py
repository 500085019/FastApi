from pydantic import BaseModel
from typing import Optional

# Base schema (shared fields)
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    owner_id: int


# Create schema (used when creating item)
class ItemCreate(ItemBase):
    pass


# Update schema (used when updating item)
class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None


# Response schema (returned to frontend)
class ItemOut(ItemBase):
    id: int

    class Config:
        from_attributes = True   # for SQLAlchemy compatibility