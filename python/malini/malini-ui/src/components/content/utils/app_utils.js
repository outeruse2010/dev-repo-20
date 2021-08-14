import moment from 'moment';

export const gridDateTime = (params) =>{
    const row = params.row;
    const field = params.field;
    const format = "DD-MMM-YYYY HH:mm:ss";
    let value = row[field] ? moment(row[field]).format(format) : '';    
    return value;
};

export const gridDate = (params) =>{
    const row = params.row;
    const field = params.field;
    const format = "DD-MMM-YYYY";
    let value = row[field] ? moment(row[field]).format(format) : '';    
    return value;
};
