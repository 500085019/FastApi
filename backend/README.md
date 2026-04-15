# FastAPI Backend

## Installation

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `/docs`

## Project Structure

```
backend/
├── main.py              # FastAPI application entry point
├── models.py            # Pydantic data models
├── abstract.py          # Abstract base classes
├── repo.py              # Repository implementations
├── router.py            # API routes
├── requirements.txt     # Python dependencies
└── .gitignore
```

## API Endpoints

### User Endpoints
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update a user
- `DELETE /api/users/{user_id}` - Delete a user

### Item Endpoints
- `GET /api/items` - Get all items (with pagination)
- `GET /api/items/{item_id}` - Get item by ID
- `GET /api/users/{user_id}/items` - Get items by owner
- `DELETE /api/items/{item_id}` - Delete an item

## Features

- FastAPI framework
- CORS middleware enabled
- Pydantic models for validation
- Abstract repository pattern
- Mock in-memory database
- Comprehensive error handling
- API documentation with Swagger UI

## Environment

No environment variables required for basic setup. The server runs on `http://0.0.0.0:8000` by default.
