from app.db.database import Base, engine
from app.models.product import Product
from app.models.user import User

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")