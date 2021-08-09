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


# SELECT cus_due_id, cus_id, mkt_amount, credit_amt, due_amt, "comments", created_on, created_by, updated_on, updated_by, deleted
# FROM malini_schema.cus_due;

def add_due_amount(due_json):
    log.info('add_due_amount')
    msg = ''
    msg_json = {}
    try:
        mkt_amount = due_json['mkt_amount']
        credit_amt = due_json['credit_amt']
        due_amt = due_json['due_amt']
        # select mkt_amount, credit_amt, due_amt from cus_due then due_amt = ((mkt_amount + due_amt) - credit_amt)

        df = pd.DataFrame([due_json])
        engine = db_engine()
        df.to_sql('cus_due', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)

        msg = f'''Due amount [{due_amt}] added !!! '''
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add due !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


def update_due_amount(due_json):
    log.info('add_due_amount')
    msg = ''
    msg_json = {}
    try:
        mkt_amount = due_json['mkt_amount']
        credit_amt = due_json['credit_amt']
        due_amt = due_json['due_amt']


        df = pd.DataFrame([due_json])
        engine = db_engine()
        df.to_sql('cus_due', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)

        msg = f'''Due amount [{due_amt}] added !!! '''
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add due !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json


def calculate_due(due_json):
    log.info('calculate_due')
    # select mkt_amount, credit_amt, due_amt from cus_due by cus_due_id
    # then due_amt = ((mkt_amount + due_amt) - credit_amt)