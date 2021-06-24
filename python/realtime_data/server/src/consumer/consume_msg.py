import json

from src.config.rabittmq_config import QueueConfig
from src.web.real_time_data_app import handle_qjson, socketIO
from src.repository.order_repository import add_order

def consume_message(exchange_name, routing_key):
    qc = QueueConfig()
    connection = qc.get_connection()
    channel = connection.channel()

    queue = channel.queue_declare(routing_key)
    queue_name = queue.method.queue
    print(f'***queue_name: {queue_name}')

    channel.queue_bind(
        exchange=exchange_name,
        queue=queue_name,
        routing_key=routing_key  # binding key
    )

    channel.basic_consume(queue=routing_key, on_message_callback=callback)
    channel.start_consuming()



def callback(ch, method, properties, body):
    payload = json.loads(body)
    print(f'payload:  {payload}')
    # print(' [x] Notifying {}'.format(payload['user_email']))
    print(' [x] Done')
    ch.basic_ack(delivery_tag=method.delivery_tag)
    on_message(payload)

def on_message(msg_payload):
    print(f' on_message msg_payload: {msg_payload}')
    add_order(msg_payload)

    # socketIO.emit('qjson', msg_payload, broadcast=True)
    # handle_qjson(msg_payload)
    # with app.app_context():
    #     handle_qjson(msg_payload)


consume_message(exchange_name='order', routing_key= 'order.notify')