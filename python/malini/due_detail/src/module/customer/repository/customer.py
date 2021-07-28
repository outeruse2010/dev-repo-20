# ********************************
# * Project : due_detail
# * File :  customer.py
# * Created by Malancha at 28/7/2021
# ********************************

import pandas as pd

from src.config.db_config import db_engine
from src.constants.app_const import DB_SCHEMA

def customers():
    print('find customers....')
    engine = db_engine()
    sql = f''' SELECT cus_id, cus_sr, first_name, mid_name, last_name, address, area_id, email, phone, comments, updated_on, updated_by
                FROM {DB_SCHEMA}.customer '''
    df = pd.read_sql(con=engine, sql=sql)
    print(f'customers no of rows and columns selected : {df.shape}')
    return df

customers()