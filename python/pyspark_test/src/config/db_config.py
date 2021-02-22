from os import path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class DbConfig:

    def __init__(self):
        db_name = "local_sqllite3.db"
        db_path = path.abspath(path.join(path.dirname(__file__), '..', 'resources', db_name))
        self.db_path = db_path.replace('\\', '/')
        self.db_url = 'jdbc:sqlite:///'+self.db_path
        self.driver = "org.sqlite.JDBC"


    def get_engine(self):
        sqlite_url = 'sqlite:///'+self.db_path
        engine = create_engine(sqlite_url, echo=True)
        return engine

    def db_session(self, engine):
        session = sessionmaker(bind=engine, autocommit=True)
        return session()
