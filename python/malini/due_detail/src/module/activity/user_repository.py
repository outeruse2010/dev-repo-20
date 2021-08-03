# ********************************
# * Project : due_detail
# * File :  user_repository.py
# * Created by Malancha at 02/8/2021
# ********************************

import pandas as pd
import traceback

from src.config.db_config import db_engine
from src.config.log_config import log
from src.constants.app_const import *

def add_new_user(user_json):
    log.info(f'add_new_user....')
    user_name = user_json['user_name']
    msg = f'''User [{user_name}] added !!! '''
    msg_json = {}
    try:
        df = pd.DataFrame([user_json])
        engine = db_engine()
        df.to_sql('user_list', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add user [{user_name}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json

def add_new_role(role_json):
    log.info(f'add_new_user....')
    role_name = role_json['role_name']
    msg = f'''Role [{role_name}] added !!! '''
    msg_json = {}
    try:
        df = pd.DataFrame([role_json])
        engine = db_engine()
        df.to_sql('malini_roles', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add role [{role_name}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json

def add_user_activity(user_activity_json):
    log.info(f'add_user_activity....')
    user_name = user_activity_json['user_name']
    activity_type = user_activity_json['activity_type']
    msg = f'''Activity [{activity_type}] added !!! '''
    msg_json = {}
    try:
        df = pd.DataFrame([user_activity_json])
        engine = db_engine()
        df.to_sql('user_activity', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to add activity [{activity_type}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json

def add_user_role_map(user_role_json):
    log.info(f'add_user_role_map....')
    role_name = user_role_json['role_name']
    msg = f'''Role [{role_name}] mapped !!! '''
    msg_json = {}
    try:
        df = pd.DataFrame([user_role_json])
        engine = db_engine()
        df.to_sql('user_role_map', con=engine, schema=DB_SCHEMA, if_exists='append', index=False)
        msg_json['status'] = SUCCESS
    except Exception as ex:
        msg_json['status'] = ERROR
        msg = f'''Failed to map role [{role_name}] !!! '''
        traceback.print_exc()
    log.info(msg)
    msg_json["message"] = msg
    return msg_json