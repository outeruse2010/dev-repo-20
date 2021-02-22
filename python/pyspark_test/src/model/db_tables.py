from sqlalchemy import Column, INTEGER, String
from sqlalchemy.ext.declarative import declarative_base
from src.config.db_config import DbConfig

Base = declarative_base()

class Employee(Base):
    __tablename__ = 'employee'
    emp_id = Column(INTEGER, primary_key=True)
    emp_name = Column(String)

def create_tables():
    db = DbConfig()
    engine = db.get_engine()
    tables = [Employee.__class__]
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

# create_tables()