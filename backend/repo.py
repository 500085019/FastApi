from typing import List, Optional, Dict, Any
from abstract import AbstractRepository
from models import User, Item, UserCreate, UserUpdate, ItemCreate


# Mock database storage
users_db: List[Dict[str, Any]] = []
items_db: List[Dict[str, Any]] = []


class UserRepository(AbstractRepository):
    """Repository for User operations"""

    async def create(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user"""
        user_id = len(users_db) + 1
        new_user = {
            "id": user_id,
            "username": user_data["username"],
            "email": user_data["email"],
            "first_name": user_data.get("first_name"),
            "last_name": user_data.get("last_name"),
            "is_active": True,
            "created_at": user_data.get("created_at"),
            "updated_at": user_data.get("updated_at")
        }
        users_db.append(new_user)
        return new_user

    async def read(self, id: int) -> Optional[Dict[str, Any]]:
        """Read a user by ID"""
        for user in users_db:
            if user["id"] == id:
                return user
        return None

    async def read_all(self, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Read all users with pagination"""
        return users_db[skip:skip + limit]

    async def update(self, id: int, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update a user"""
        for i, user in enumerate(users_db):
            if user["id"] == id:
                users_db[i].update(update_data)
                return users_db[i]
        return None

    async def delete(self, id: int) -> bool:
        """Delete a user"""
        for i, user in enumerate(users_db):
            if user["id"] == id:
                users_db.pop(i)
                return True
        return False

    async def exists(self, id: int) -> bool:
        """Check if user exists"""
        return any(user["id"] == id for user in users_db)

    async def read_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Read a user by email"""
        for user in users_db:
            if user["email"] == email:
                return user
        return None


class ItemRepository(AbstractRepository):
    """Repository for Item operations"""

    async def create(self, item_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new item"""
        item_id = len(items_db) + 1
        new_item = {
            "id": item_id,
            "title": item_data["title"],
            "description": item_data.get("description"),
            "price": item_data["price"],
            "owner_id": item_data.get("owner_id"),
            "created_at": item_data.get("created_at"),
            "updated_at": item_data.get("updated_at")
        }
        items_db.append(new_item)
        return new_item

    async def read(self, id: int) -> Optional[Dict[str, Any]]:
        """Read an item by ID"""
        for item in items_db:
            if item["id"] == id:
                return item
        return None

    async def read_all(self, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Read all items with pagination"""
        return items_db[skip:skip + limit]

    async def update(self, id: int, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an item"""
        for i, item in enumerate(items_db):
            if item["id"] == id:
                items_db[i].update(update_data)
                return items_db[i]
        return None

    async def delete(self, id: int) -> bool:
        """Delete an item"""
        for i, item in enumerate(items_db):
            if item["id"] == id:
                items_db.pop(i)
                return True
        return False

    async def exists(self, id: int) -> bool:
        """Check if item exists"""
        return any(item["id"] == id for item in items_db)

    async def read_by_owner(self, owner_id: int, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Read items by owner ID"""
        owner_items = [item for item in items_db if item["owner_id"] == owner_id]
        return owner_items[skip:skip + limit]
