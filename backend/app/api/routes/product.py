from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.product import ProductCreate, ProductUpdate, Product
from app.crud import product as crud_product
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.api.rate_limits import RATE_LIMITS
from app.api.deps import get_db

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)





@router.get("/", response_model=list[Product])
@limiter.limit(RATE_LIMITS["get_all"])
def get_products(
    request,
    skip: int = Query(0, ge=0, description="Number of products to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of products to return (max 100)"),
    db: Session = Depends(get_db)
):
    """Get all products with pagination. Rate limited to 100 requests per minute."""
    return crud_product.get_products(db, skip, limit)


@router.post("/", response_model=Product)
@limiter.limit(RATE_LIMITS["create"])
def create_product(request, product: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product. Rate limited to 50 requests per minute."""
    return crud_product.create_product(db, product)


@router.get("/{product_id}", response_model=Product)
@limiter.limit(RATE_LIMITS["get_single"])
def get_product(request, product_id: int, db: Session = Depends(get_db)):
    """Get a specific product by ID. Rate limited to 200 requests per minute."""
    product = crud_product.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}", response_model=Product)
@limiter.limit(RATE_LIMITS["update"])
def update_product(request, product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    """Update a product. Rate limited to 50 requests per minute."""
    db_product = crud_product.update_product(db, product_id, product)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.delete("/{product_id}")
@limiter.limit(RATE_LIMITS["delete"])
def delete_product(request, product_id: int, db: Session = Depends(get_db)):
    """Delete a product by ID. Rate limited to 50 requests per minute."""
    product = crud_product.delete_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}
