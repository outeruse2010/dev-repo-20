# ********************************
# * Project : due_detail
# * File :  malini_app.py
# * Created by Malancha at 28/7/2021
# ********************************

from flask import Flask
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


if __name__ == '__main__':
    app.run(debug=True)
