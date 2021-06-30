from src.config.db_config import engine
import pandas as pd

from src.config.log_config import log


def add_order(order_dict):
    log.info(f'add_order: {order_dict}')
    df = pd.DataFrame([order_dict])
    df.to_sql('order_detail', con=engine, index=False, if_exists='append', chunksize=100)
    log.info('new order added...')


def fetch_all_orders():
    log.info('fetch_all_orders... ')
    query = f'select * from order_detail'
    df = pd.read_sql_query(query,con=engine)
    # df = pd.read_table('order_detail',engine)
    # df = df.head(n=1)
    print(f'df: {df}')
    return df.to_json(orient='records')
