from sqlalchemy import Column, INTEGER, String
from sqlalchemy.ext.declarative import declarative_base
from com.sqt.config.db_config import engine

Base = declarative_base()

class employee(Base):
    __tablename__ = 'employee'
    emp_id = Column(INTEGER, primary_key=True)
    emp_name = Column(String)

Base.metadata.create_all(engine)