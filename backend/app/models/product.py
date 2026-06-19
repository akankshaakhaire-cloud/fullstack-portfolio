from sqlalchemy import Column, Integer, String, Float

from db.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    brand = Column(String(50))
    size = Column(String(20))
    color = Column(String(30))
    quantity = Column(Integer, default=0)
    price = Column(Float, nullable=False)