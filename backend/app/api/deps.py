from typing import Generator
from app.core.database import SessionLocal
from sqlalchemy.orm import Session


# 🔹 Dependency to get DB session
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()