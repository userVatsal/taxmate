from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, transactions, reports, users

app = FastAPI(
    title="TaxMate API",
    description="API for TaxMate - AI-Powered UK Tax Assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["Transactions"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to TaxMate API",
        "version": "1.0.0",
        "docs_url": "/docs"
    } 