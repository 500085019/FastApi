from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from app.core.database import Base, engine
from app.api.routes import item, user, product, order, category, post, comment

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="FastAPI Backend",
    description="A comprehensive API with multiple resources",
    version="1.0.0"
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda request, exc: JSONResponse(
    status_code=429,
    content={"detail": "Rate limit exceeded. Try again later."}
))

# Create tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(item.router, prefix="/api/items", tags=["items"])
app.include_router(user.router, prefix="/api/users", tags=["users"])
app.include_router(product.router, prefix="/api/products", tags=["products"])
app.include_router(order.router, prefix="/api/orders", tags=["orders"])
app.include_router(category.router, prefix="/api/categories", tags=["categories"])
app.include_router(post.router, prefix="/api/posts", tags=["posts"])
app.include_router(comment.router, prefix="/api/comments", tags=["comments"])

@app.get("/")
def read_root():
    return {
        "message": "API is working",
        "endpoints": {
            "items": "/api/items",
            "users": "/api/users",
            "products": "/api/products",
            "orders": "/api/orders",
            "categories": "/api/categories",
            "posts": "/api/posts",
            "comments": "/api/comments"
        },
        "docs": "/docs"
    }