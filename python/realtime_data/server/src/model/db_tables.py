from sqlalchemy import Column, INTEGER, String
from sqlalchemy.ext.declarative import declarative_base
from src.config.db_config import engine

Base = declarative_base()

class OrderDetail(Base):
    __tablename__ = 'order_detail'
    order_id = Column(String, primary_key=True)
    user_email = Column(String)
    product = Column(String)
    quantity = Column(INTEGER)

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)