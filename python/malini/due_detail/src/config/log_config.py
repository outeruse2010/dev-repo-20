# ********************************
# * Project : due_detail
# * File :  log_config.py
# * Created by Malancha at 19/7/2021
# ********************************


from os import path
import logging.config
import yaml

log_file = path.abspath(path.join(path.dirname(__file__), '..', 'resources', 'log.yaml'))
with open(log_file, 'r') as f:
    log_cfg = yaml.safe_load(f.read())

logging.config.dictConfig(log_cfg)

log = logging.getLogger('dev')
log.setLevel(logging.INFO)