import React from 'react'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {map} from 'lodash';
import './styles.css';
import {
    numberClick,
    actionClick
} from '../../reducers/calculator';

const Home = props => (
    <div className="workspace-container">
        <h1>Home</h1>
        <p>Expression: {props.expression}</p>
        <p>Action: {props.action}</p>

        <div className="buttons-container">
            <div className="numbers">
                {map([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], (buttonChar, idx) =>
                    <button className="button" key={idx} onClick={() => props.numberClick(buttonChar)}>{buttonChar}</button>
                )}
            </div>
            <div className="actions">
                {map(['+', '-', '=', '/', '*', 'C'], (buttonChar, idx) =>
                    <button key={idx} className="button action-button" onClick={() => props.actionClick('+')}>{buttonChar}</button>
                )}
            </div>
        </div>

        <p>
            <button onClick={() => props.changePage()}>Go to about page via redux</button>
        </p>
    </div>
);

const mapStateToProps = state => ({
    expression: state.calculator.expression,
    lastAction: state.calculator.lastAction
});

const mapDispatchToProps = dispatch => bindActionCreators({
    actionClick,
    numberClick,
    changePage: () => push('/about-us')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
