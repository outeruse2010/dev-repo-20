import { USR_FIND,USR_FIND_ERR } from "../action/Action";

export const UserReducer = (state = {}, action) => {
    //console.log('****action: ', action);
    switch(action.type){
        case USR_FIND:
            return {...state, data: action.payload};
        case USR_FIND_ERR:
            return {...state, data: action.payload};
        default:
            return state;
    };
};