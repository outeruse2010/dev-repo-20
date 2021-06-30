import uuid
import json

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit

from src.repository.order_repository import add_order

app = Flask(__name__)
CORS(app)
app.debug = True
app.host = 'localhost'
socketIO = SocketIO(app, cors_allowed_origins='*')





@socketIO.on('q_json_data')
def handle_qjson(json_data = None):
    print(f'******type: {type(json_data)}')
    # json_data = fetch_all_orders()
    json_data['order_id'] = str(uuid.uuid4())
    print(f'''json_data: {json_data}''')
    add_order(json_data)
    emit('qjson', json_data, broadcast=True)




if __name__ == '__main__':
    socketIO.run(app)