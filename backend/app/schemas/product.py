from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    product_name: str
    category: Optional[str] = None
    brand: Optional[str] = None
    size: Optional[str] = None
    color: Optional[str] = None
    price: float
    quantity: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    product_name: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    size: Optional[str] = None
    color: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True