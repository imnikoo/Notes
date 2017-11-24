import React from 'react'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './styles.css';

const Start = props => (
    <div className="landing-container">
        <div className="introduction">
            <span className="app-name main">Notes</span>
            <span className="app-description">
            Welcome to the <span className="app-name in-text">Notes</span>.
            This application helps you to stay on a short leg with your notes, information you need to save and use.
            You can create notes, change it, open whenever you want.
            <br/><span className="app-name in-text">Notes</span> is Future.
        </span>
        </div>
        <div className="actions">
            <div className="sign-up">
            </div>
            <div className="sign-in">
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    expression: state.calculator.expression,
    lastAction: state.calculator.lastAction
});

const mapDispatchToProps = dispatch => bindActionCreators({
    registrationPage: () => push('/registration'),
    logInPage: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start)
