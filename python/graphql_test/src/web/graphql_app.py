from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def test():
    return 'Hello World!!!'

# =============== Person detail Api localhost:5000/graphql_person_detail    =====================
# query to run on graphiql
# query test_query{  person(firstName: "ABC", age: 22) {firstName, age}   }
from src.service.preson_service import person_schema
app.add_url_rule('/graphql_person_detail', view_func= GraphQLView.as_view('grapghql', schema= person_schema, graphiql=True))


if __name__ == '__main__':
    app.run(debug=True)
