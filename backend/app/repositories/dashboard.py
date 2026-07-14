from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.product import Product


# ======================================================
# DASHBOARD STATS
# ======================================================
def get_dashboard_stats(db: Session):
    total_products = db.query(Product).count()

    inventory_value = (
        db.query(
            func.coalesce(
                func.sum(Product.price * Product.quantity),
                0
            )
        ).scalar()
    )

    low_stock = (
        db.query(Product)
        .filter(Product.quantity <= 10)
        .count()
    )

    categories = (
        db.query(Product.category)
        .distinct()
        .count()
    )

    recent_products = (
        db.query(Product)
        .order_by(Product.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_products": total_products,
        "inventory_value": inventory_value,
        "low_stock": low_stock,
        "categories": categories,
        "recent_products": recent_products,
    }