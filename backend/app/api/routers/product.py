from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from enum import Enum
import os
import shutil
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.api.dependencies.auth import require_role

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductListResponse,
)

from app.services.product import (
    create_product_service,
    get_all_products_service,
    get_product_by_id_service,
    update_product_service,
    delete_product_service,
    update_product_image_service,
)


# ======================================================
# ENUMS
# ======================================================
class SortField(str, Enum):
    id = "id"
    product_name = "product_name"
    category = "category"
    brand = "brand"
    price = "price"
    quantity = "quantity"


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# ======================================================
# CREATE PRODUCT (Admin, Manager)
# ======================================================
@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin", "manager")),
):
    return create_product_service(db, product)


# ======================================================
# GET ALL PRODUCTS (Admin, Manager, Employee)
# ======================================================
@router.get("/", response_model=ProductListResponse)
def get_products(
    search: str | None = Query(default=None),
    category: str | None = Query(default=None),
    brand: str | None = Query(default=None),
    color: str | None = Query(default=None),
    size: str | None = Query(default=None),
    min_price: float | None = Query(default=None, ge=0),
    max_price: float | None = Query(default=None, ge=0),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    sort_by: SortField = Query(default=SortField.id),
    order: SortOrder = Query(default=SortOrder.asc),
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin", "manager", "employee")),
):
    # Validate price range
    if (
        min_price is not None
        and max_price is not None
        and min_price > max_price
    ):
        raise HTTPException(
            status_code=400,
            detail="min_price cannot be greater than max_price"
        )

    return get_all_products_service(
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
        sort_by=sort_by.value,
        order=order.value,
    )


# ======================================================
# GET PRODUCT BY ID (Admin, Manager, Employee)
# ======================================================
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin", "manager", "employee")),
):
    product = get_product_by_id_service(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# ======================================================
# UPDATE PRODUCT (Admin, Manager)
# ======================================================
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin", "manager")),
):
    updated_product = update_product_service(
        db,
        product_id,
        product
    )

    if updated_product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return updated_product


# ======================================================
# DELETE PRODUCT (Admin Only)
# ======================================================
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin")),
):
    deleted = delete_product_service(db, product_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product deleted successfully"
    }


# ======================================================
# UPLOAD PRODUCT IMAGE (Admin, Manager)
# ======================================================
@router.post("/{product_id}/upload-image")
def upload_product_image(
    product_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_role("admin", "manager")),
):
    allowed_extensions = [".jpg", ".jpeg", ".png"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG files are allowed."
        )

    upload_directory = os.path.join(
        "app",
        "static",
        "products"
    )

    os.makedirs(upload_directory, exist_ok=True)

    filename = f"{product_id}_{file.filename}"

    file_path = os.path.join(
        upload_directory,
        filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/static/products/{filename}"

    product = update_product_image_service(
        db,
        product_id,
        image_url,
    )

    if product is None:
        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Image uploaded successfully",
        "image_url": image_url
    }