from os import path

from pyspark import SparkConf
from pyspark import SparkContext
from pyspark.sql import SparkSession


class SparkConfig:

    def __init__(self):
        lib_path = lambda file_name: path.abspath(
            path.join(path.dirname(__file__), '..', 'resources', 'lib', 'sqlite-jdbc-3.34.0.jar'))
        self.sqlite_file = lib_path('sqlite-jdbc-3.34.0.jar')
        # os.environ['PYSPARK_SUBMIT_ARGS'] = '--jars file:///'+sqlite_jar+' pyspark-shell'

    def spark_conf(self):
        jar = self.sqlite_file
        jar = jar.replace('\\', '/')
        sp_conf = SparkConf().setMaster('local[*]')\
            .setAppName('PySpark_SQLITE_test').set("spark.jars", "file:///" + jar)\
            .set('spark.executor.extraClassPath','file:///'+jar)\
            .set('spark.driver.extraClassPath', 'file:///' + jar)
        return sp_conf

    def spark_session(self):
        conf = self.spark_conf()
        print('conf: ',conf)
        spark = SparkSession.builder\
            .config(conf=conf)\
            .enableHiveSupport().getOrCreate()

        spark.sparkContext.setLogLevel('ERROR')
        return spark

    def spark_context(self):
        conf = self.spark_conf()
        print('conf: ', conf)
        sc = SparkContext(conf=conf)
        return sc
