from elasticsearch import Elasticsearch, helpers

es = Elasticsearch([{'host':'localhost','port':9200}])

INDEX_NAME='book_index'

es.indices.create(INDEX_NAME)
# es.indices.delete(INDEX_NAME)

# bulk insert book data
data=[
    {'_index':INDEX_NAME, 
        '_source': { 'title': 'Elasticsearch: The Definitive Guide', 'authors': ['clinton gormley', 'zachary tong'], 'summary' : 'A distibuted real-time search and analytics engine', 'publish_date' : '2015-02-07', 'num_reviews': 20, 'publisher': 'oreilly' }
            }
    ,{'_index':INDEX_NAME, 
        '_source': { 'title': 'Taming Text: How to Find, Organize, and Manipulate It', 'authors': ['grant ingersoll', 'thomas morton', 'drew farris'], 'summary' : 'organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization', 'publish_date' : '2013-01-24', 'num_reviews': 12, 'publisher': 'manning' }
            }
    ,{'_index':INDEX_NAME, 
        '_source': { 'title': 'Elasticsearch in Action', 'authors': ['radu gheorge', 'matthew lee hinman', 'roy russo'], 'summary' : 'build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms', 'publish_date' : '2015-12-03', 'num_reviews': 18, 'publisher': 'manning' }
            }
    ,{'_index':INDEX_NAME,         
        '_source': { 'title': 'Solr in Action', 'authors': ['trey grainger', 'timothy potter'], 'summary' : 'Comprehensive guide to implementing a scalable search engine using Apache Solr', 'publish_date' : '2014-04-05', 'num_reviews': 23, 'publisher': 'manning' }
      }]

# print(data) 

try:    
    # res = helpers.bulk(client=es, actions=data)
    print('***Bulk insert response:\n',res)
except Exception as e:
    print('ERROR:\n',e)
