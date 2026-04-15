from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from datetime import datetime
from repo import UserRepository, ItemRepository
from models import (
    User, UserCreate, UserUpdate, Item, ItemCreate,
    BaseResponse, PaginationParams
)


api_router = APIRouter()

# Initialize repositories
user_repo = UserRepository()
item_repo = ItemRepository()


# User Endpoints
@api_router.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate):
    """Create a new user"""
    try:
        # Check if user already exists
        existing_user = await user_repo.read_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        new_user = await user_repo.create({
            **user_data.dict(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/users", response_model=List[User])
async def get_users(skip: int = 0, limit: int = 10):
    """Get all users with pagination"""
    try:
        users = await user_repo.read_all(skip=skip, limit=limit)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a user by ID"""
    try:
        user = await user_repo.read(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user_update: UserUpdate):
    """Update a user"""
    try:
        user_exists = await user_repo.exists(user_id)
        if not user_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        updated_user = await user_repo.update(user_id, {
            **user_update.dict(exclude_unset=True),
            "updated_at": datetime.utcnow()
        })
        return updated_user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    """Delete a user"""
    try:
        user_exists = await user_repo.exists(user_id)
        if not user_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        await user_repo.delete(user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Item Endpoints
@api_router.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item_data: ItemCreate, owner_id: int):
    """Create a new item"""
    try:
        # Verify owner exists
        owner_exists = await user_repo.exists(owner_id)
        if not owner_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Owner user not found"
            )

        new_item = await item_repo.create({
            **item_data.dict(),
            "owner_id": owner_id,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        return new_item
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/items", response_model=List[Item])
async def get_items(skip: int = 0, limit: int = 10):
    """Get all items with pagination"""
    try:
        items = await item_repo.read_all(skip=skip, limit=limit)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    """Get an item by ID"""
    try:
        item = await item_repo.read(item_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found"
            )
        return item
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/users/{user_id}/items", response_model=List[Item])
async def get_user_items(user_id: int, skip: int = 0, limit: int = 10):
    """Get all items for a specific user"""
    try:
        user_exists = await user_repo.exists(user_id)
        if not user_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        items = await item_repo.read_by_owner(user_id, skip=skip, limit=limit)
        return items
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    """Delete an item"""
    try:
        item_exists = await item_repo.exists(item_id)
        if not item_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found"
            )
        await item_repo.delete(item_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
