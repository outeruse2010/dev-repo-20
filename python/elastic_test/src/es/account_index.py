from elasticsearch import Elasticsearch, helpers
import uuid
import sys
import os

CUR_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__)))

DATA_DIR1 = os.path.abspath(os.path.join(CUR_DIR,'..','..','data'))
print('CUR DIR: ',CUR_DIR)
print('DATA_DIR1: ',DATA_DIR1)
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','data'))
print('DATA_DIR: ',DATA_DIR)
FILE_PATH = os.path.abspath(os.path.join(DATA_DIR,'accounts.json'))
print('FILE_PATH: ',FILE_PATH)






es = Elasticsearch([{'host':'localhost', 'port':9200}])

index_name = 'account_index'

# es.indices.delete(index=index_name)

# existing indices
indxs = es.indices.get_alias('*')
for indx in indxs:
    print('Index : ',indx)

if not es.indices.exists(index=index_name):
    res = es.indices.create(index=index_name)
    print('Index created....', res)
else:
    print('Index [',index_name,'] already exist!!!')

    
def get_account_data():
    # file=open("C://work//programs//git//dev-repo-20//python//elastic_test//data//accounts.json",encoding='utf-8')
    file = open(FILE_PATH, encoding='utf-8')
    for line in file:
        doc = line.strip()
        if '{"index' not in line:
          yield {
              '_index':index_name,
              '_id' : uuid.uuid4(),
              '_source':doc
          }  

def insert_account_data():
    data = get_account_data()
    print('insert account data ...............',data)    
    helpers.bulk(client=es, actions=data)
    print('account data inserted......')
 
  
def display_accounts(res):
    acc_list = res['hits']['hits']
    print('count1: ',len(acc_list))
    for acc in acc_list:
        print('***Acc : \n',acc['_source'])
    
def count_result(res):
    count = res['hits']['total']['value']
    print('No of records found: ',count)
    return count

def fetch_all_accounts():
    query_match_all = {'query':{ 'match_all':{} }}
    res = es.search(index=index_name,body=query_match_all, pretty=True, size=1000)
    display_accounts(res)

q_match = {'query': {'match': {'city': 'Brogan'}}}
# res= es.search(index=index_name, body=q_match, size=1000)

# This query matches a text or phrase with more than one field.
q_multi_match = {'query': {'multi_match':{'query': 'Pyrami', 'fields':['email','employer']}}}
# res = es.search(index=index_name, body=q_multi_match, size=1000)

# This query uses query parser and query_string keyword.
q_query_string = {'query': {'query_string': {'query': 28}}}
#res= es.search(index=index_name, body=q_query_string, size=1000)

q_term = {'query':{'term': {'city': 'Draper'}}}
# res= es.search(index=index_name, body=q_term, size=1000)  

# range -> 'gte', 'lte', 'gt', 'lt'
q_range = {'query':{'range': {'age': {'gte':28}}}}
# res= es.search(index=index_name, body=q_range, size=1000)  

# wildcard
q_regex = {'query':{'wildcard':{'email': '*.com'}}}
# res = es.search(index=index_name, body=q_regex, size=1000)

# compound query
q_compound = {'query':{'bool':{'must':{'match':{'city':'Riceville'}},'must_not':{'match': {'employer':'Bedlam'}}}}}
res = es.search(index=index_name, body=q_compound, size=1000)

# insert_account_data() 
count_result(res)
# fetch_all_accounts()
display_accounts(res)


