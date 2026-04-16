from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import user, item


def create_app() -> FastAPI:
    app = FastAPI(
        title="FastAPI Backend",
        version="1.0.0"
    )

    # CORS (important for frontend connection)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # change to frontend URL in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routes
    app.include_router(user.router, prefix="/users", tags=["Users"])
    app.include_router(item.router, prefix="/items", tags=["Items"])

    return app