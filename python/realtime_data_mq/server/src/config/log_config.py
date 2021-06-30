import os
import logging.config
import yaml

log_config_path = os.path.abspath(os.path.join(os.path.dirname(__file__),'..','resources','log_config.yaml'))

with open(log_config_path, 'r') as f:
    log_cfg = yaml.safe_load(f.read())

logging.config.dictConfig(log_cfg)

log = logging.getLogger('dev')
log.setLevel(logging.INFO)