from graphene import ObjectType, Schema, Field, String, Int

# create Model this will be the return type object
class Person(ObjectType):
    firstName = String()
    lastName = String()
    age = Int()

# create query class
class PersonQuery(ObjectType):
    person = Field(Person, firstName=String(), age=Int(default_value=0))

    def resolve_person(root, info, firstName, age):
        print(f'''FirstName: {firstName}, Age: {age}''')
        # call service method to do any operation based on firstName and age
        # return a json object
        return {"firstName": firstName, "lastName": "xyz", "age": 33 }


# create person schema
person_schema = Schema(query=PersonQuery)

# Test this schema in local
test_query = '''
query test_query{
    person(firstName: "ABC", age: 22) {firstName, age}
  }
'''
result = person_schema.execute(test_query)
print(f'''schema:\n {person_schema}''')
print(f'''result:\n {result}''')

