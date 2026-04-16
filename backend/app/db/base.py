from app.core.database import Base

# Import all models here so SQLAlchemy knows them
from app.models.user import User
from app.models.item import Item

# This file ensures models are loaded before creating tables
__all__ = ["Base", "User", "Item"]