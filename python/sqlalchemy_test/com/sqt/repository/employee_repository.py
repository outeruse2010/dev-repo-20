from sqlalchemy.orm import sessionmaker
from com.sqt.config.db_config import Session
from com.sqt.config.db_config import engine
import pandas as df

from com.sqt.config.log_config import log


from com.sqt.model.employee import employee

def add_employee(session, emp_name):
    log.info('add_employee for emp_name: ',emp_name)
    emp = employee(emp_name=emp_name)
    session.add(emp)

def add_employees(session, emp_names):
    log.info('add_employees for emp_names: ', emp_names)
    emps = []
    for emp_name in emp_names:
        emps.append(employee(emp_name=emp_name))
    session.add_all(emps)

def fetch_all_employee():
    log.info('fetch_all_employee... ')
    query = 'select * from employee'
    emps = df.read_sql_query(query,engine)
    return emps.to_json(orient='records')

def fetch_employee_by_id(emp_id):
    log.info('fetch_employee_by_id  emp_id: ',emp_id)
    query = 'select * from employee where emp_id=?'
    emp = df.read_sql_query(sql=query,con=engine,params=[emp_id])
    return emp.to_json(orient='records')

