from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel

from app.core.database import get_db
from app.models.user import User
from app.models.transaction import Transaction
from app.models.category import Category
from app.api.v1.auth import get_current_user

router = APIRouter()

class TaxSummary(BaseModel):
    total_income: float
    total_expenses: float
    net_profit: float
    estimated_tax: float
    tax_year: str

class CategoryBreakdown(BaseModel):
    category_name: str
    total_amount: float
    percentage: float

class TaxBreakdown(BaseModel):
    income_tax: float
    national_insurance: float
    total_tax: float
    tax_year: str

@router.get("/tax-summary", response_model=TaxSummary)
async def get_tax_summary(
    tax_year: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get start and end dates for tax year
    start_date = date(int(tax_year.split('/')[0]), 4, 6)
    end_date = date(int(tax_year.split('/')[1]), 4, 5)
    
    # Calculate total income
    income = db.query(func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= start_date,
        Transaction.date <= end_date,
        Transaction.amount > 0
    ).scalar() or 0
    
    # Calculate total expenses
    expenses = db.query(func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= start_date,
        Transaction.date <= end_date,
        Transaction.amount < 0
    ).scalar() or 0
    
    # Calculate net profit
    net_profit = income + expenses
    
    # Calculate estimated tax (simplified calculation)
    estimated_tax = calculate_estimated_tax(net_profit)
    
    return TaxSummary(
        total_income=income,
        total_expenses=abs(expenses),
        net_profit=net_profit,
        estimated_tax=estimated_tax,
        tax_year=tax_year
    )

@router.get("/category-breakdown", response_model=List[CategoryBreakdown])
async def get_category_breakdown(
    tax_year: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get start and end dates for tax year
    start_date = date(int(tax_year.split('/')[0]), 4, 6)
    end_date = date(int(tax_year.split('/')[1]), 4, 5)
    
    # Get total amount for percentage calculation
    total = db.query(func.sum(func.abs(Transaction.amount))).filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= start_date,
        Transaction.date <= end_date
    ).scalar() or 0
    
    # Get category breakdown
    breakdown = db.query(
        Category.name,
        func.sum(func.abs(Transaction.amount)).label('total_amount')
    ).join(
        Transaction,
        Transaction.category_id == Category.id
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= start_date,
        Transaction.date <= end_date
    ).group_by(
        Category.name
    ).all()
    
    return [
        CategoryBreakdown(
            category_name=name,
            total_amount=amount,
            percentage=(amount / total * 100) if total > 0 else 0
        )
        for name, amount in breakdown
    ]

@router.get("/tax-breakdown", response_model=TaxBreakdown)
async def get_tax_breakdown(
    tax_year: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get tax summary
    summary = await get_tax_summary(tax_year, db, current_user)
    
    # Calculate income tax (simplified calculation)
    income_tax = calculate_income_tax(summary.net_profit)
    
    # Calculate National Insurance (simplified calculation)
    national_insurance = calculate_national_insurance(summary.net_profit)
    
    return TaxBreakdown(
        income_tax=income_tax,
        national_insurance=national_insurance,
        total_tax=income_tax + national_insurance,
        tax_year=tax_year
    )

def calculate_estimated_tax(net_profit: float) -> float:
    # Simplified tax calculation
    # TODO: Implement proper UK tax calculation
    if net_profit <= 12570:  # Personal Allowance
        return 0
    elif net_profit <= 50270:  # Basic rate
        return (net_profit - 12570) * 0.20
    elif net_profit <= 125140:  # Higher rate
        return (50270 - 12570) * 0.20 + (net_profit - 50270) * 0.40
    else:  # Additional rate
        return (50270 - 12570) * 0.20 + (125140 - 50270) * 0.40 + (net_profit - 125140) * 0.45

def calculate_income_tax(net_profit: float) -> float:
    # Simplified income tax calculation
    # TODO: Implement proper UK income tax calculation
    return calculate_estimated_tax(net_profit)

def calculate_national_insurance(net_profit: float) -> float:
    # Simplified National Insurance calculation
    # TODO: Implement proper UK National Insurance calculation
    if net_profit <= 12570:  # Primary Threshold
        return 0
    elif net_profit <= 50270:  # Upper Earnings Limit
        return (net_profit - 12570) * 0.12
    else:
        return (50270 - 12570) * 0.12 + (net_profit - 50270) * 0.02 