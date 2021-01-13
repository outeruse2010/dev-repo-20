import sys
import os
CUR_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
# print('***CUR_DIR: ',CUR_DIR)
sys.path.insert(0,CUR_DIR)

# print('***path: ',sys.path)

from elasticsearch import Elasticsearch,helpers
import uuid
from src.es.es_client import EsClient




index_name = "employee"

def get_elasticsearch():
    """[summary]

    Returns:
        [type]: [description]
    """
    # es = Elasticsearch([{'host':'localhost','port':9200}])
    es_conn = EsClient()
    es = es_conn.get_client()
    return es


def create_index(es):
    """[summary]

    Args:
        es ([type]): [description]
    """
    if es.indices.exists(index=index_name):
        print('index [',index_name,'] already exist!!!!')
    else:
        es.indices.create(index=index_name)
        print('index [',index_name,'] created!!!!')
    
def get_list_of_index(es):
    """[summary]

    Args:
        es ([type]): [description]

    Returns:
        [type]: [description]
    """
    es_list = es.indices.get_alias().keys()
    print('***es_list: ',es_list)
    return es_list

# insert document
def insert_employee(es):
    e1 = {'fname':'nitin','lname':'panwar','age':27,'interests':['sports','music']}
    res = es.index(index=index_name, id =1, body=e1)
    print('Res: ',res)
    
# Fetch document
def fetch_data(es):
    res = es.get(index=index_name, id=1)
    print('Res1: ',res['_source'])
    
#############################################################
es = get_elasticsearch()
print('*****es: ',es)
# es.indices.delete(index=index_name)

create_index(es)
get_list_of_index(es)

# check if index exist
# idx_exist = es.indices.exists(index=index_name)
# idx_exist

# insert_employee(es)
fetch_data(es)

