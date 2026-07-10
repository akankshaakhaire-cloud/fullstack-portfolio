from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class ProductBase(BaseModel):
    product_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Product Name"
    )

    category: Optional[str] = Field(
        default=None,
        max_length=50
    )

    brand: Optional[str] = Field(
        default=None,
        max_length=50
    )

    size: Optional[str] = Field(
        default=None,
        max_length=20
    )

    color: Optional[str] = Field(
        default=None,
        max_length=30
    )

    price: float = Field(
        ...,
        gt=0,
        description="Price must be greater than 0"
    )

    quantity: int = Field(
        ...,
        ge=0,
        description="Quantity cannot be negative"
    )


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    product_name: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100
    )

    category: Optional[str] = Field(
        default=None,
        max_length=50
    )

    brand: Optional[str] = Field(
        default=None,
        max_length=50
    )

    size: Optional[str] = Field(
        default=None,
        max_length=20
    )

    color: Optional[str] = Field(
        default=None,
        max_length=30
    )

    price: Optional[float] = Field(
        default=None,
        gt=0
    )

    quantity: Optional[int] = Field(
        default=None,
        ge=0
    )


class ProductResponse(ProductBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )