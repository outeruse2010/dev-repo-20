# ********************************
# * Project : due_detail
# * File :  malini_app.py
# * Created by Malancha at 28/7/2021
# ********************************

from flask import Flask, request
from flask_cors import CORS
from flask_graphql import GraphQLView

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def test():
    return 'Hello World!!!'

# =============== cus_area detail Api localhost:5000/graphql_cus_area_list    =====================
# query to run on graphiql
# query cus_area_query{ cusAreas { area_id, area_name, description, created_on, created_by, updated_on, updated_by, deleted}}
from src.module.customer.service.cus_area_service import cus_area_schema
app.add_url_rule('/graphql_cus_area_list', view_func= GraphQLView.as_view('grapghql', schema= cus_area_schema(), graphiql=True))

from src.module.customer.repository.cus_area_repository import *


@app.route("/fetch_customer_areas",  methods=['POST'])
def fetch_customer_areas():
    cus_area_json = request.get_json()
    print(f'''****fetch_customer_areas: {cus_area_json['user']}''')
    df = customer_areas()
    print(f'****df: {df}')
    json_data = df.to_json(orient="records")
    print(f'****json_data: {json_data}')
    return json_data

@app.route("/add_customer_area", methods=['POST'])
def new_cus_area():
    cus_area_json = request.get_json()
    return add_customer_area(cus_area_json)



@app.route("/update_customer_area")
def update_cus_area():
    cus_area_json = request.get_json()
    return update_customer_area(cus_area_json)


# =============== customer detail Api localhost:5000/graphql_customer_list    =====================
# query to run on graphiql
#query customer_query{ customers {cus_id, cus_sr, first_name, mid_name, last_name, address, area_id, email, phone, comments, created_on, created_by, updated_on, updated_by, deleted}}
from src.module.customer.service.cus_area_service import cus_area_schema
# app.add_url_rule('/graphql_customer_list', view_func= GraphQLView.as_view('grapghql', schema= cus_area_schema(), graphiql=True))

from src.module.customer.repository.customer_repository import *

@app.route("/add_customer")
def new_customer():
    customer_json = request.get_json()
    return add_customer(customer_json)

@app.route("/update_customer")
def update_customer_info():
    customer_json = request.get_json()
    return update_customer(customer_json)

if __name__ == '__main__':
    app.run(debug=True)
