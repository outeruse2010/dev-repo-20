import pika

#  http://localhost:15672/


class QueueConfig:

    def __init__(self):
        pass

    def get_connection(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        return connection
