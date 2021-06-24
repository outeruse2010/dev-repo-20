from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.config.log_config import log

db_path = "../resources/local_sqllite3.db"
log.info(f'db_path: {db_path}')

engine = create_engine('sqlite:///'+db_path, echo=True)
log.info('db connected...')

Session = sessionmaker(bind=engine, autocommit=True)