from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)
from app.services.product import (
    create_product_service,
    get_all_products_service,
    get_product_by_id_service,
    update_product_service,
    delete_product_service,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.post("/", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product_service(db, product)


@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return get_all_products_service(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id_service(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
):
    updated = update_product_service(db, product_id, product)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    deleted = delete_product_service(db, product_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}