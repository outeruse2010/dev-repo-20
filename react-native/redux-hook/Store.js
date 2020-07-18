import {createStore} from 'redux';
import rootReducer from './RootReducer';

const INIT_STATE = {};

const store = createStore(rootReducer, INIT_STATE);

export default store;
