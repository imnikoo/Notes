import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import auth from './auth';
import notification from './notification';

export default combineReducers({
    router: routerReducer,
    auth,
    notification
})
