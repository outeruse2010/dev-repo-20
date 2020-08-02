MANIFEST.in file contains all the non python files to be included in the dist directory

>python3 -m pip install --user --upgrade setuptools wheel

Now run this command from the same directory where setup.py is located:
>python3 setup.py sdist bdist_wheel