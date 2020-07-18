import {combineReducers} from 'redux';
import {UserReducer} from './src/content/api/reducer/Reducer';


const rootReducer = combineReducers({
    userReducer: UserReducer
});

    export default rootReducer;