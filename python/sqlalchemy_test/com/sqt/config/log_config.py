import logging.config
import yaml

with open('../../../resources/log_config.yaml', 'r') as f:
    log_cfg = yaml.safe_load(f.read())

logging.config.dictConfig(log_cfg)

log = logging.getLogger('dev')
log.setLevel(logging.INFO)