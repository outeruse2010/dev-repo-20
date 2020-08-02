from com.lt.config.app_log_config import log

log.info('ABC')

def printLog(num):
    log.info('printLog function called.')
    log.info("Input parameter value passed: {0}".format(num))

printLog(11)