from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.order import OrderCreate, OrderUpdate, Order
from app.crud import order as crud_order
from app.api.deps import get_db

router = APIRouter()

@router.get("/", response_model=list[Order])
def get_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_order.get_orders(db, skip, limit)


@router.post("/", response_model=Order)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return crud_order.create_order(db, order)


@router.get("/{order_id}", response_model=Order)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = crud_order.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("/user/{user_id}", response_model=list[Order])
def get_user_orders(user_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_order.get_user_orders(db, user_id, skip, limit)


@router.put("/{order_id}", response_model=Order)
def update_order(order_id: int, order: OrderUpdate, db: Session = Depends(get_db)):
    db_order = crud_order.update_order(db, order_id, order)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order


@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = crud_order.delete_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted"}
