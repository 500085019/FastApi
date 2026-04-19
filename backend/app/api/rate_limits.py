# Rate limiting configurations for different endpoints

RATE_LIMITS = {
    "get_all": "100/minute",        # GET all items with pagination
    "get_single": "200/minute",     # GET single item by ID
    "create": "50/minute",          # POST/CREATE
    "update": "50/minute",          # PUT/UPDATE
    "delete": "50/minute",          # DELETE
}
