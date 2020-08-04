from com.sqt.config.db_config import Session
from com.sqt.repository.employee_repository import *
from com.sqt.model.employee import employee
import pandas as df

from com.sqt.config.log_config import log


'''
    FETCH employee
'''
def fetch_all_employees():
    emps = fetch_all_employee()
    log.info('employees fetched: ',emps)
    return emps

def fetch_one_employee(emp_id):
    emp = fetch_employee_by_id(emp_id)
    log.info('employee detail: ',emp)
    return emp

'''
    INSERT Employee
'''
def add_new_employee(emp_name):
    '''
        Insert single record
    '''

    session = Session()
    try:
        session.begin()
        add_employee(session,emp_name)
        session.commit()
    except Exception:
        log.error('Failed to add new employee...',ext_info=True)
        session.rollback()
        raise

def add_new_employees(emp_names):
    '''
        Insert multiple records
    '''
    session = Session()
    try:
        session.begin()
        add_employees(session,emp_names)
        session.commit()
    except:
        log.error('Failed to add new employees...', ext_info=True)
        session.rollback()
        raise




'''
    UPDATE Employee
'''
def update_one_employee(emp_id):
    '''
        Update one employee
    '''
    try:
        session = Session()
        # get employee by id
        session.begin()
        emp = session.query(employee).get(emp_id)
        emp.emp_name = 'Mr. '+emp.emp_name
        session.commit()
    except:
        print('Failed to update one employee...')
        session.rollback()
        raise

'''
    UPDATE Employee
'''
def update_multiple_employees(name_like):
    '''
        Update multiple employees
    '''
    try:
        session = Session()
        session.begin()
        session.query(employee).filter(employee.emp_name.notilike('%{0}%'.format(name_like))).update({employee.emp_name:'Mr. '+employee.emp_name},synchronize_session=False)
        session.commit()
    except:
        print('Failed to update one employee...')
        session.rollback()
        raise

# add_new_employee('John')
# add_new_employees(['Henry','Peter'])
# update_one_employee(emp_id=1)
# update_multiple_employees(name_like='Mr')
fetch_all_employees()
fetch_one_employee(1)