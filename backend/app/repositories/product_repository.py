from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product: ProductCreate):
    db_product = Product(
        product_name=product.product_name,
        category=product.category,
        brand=product.brand,
        size=product.size,
        color=product.color,
        price=product.price,
        quantity=product.quantity,
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


def get_all_products(
    db: Session,
    search: str = None,
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    order: str = "asc",
):

    query = db.query(Product)

    # Search
    if search:
        query = query.filter(
            or_(
                Product.product_name.ilike(f"%{search}%"),
                Product.category.ilike(f"%{search}%"),
                Product.brand.ilike(f"%{search}%"),
                Product.color.ilike(f"%{search}%"),
            )
        )

    # Sorting
    allowed_sort_fields = [
        "id",
        "product_name",
        "category",
        "brand",
        "price",
        "quantity",
    ]

    if sort_by not in allowed_sort_fields:
        sort_by = "id"

    column = getattr(Product, sort_by)

    if order.lower() == "desc":
        query = query.order_by(desc(column))
    else:
        query = query.order_by(asc(column))

    # Pagination
    offset = (page - 1) * limit

    return query.offset(offset).limit(limit).all()


def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, product: ProductUpdate):

    db_product = get_product_by_id(db, product_id)

    if not db_product:
        return None

    update_data = product.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)

    return db_product


def delete_product(db: Session, product_id: int):

    db_product = get_product_by_id(db, product_id)

    if not db_product:
        return None

    db.delete(db_product)
    db.commit()

    return db_product