from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OrderCreate(BaseModel):
    user_id: int
    total_price: float
    status: str = "pending"


class OrderUpdate(BaseModel):
    total_price: Optional[float] = None
    status: Optional[str] = None


class Order(BaseModel):
    id: int
    user_id: int
    total_price: float
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
