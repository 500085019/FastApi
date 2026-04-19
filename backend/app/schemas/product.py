from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None


class Product(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    stock: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
