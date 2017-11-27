import {
    AUTH_RECEIVE, AUTH_REQUEST, REGISTER_REQUEST, REGISTER_RECEIVE, AUTH_ERROR,
    REGISTER_ERROR
} from "../actions/auth";

const initialState = {
    isPending: false,
    token: window.localStorage.getItem('Access-token')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
        case REGISTER_REQUEST: {
            return {
                ...state,
                isPending: true
            };
        }

        case AUTH_RECEIVE: {
            window.localStorage.setItem('Access-token', action.payload.accessToken);
            return {
                ...state,
                token: action.payload.accessToken,
                isPending: false
            };
        }

        case REGISTER_RECEIVE: {
            return { ...state, isPending: false };
        }

        case REGISTER_ERROR:
        case AUTH_ERROR: {
            return {
                ...state,
                error: action.error,
                isPending: false
            };
        }

        default:
            return state
    }

}

