from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base, TimestampMixin
import uuid

class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # income/expense
    parent_id = Column(String, ForeignKey("categories.id"), nullable=True)
    
    # Relationships
    parent = relationship("Category", remote_side=[id], backref="subcategories")
    transactions = relationship("Transaction", back_populates="category") 