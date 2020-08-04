pip install sqlalchemy  => for data insert and update
pip install pandas  => for data selection
pip install pyYAML => for yaml file parsing


MANIFEST.in file contains all the non python files to be included in the dist directory

>python -m pip install --user --upgrade setuptools wheel

Now run this command from the same directory where setup.py is located:
>python setup.py sdist bdist_wheel