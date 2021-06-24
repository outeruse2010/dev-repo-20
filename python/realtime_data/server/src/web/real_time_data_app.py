from flask import Flask
from flask_socketio import SocketIO, send, emit
import uuid
import json
from src.repository.order_repository import fetch_all_orders
from engineio.payload import Payload
Payload.max_decode_packets = 50

app = Flask(__name__)
socketIO = SocketIO(app, cors_allowed_origins='*')

app.debug = True
app.host = 'localhost'

@socketIO.on('message')
def handle_message(msg):
    print(f'''msg: {msg}''')
    send(msg, broadcast=True)

@socketIO.on('q_json_data')
def handle_qjson(json_data = None):
    json_data = fetch_all_orders()
    print(f'''json_data: {json_data}''')
    emit('qjson', json_data, broadcast=True)

    # for i in range(1,20):
    #     json_data = {
    #         'id': str(uuid.uuid4()),
    #         'user_email': 'abc@example.com',
    #         'product': 'Leather Jacket',
    #         'quantity': i
    #     }
    #     emit('qjson',json_data, broadcast=True)
    #     socketIO.sleep(15)

def on_message(msg_payload):
    print(' on_message {}'.format(msg_payload))
    with app.app_context():
        handle_qjson(msg_payload)

if __name__ == '__main__':
    socketIO.run(app)




