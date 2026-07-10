from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


# ======================================================
# CREATE PRODUCT
# ======================================================
def create_product(
    db: Session,
    product: ProductCreate,
):
    db_product = Product(
        product_name=product.product_name,
        category=product.category,
        brand=product.brand,
        size=product.size,
        color=product.color,
        price=product.price,
        quantity=product.quantity,
        image_url=product.image_url,
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


# ======================================================
# GET ALL PRODUCTS
# ======================================================
def get_all_products(
    db: Session,
    search: str = None,
    category: str = None,
    brand: str = None,
    color: str = None,
    size: str = None,
    min_price: float = None,
    max_price: float = None,
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    order: str = "asc",
):
    query = db.query(Product)

    # ---------------- Search ----------------
    if search:
        query = query.filter(
            or_(
                Product.product_name.ilike(f"%{search}%"),
                Product.category.ilike(f"%{search}%"),
                Product.brand.ilike(f"%{search}%"),
                Product.color.ilike(f"%{search}%"),
            )
        )

    # ---------------- Filters ----------------
    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))

    if brand:
        query = query.filter(Product.brand.ilike(f"%{brand}%"))

    if color:
        query = query.filter(Product.color.ilike(f"%{color}%"))

    if size:
        query = query.filter(Product.size.ilike(f"%{size}%"))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    total = query.count()

    # ---------------- Sorting ----------------
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

    # ---------------- Pagination ----------------
    offset = (page - 1) * limit

    products = query.offset(offset).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit,
        "data": products,
    }


# ======================================================
# GET PRODUCT BY ID
# ======================================================
def get_product_by_id(
    db: Session,
    product_id: int,
):
    return db.query(Product).filter(Product.id == product_id).first()


# ======================================================
# UPDATE PRODUCT
# ======================================================
def update_product(
    db: Session,
    product_id: int,
    product: ProductUpdate,
):
    db_product = get_product_by_id(db, product_id)

    if not db_product:
        return None

    update_data = product.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)

    return db_product


# ======================================================
# DELETE PRODUCT
# ======================================================
def delete_product(
    db: Session,
    product_id: int,
):
    db_product = get_product_by_id(db, product_id)

    if not db_product:
        return None

    db.delete(db_product)
    db.commit()

    return db_product


# ======================================================
# UPDATE PRODUCT IMAGE
# ======================================================
def update_product_image(
    db: Session,
    product_id: int,
    image_url: str,
):
    product = get_product_by_id(db, product_id)

    if not product:
        return None

    product.image_url = image_url

    db.commit()
    db.refresh(product)

    return product