from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "FastAPI Backend"
    DEBUG: bool = True

    # Database - Use PostgreSQL on Render
    DATABASE_URL: str = "sqlite:///./test.db"

    model_config = {"env_file": ".env"}


# Create global settings object
settings = Settings()