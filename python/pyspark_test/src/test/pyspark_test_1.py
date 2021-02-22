import os

#os.environ['PYSPARK_SUBMIT_ARGS'] = '--jars file:///C:/softwares/jars/sqlite-jdbc-3.34.0.jar pyspark-shell'

# import findspark
# findspark.add_packages('org.xerial:sqlite-jdbc:3.7.2')


from pyspark.sql import SparkSession

spark = SparkSession.builder.master('local[*]').appName('PySpark_SQLITE_test')\
     .config("spark.jars", "file:///C:/softwares/jars/sqlite-jdbc-3.34.0.jar") \
.enableHiveSupport().getOrCreate()
# .config("spark.executor.extraClassPath", "file:///C:/softwares/jars/sqlite-jdbc-3.34.0.jar") \
# .config("spark.executor.extraLibrary", "file:///C:/softwares/jars/sqlite-jdbc-3.34.0.jar") \
# .config("spark.driver.extraClassPath", "file:///C:/softwares/jars/sqlite-jdbc-3.34.0.jar") \
#     .enableHiveSupport().getOrCreate()

spark.sparkContext.setLogLevel('ERROR')


db_path = "C:/work/programs/git/dev-repo-20/python/sqlalchemy_test/resources/local_sqllite3.db"
query = 'select * from employee'
df = spark.read.format("jdbc").option("url", 'jdbc:sqlite://'+db_path) \
    .option("driver", "org.sqlite.JDBC").option("query", query) \
    .load()
df.printSchema()
print('****df: ',df.count())
df[['emp_id','emp_name']].show()

