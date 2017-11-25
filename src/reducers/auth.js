import _ from 'lodash';

export const AUTH_REQUEST = 'auth/AUTH_REQUEST';
export const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';

export const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const initialState = {
   isPending: false
};


export default (state = initialState, action) => {
   switch (action.type) {
      case AUTH_REQUEST: { }
      case REGISTER_REQUEST: {
         return _.assign(state, {
            isPending: true
         });
      }

      default:
         return state
   }

}

export const auth_request = (credentials) => {
   return dispatch => {
      dispatch({
         type: AUTH_REQUEST,
         payload: credentials
      });
   }
};

export const register_request = (credentials) => {
   return dispatch => {
      dispatch({
         type: REGISTER_REQUEST,
         payload: credentials
      });
   }
};

export const auth_success = () => {
   return dispatch => {
      dispatch({
         type: AUTH_SUCCESS
      });
   }
};

export const register_success = () => {
   return dispatch => {
      dispatch({
         type: REGISTER_SUCCESS
      });
   }
};