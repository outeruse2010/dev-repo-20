import axios from 'axios';
import { httpGetConfig } from '../../../utils/AppUtils';

export const USR_FIND = 'USER_FIND';
export const USR_FIND_ERR = 'USER_FIND_ERR';

export const getUserAction = (dispatch) => {
    let url = "https://jsonplaceholder.typicode.com/users";
    const config = httpGetConfig(url);
    axios(config).then(response => {
        //console.log('Res: ',response.data);
        dispatch({type: USR_FIND,  payload: response.data});
    }).catch(error=>{
        console.log('error: ',error);
        dispatch({type: USR_FIND_ERR,  payload: error});
    });
};