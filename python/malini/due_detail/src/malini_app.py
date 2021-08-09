# ********************************
# * Project : due_detail
# * File :  malini_app.py
# * Created by Malancha at 28/7/2021
# ********************************

from flask import Flask, request, make_response
from flask_cors import CORS
from flask_graphql import GraphQLView

from src.utils.app_utils import trim_json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def test():
    return 'Hello World!!!'

from src.module.activity.user_repository import *

@app.route('/login', methods=['POST'])
def login():
    login_json = request.get_json()
    res_json = user_login(login_json)
    response = make_response(res_json)
    response.set_cookie("log_in_code", "log_in_code_value")
    return response

@app.route('/add_user', methods=['POST'])
def new_user_add():
    user_json = request.get_json()
    res_json = add_new_user(user_json)
    return res_json

@app.route('/assign_role', methods=['POST'])
def assign_role():
    user_role_json = request.get_json()
    res_json = add_user_role_map(user_role_json)
    return res_json

# =============== cus_area detail Api localhost:5000/graphql_cus_area_list    =====================
# query to run on graphiql
# query cus_area_query{ cusAreas { area_id, area_name, description, created_on, created_by, updated_on, updated_by, deleted}}
from src.module.customer.service.cus_area_service import cus_area_schema
app.add_url_rule('/graphql_cus_area_list', view_func= GraphQLView.as_view('grapghql', schema= cus_area_schema(), graphiql=True))

from src.module.customer.repository.cus_area_repository import *

def is_authorised(check):
    def validate():
        input = request.get_json()
        access_json = allowed_to_do(input['user_id'], input['log_in_code'], [VIEW, UPDATE])
        print(f'*****access_json: {access_json}')
        if not access_json['allowed']:
            return access_json
        return check
    return validate

@app.route("/fetch_customer_areas",  methods=['POST'])
# @is_authorised
def fetch_customer_areas():
    input = request.get_json()
    # log_in_code = request.cookies.get('log_in_code')
    # print(f'*****cookie: {log_in_code}')
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [VIEW, UPDATE])
    # access_json = {'message': "msg", 'allowed': False, 'status': ERROR}
    if not access_json['allowed']:
        return access_json
    df = customer_areas()
    json_data = df.to_json(orient="records")
    return json_data




@app.route("/add_customer_area", methods=['POST'])
def new_cus_area():
    input = request.get_json()
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [VIEW, UPDATE])
    if not access_json['allowed']:
        return access_json
    trim_json(input, ['user_id', 'log_in_code'])

    return add_customer_area(input)

@app.route("/update_customer_area", methods=['POST'])
def update_cus_area():
    cus_area_json = request.get_json()
    return update_customer_area(cus_area_json)

@app.route("/remove_customer_area", methods=['POST'])
def remove_cus_area():
    cus_area_json = request.get_json()
    return delete_customer_area(cus_area_json)

# =============== customer detail Api localhost:5000/graphql_customer_list    =====================
# query to run on graphiql
#query customer_query{ customers {cus_id, cus_sr, first_name, mid_name, last_name, address, area_id, email, phone, comments, created_on, created_by, updated_on, updated_by, deleted}}
from src.module.customer.service.cus_area_service import cus_area_schema
# app.add_url_rule('/graphql_customer_list', view_func= GraphQLView.as_view('grapghql', schema= cus_area_schema(), graphiql=True))

from src.module.customer.repository.customer_repository import *

@app.route("/fetch_customers",  methods=['POST'])
def fetch_customers():
    input = request.get_json()
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [VIEW, UPDATE])
    if not access_json['allowed']:
        return access_json
    df = customers()
    json_data = df.to_json(orient="records")
    return json_data

@app.route("/add_customer",  methods=['POST'])
def new_customer():
    input = request.get_json()
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [VIEW, UPDATE])
    if not access_json['allowed']:
        return access_json
    trim_json(input, ['user_id', 'log_in_code'])
    return add_customer(input)

@app.route("/update_customer",  methods=['POST'])
def update_customer_info():
    input = request.get_json()
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [UPDATE])
    if not access_json['allowed']:
        return access_json
    return update_customer(input)

@app.route("/remove_customer", methods=['POST'])
def remove_customer():
    input = request.get_json()
    access_json = allowed_to_do(input['user_id'], input['log_in_code'], [UPDATE])
    if not access_json['allowed']:
        return access_json
    return delete_customer(input)

if __name__ == '__main__':
    app.run(debug=True)
