from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False)
    category = Column(String)
    brand = Column(String)
    size = Column(String)
    color = Column(String)
    price = Column(Float)
    quantity = Column(Integer)