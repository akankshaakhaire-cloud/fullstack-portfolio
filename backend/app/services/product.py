from sqlalchemy.orm import Session

from app.repositories.product_repository import (
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
    update_product_image,
)

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
)


# ======================================================
# CREATE PRODUCT
# ======================================================
def create_product_service(
    db: Session,
    product: ProductCreate,
):
    return create_product(db, product)


# ======================================================
# GET ALL PRODUCTS
# ======================================================
def get_all_products_service(
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
    return get_all_products(
        db=db,
        search=search,
        category=category,
        brand=brand,
        color=color,
        size=size,
        min_price=min_price,
        max_price=max_price,
        page=page,
        limit=limit,
        sort_by=sort_by,
        order=order,
    )


# ======================================================
# GET PRODUCT BY ID
# ======================================================
def get_product_by_id_service(
    db: Session,
    product_id: int,
):
    return get_product_by_id(db, product_id)


# ======================================================
# UPDATE PRODUCT
# ======================================================
def update_product_service(
    db: Session,
    product_id: int,
    product: ProductUpdate,
):
    return update_product(
        db,
        product_id,
        product,
    )


# ======================================================
# DELETE PRODUCT
# ======================================================
def delete_product_service(
    db: Session,
    product_id: int,
):
    return delete_product(
        db,
        product_id,
    )


# ======================================================
# UPDATE PRODUCT IMAGE
# ======================================================
def update_product_image_service(
    db: Session,
    product_id: int,
    image_url: str,
):
    return update_product_image(
        db,
        product_id,
        image_url,
    )