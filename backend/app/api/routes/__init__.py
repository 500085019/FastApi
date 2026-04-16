# app package initializer

from fastapi import FastAPI

def create_app() -> FastAPI:
    app = FastAPI(title="FastAPI Backend", version="1.0.0")
    return app