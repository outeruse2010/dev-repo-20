function throwError(err, err_msg){
    // console.log('*****err: ',err)
    if(err){
        console.error(err_msg + '. ' +err);
        throw new Error(err_msg);
    }
}
module.exports = {throwError}