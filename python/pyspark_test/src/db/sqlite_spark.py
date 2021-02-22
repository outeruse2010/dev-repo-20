from src.config.db_config import DbConfig
from src.config.spark_config import SparkConfig

def fetch_employee_data():
    db = DbConfig()
    sc = SparkConfig()
    spark = sc.spark_session()
    query = 'select * from employee'
    emplyee_df = spark.read.format("jdbc").option("url", db.db_url) \
        .option("driver", db.driver).option("query", query) \
        .load()
    emplyee_df.printSchema()
    emplyee_df[['emp_id','emp_name']].show(2)


def insert_employee_data():
    db = DbConfig()
    sc = SparkConfig()
    spark = sc.spark_session()
    cols = ['emp_id','emp_name']
    rows = [(1,'Tom'),(2,'Peter'),(3,'Simon')]
    row_df = spark.createDataFrame(data=rows,schema=cols)
    row_df.show()
    row_df.write.mode('append').format('jdbc').option('url',db.db_url)\
    .option('driver',db.driver).option('dbtable','employee').save()



# insert_employee_data()
fetch_employee_data()
