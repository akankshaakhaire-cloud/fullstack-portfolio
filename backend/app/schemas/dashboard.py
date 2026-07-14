from pydantic import BaseModel, ConfigDict

from app.schemas.product import ProductResponse


class DashboardStats(BaseModel):
    total_products: int
    inventory_value: float
    low_stock: int
    categories: int
    recent_products: list[ProductResponse]

    model_config = ConfigDict(
        from_attributes=True
    )