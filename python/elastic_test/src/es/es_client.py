from elasticsearch import Elasticsearch

class EsClient:
    
    def __init__(self):
        self.client=Elasticsearch([{'host':'localhost','port':9200}])
        
    def get_client(self):
        return self.client