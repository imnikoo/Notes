import _ from 'lodash';
import {AUTH_RECEIVE, AUTH_REQUEST, REGISTER_REQUEST} from "../actions/auth";

const initialState = {
   isPending: false,
   token: window.localStorage.getItem('Access-token')
};

export default (state = initialState, action) => {
   switch (action.type) {
      case AUTH_REQUEST:
      case REGISTER_REQUEST: {
         return _.assign(state, {
            isPending: true
         });
      }

      case AUTH_RECEIVE: {
         window.localStorage.setItem('Access-token', action.payload.accessToken);
         return {
            ...state,
            token: action.payload.accessToken,
            isPending: false
         };
      }

      default:
         return state
   }

}

