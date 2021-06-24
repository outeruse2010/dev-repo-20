from pika import BasicProperties
import uuid
import json
from time import sleep

from src.config.rabittmq_config import QueueConfig


def publish_message(exchange_name, routing_key, msg_json):
    print(f'publish_message ...')
    # routing_key = msg_json['routing_key']
    qc = QueueConfig()
    conn = qc.get_connection()
    channel = conn.channel()
    exchange_name = 'order'
    # routing_key = exchange_name+'_'+routing_key
    print(f'publish_message with exchange_name : {exchange_name}, routing_key : {routing_key}')
    channel.exchange_declare(exchange=exchange_name, exchange_type='direct', durable=True)
    # channel.queue_bind(exchange=exchange_name,queue=queue_name, durable=True)
    print(f'******msg_json: {msg_json}')
    msg_body = json.dumps(msg_json)
    channel.basic_publish(exchange=exchange_name, routing_key=routing_key, body=msg_body,
                                   properties=BasicProperties(
                                       delivery_mode=2,  # make message persistent
                                   ))
    print(f'message published to exchange: {exchange_name}, routing_key : {routing_key}')


def get_order(qty):
    order = {
        'order_id': str(uuid.uuid4()),
        'user_email': 'abc@example.com',
        'product': 'Leather Jacket',
        'quantity': qty
    }
    return order

for i  in range(1,20):
    order = get_order(i)
    publish_message(exchange_name='order', routing_key= 'order.notify', msg_json = order)
    sleep(5)
