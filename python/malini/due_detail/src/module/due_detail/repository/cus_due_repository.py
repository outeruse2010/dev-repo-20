# ********************************
# * Project : due_detail
# * File :  cus_due_repository.py
# * Created by Malancha at 9/8/2021
# ********************************

import pandas as pd
import traceback

from src.config.db_config import db_engine
from src.config.log_config import log
from src.constants.app_const import *


# SELECT cus_due_id, cus_id, mkt_amount, credit_amt,  "comments", created_on, created_by, updated_on, updated_by, deleted
# FROM malini_schema.cus_due;

def fetch_due_detail_by_cus_id(cus_id):
    log.info('fetch_due_detail')
    engine = db_engine()
    sql = f'''SELECT cast(cus_due_id as varchar) id, cast(cus_due_id as varchar) cus_due_id, 
             cast(cus_id as varchar) cus_id, mkt_amount, credit_amt, mkt_pay_date,
             comments, created_on, created_by, updated_on, updated_by, deleted 
             FROM {DB_SCHEMA}.cus_due WHERE cus_id = '{cus_id}' and deleted='N' '''
    df = pd.read_sql_query(con=engine, sql=sql)

    # active_due_rows_df = df.loc[df['deleted']=='N', ['mkt_amount', 'credit_amt']]
    # total_mkt_amount = active_due_rows_df['mkt_amount'].sum()
    # total_credit_amt = active_due_rows_df['credit_amt'].sum()
    # total_due = total_mkt_amount - total_credit_amt
    # log.info(f'cus_id: [{cus_id}], total_due: [{total_due}]')

    return df

def add_due_amount(due_json):
    log.info('add_due_amount')
    msg = ''
    msg_json = {}
    try:
        df = pd.DataFrame([due_json])
        engine = db_engine()
        df.to_sql('cus_due', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)

        msg = f'''Marketing detail added !!! '''
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add marketing detail !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


def update_due_amount(due_json):
    log.info(f'update_due_amount: {due_json}')
    msg = ''
    msg_json = {}
    try:
        mkt_amount = due_json['mkt_amount']
        credit_amt = due_json['credit_amt']
        cus_due_id = due_json['cus_due_id']

        sql = f'''UPDATE {DB_SCHEMA}.cus_due set mkt_amount = '{mkt_amount}', credit_amt= '{credit_amt}',
                mkt_pay_date= :mkt_pay_date, updated_by = '{due_json['updated_by']}', updated_on = now()
                WHERE cus_due_id = '{cus_due_id}' '''
        engine = db_engine()
        with engine.begin() as con:
            con.execute(sql, {'mkt_pay_date': due_json['mkt_pay_date']})
        msg = f'''Marketing detail updated !!! '''
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to update marketing detail !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json

def delete_due_amount(due_json):
    cus_due_id = due_json['cus_due_id']
    log.info(f'delete_due_amount for cus_due_id: {cus_due_id}')
    sql = f''' UPDATE {DB_SCHEMA}.cus_due set deleted='Y', updated_by = '{due_json['updated_by']}',
               updated_on = now() where cus_due_id = '{cus_due_id}' '''
    msg = ''
    msg_json = {}
    try:
        engine = db_engine()
        with engine.begin() as con:
            con.execute(sql)
        msg_json['status'] = SUCCESS
        msg = f'''Due amount row deleted !!! '''
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to delete due detail !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


