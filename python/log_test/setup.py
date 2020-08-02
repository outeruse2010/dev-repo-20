from setuptools import setup,find_packages

setup(
    name="Log test",
    version="1.0",
    author="Malancha",
    description="A small example package on python logging",
    long_description="A small example package on python logging",
    long_description_content_type="text/markdown",
    url="https://github.com/outeruse2010/dev-repo-20/tree/dev-repo-20/python",

    include_package_data=True,    # include everything in source control
    packages=find_packages(),
    install_requires=[
        "pyYAML",
    ],
    python_requires='>=3.6',
)