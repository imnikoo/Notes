import http from 'axios';

export const AUTH_REQUEST = 'auth/AUTH_REQUEST';
export const auth_request = (credentials) => {
   return dispatch => {
      dispatch({type: AUTH_REQUEST});
      let base64credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
      this.props.auth_request();
      http({
         method: 'get',
         url: 'api/auth/signin',
         headers: {'Authorization': `Basic ${base64credentials}`}
      }).then(response => {
         let {accessToken} = response.data;
         dispatch(auth_receive(accessToken));
      });
   };
};

export const AUTH_RECEIVE = 'auth/AUTH_RECEIVE';
export const auth_receive = (token) => {
   return dispatch => {
      dispatch({
         type: AUTH_RECEIVE,
         payload: token
      });
   }
};

export const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
export const register_request = (credentials) => {
   return dispatch => {
      dispatch({type: REGISTER_REQUEST});
      http.post('api/auth/signup', credentials)
         .then(() => dispatch(register_receive()));
   };
};

export const REGISTER_RECEIVE = 'auth/REGISTER_RECEIVE';
export const register_receive = () => {
   return dispatch => {
      dispatch({
         type: REGISTER_RECEIVE
      });
   }
};