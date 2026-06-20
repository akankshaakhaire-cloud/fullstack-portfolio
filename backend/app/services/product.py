from sqlalchemy.orm import Session

from app.repositories.product_repository import (
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
)

from app.schemas.product import ProductCreate, ProductUpdate


def create_product_service(db: Session, product: ProductCreate):
    return create_product(db, product)


def get_all_products_service(db: Session):
    return get_all_products(db)


def get_product_by_id_service(db: Session, product_id: int):
    return get_product_by_id(db, product_id)


def update_product_service(db: Session, product_id: int, product: ProductUpdate):
    return update_product(db, product_id, product)


def delete_product_service(db: Session, product_id: int):
    return delete_product(db, product_id)