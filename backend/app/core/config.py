from pydantic import BaseSettings


class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "FastAPI Backend"
    DEBUG: bool = True

    # Database (default SQLite for now)
    DATABASE_URL: str = "sqlite:///./test.db"

    class Config:
        env_file = ".env"


# Create global settings object
settings = Settings()