from sqlalchemy import Column, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base, TimestampMixin
import uuid

class Transaction(Base, TimestampMixin):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    description = Column(String, nullable=True)
    category_id = Column(String, ForeignKey("categories.id"), nullable=True)
    transaction_date = Column(Date, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions") 