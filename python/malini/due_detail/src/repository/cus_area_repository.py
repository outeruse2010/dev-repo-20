# ********************************
# * Project : due_detail
# * File :  cus_area_repository.py
# * Created by Malancha at 19/7/2021
# ********************************

import pandas as pd

from src.config.db_config import db_engine
from src.constants.app_const import DB_SCHEMA


def customer_areas():
    print('find customer_areas....')
    engine = db_engine()
    sql = f''' SELECT area_id, area_name, description, updated_on, updated_by
            FROM {DB_SCHEMA}.cus_area '''
    df = pd.read_sql(con=engine, sql=sql)
    print(f'customer_areas no of rows and columns selected : {df.shape}')
    return df

customer_areas()