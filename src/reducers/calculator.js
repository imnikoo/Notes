import _ from 'lodash';

export const NUMBER_CLICK = 'calculator/NUMBER_CLICK';
export const ACTION_CLICK = 'calculator/ACTION_CLICK';

const initialState = {
    expression: '',
    lastAction: ''
};


export default (state = initialState, action) => {
    let expression;

    switch (action.type) {
        case NUMBER_CLICK:
            expression = state.expression + `${action.payload}`;
            if(state.lastAction === '=') {
                expression = `${action.payload}`;
            }
            return {
                ...state,
                expression: expression,
                lastAction: action.payload
            };

        case ACTION_CLICK:
            switch(action.payload) {
                case 'C': {
                    expression = '';
                    break;
                }
                case '=': {
                    expression = eval(state.expression); //yes, eval. to create usable calculator need to parse string to abstract syntax tree and work with it. but it's complex
                    break;
                }
                default: {
                    if (isLastActNumberOrEquals(state.lastAction)) {
                        if (isExprHasActions(state.expression)) {
                            expression = eval(state.expression);
                            expression = expression + `${action.payload}`;
                        } else {
                            expression = state.expression + `${action.payload}`;
                        }
                    } else {
                        expression = _.replace(state.expression, /.$/, action.payload);
                    }
                    break;
                }
            }

            return {
                ...state,
                expression: expression,
                lastAction: action.payload
            };

        default:
            return state
    }

}

const isLastActNumberOrEquals = (lastAction) => {
    return _.isNumber(lastAction) || lastAction === '=';
};
const isExprHasActions = (expression) => {
    return /(\+|-|\*|\\)/.test(_.drop(expression).join('')); //drop needs to get rid of lead minus
};

export const numberClick = (numberChar) => {
    return dispatch => {
        dispatch({
            type: NUMBER_CLICK,
            payload: numberChar
        });
    }
};

export const actionClick = (actionChar) => {
    return dispatch => {
        dispatch({
            type: ACTION_CLICK,
            payload: actionChar
        });
    }
};