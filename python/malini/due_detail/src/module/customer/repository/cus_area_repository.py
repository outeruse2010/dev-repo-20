# ********************************
# * Project : due_detail
# * File :  cus_area_repository.py
# * Created by Malancha at 19/7/2021
# ********************************

import pandas as pd

from src.config.db_config import db_engine
from src.constants.app_const import DB_SCHEMA
from src.config.log_config import log

def customer_areas():
    log.info('find customer_areas....')
    engine = db_engine()
    sql = f''' SELECT area_id, area_name, description, created_on, created_by, updated_on, updated_by, deleted
            FROM {DB_SCHEMA}.cus_area '''
    df = pd.read_sql(con=engine, sql=sql)
    log.info(f'customer_areas no of rows selected : {df.shape[0]}')
    return df


def add_customer_area(cus_area_json):
    log.info(f'add_customer_area....{cus_area_json}')
    # print(f'***type : {type(cus_area_json)}')
    # df = pd.DataFrame.from_dict([cus_area_json])
    df = pd.DataFrame([cus_area_json])
    engine = db_engine()
    df.to_sql('cus_area', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
    log.info('new cus_area added...........')


def update_customer_area(cus_area_json):
    area_id = cus_area_json['area_id']
    log.info(f'update_customer_area for area_id: {area_id}')
    # areaid, areaname, description, createdon, createdby, updatedon, updatedby, deleted
    sql = f''' UPDATE {DB_SCHEMA}.cus_area set area_name = '{cus_area_json['area_name']}', 
               description = '{cus_area_json['description']}', updated_by = '{cus_area_json['updated_by']}',
               updated_on = now() where area_id = '{area_id}' '''
    engine = db_engine()
    with engine.begin() as con:
        con.execute(sql)
    log.info(f'customer_area updated for area_id: {area_id} ......')

# cus_area_json = {"area_name": "Khatsara", "description": "Khatsara area", "updated_by":"Auto"}
# add_customer_area(cus_area_json)
# cus_area_json = {"area_name": "Khatsara", "description": "Khatsara area", "updated_by":"Auto",
#                  "area_id":"cb7fc2da-1a6b-4270-a522-49e6131d516d"}
# update_customer_area(cus_area_json)
#
# customer_areas()
