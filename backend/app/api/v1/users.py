from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.models.user import User
from app.api.v1.auth import get_current_user

router = APIRouter()

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class UserSettingsUpdate(BaseModel):
    tax_year: Optional[str] = None
    tax_regime: Optional[str] = None
    utr: Optional[str] = None
    email_notifications: Optional[bool] = None
    sms_notifications: Optional[bool] = None

class UserProfileResponse(BaseModel):
    id: str
    email: str
    full_name: str
    phone: Optional[str] = None
    tax_year: Optional[str] = None
    tax_regime: Optional[str] = None
    utr: Optional[str] = None
    email_notifications: bool = True
    sms_notifications: bool = False

    class Config:
        from_attributes = True

@router.get("/profile", response_model=UserProfileResponse)
async def get_user_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.put("/profile", response_model=UserProfileResponse)
async def update_user_profile(
    profile: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if email is already taken
    if profile.email and profile.email != current_user.email:
        existing_user = db.query(User).filter(User.email == profile.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # Update user profile
    for key, value in profile.model_dump(exclude_unset=True).items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/settings", response_model=UserProfileResponse)
async def update_user_settings(
    settings: UserSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Update user settings
    for key, value in settings.model_dump(exclude_unset=True).items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.delete("/account")
async def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Delete user's transactions
    db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).delete()
    
    # Delete user's categories
    db.query(Category).filter(
        Category.user_id == current_user.id
    ).delete()
    
    # Delete user
    db.delete(current_user)
    db.commit()
    
    return {"message": "Account deleted successfully"}

@router.post("/export-data")
async def export_user_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # TODO: Implement data export
    # 1. Get all user data
    # 2. Format data
    # 3. Generate export file
    # 4. Return download URL
    
    return {"message": "Data export initiated"} 