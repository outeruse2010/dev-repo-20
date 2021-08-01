# ********************************
# * Project : due_detail
# * File :  customer_repository.py
# * Created by Malancha at 28/7/2021
# ********************************

import pandas as pd
import traceback

from src.config.db_config import db_engine
from src.config.log_config import log
from src.constants.app_const import *


def customers():
    print('find customers....')
    engine = db_engine()
    sql = f''' SELECT cast(cus_id as varchar) id, cast(cus_id as varchar) cus_id, cus_sr, first_name, mid_name, last_name, address, area_id, email, phone, 
               comments, created_on, created_by, updated_on, updated_by, deleted
               FROM {DB_SCHEMA}.customer '''
    df = pd.read_sql(con=engine, sql=sql)
    print(f'customers no of rows and columns selected : {df.shape}')
    return df


def add_customer(customer_json):
    log.info(f'add_customer....{customer_json}')
    cus_sr = customer_json['cus_sr']
    first_name = customer_json['first_name']
    msg = f'''Customer [{first_name}] with Serial [{cus_sr}] added !!! '''
    msg_json = {}
    try:
        df = pd.DataFrame([customer_json])
        engine = db_engine()
        df.to_sql('customer', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add customer [{first_name}] with Serial [{cus_sr}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


def update_customer(customer_json):
    cus_id = customer_json['cus_id']
    cus_sr = customer_json['cus_sr']
    first_name = customer_json['first_name']
    log.info(f'update_customer for cus_id: {cus_id}')
    sql = f''' UPDATE {DB_SCHEMA}.customer set cus_sr = '{cus_sr}', first_name = '{first_name}', 
               mid_name = '{customer_json['mid_name']}',last_name = '{customer_json['last_name']}', 
               address = '{customer_json['address']}',area_id = '{customer_json['area_id']}', 
               email = '{customer_json['email']}',phone = '{customer_json['phone']}', 
               comments = '{customer_json['comments']}', updated_by = '{customer_json['updated_by']}',
               updated_on = now() where cus_id = '{cus_id}' '''
    msg = f'''Customer [{first_name}] with Serial [{cus_sr}] updated !!! '''
    msg_json = {}
    try:
        engine = db_engine()
        with engine.begin() as con:
            con.execute(sql)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to update customer [{first_name}] with Serial [{cus_sr}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


customers()
