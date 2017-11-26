import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {goBack} from "react-router-redux";
import {auth_request, auth_success, register_request, register_success} from "../../reducers/auth";
import drop from "lodash/drop";
import http from "axios";
import {CSSTransition} from "react-transition-group";

import "./styles.css";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            action: drop(this.props.match.path).join(''),
            isRegistration: this.props.match.path === '/registration',
            show: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.auth = this.auth.bind(this);
        this.register = this.register.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.setState({show: true});
    }

    back() {
        this.setState({show: false});
        setTimeout(() => {
            this.props.goBack();
        }, 300);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    renderPasswordConfirm(isNeeded) {
        if (isNeeded) {
            return (
                <div className="input-group">
                    <input
                        className='credentials__input'
                        type="password"
                        name='passwordConfirmation'
                        value={this.state.passwordConfirmation}
                        onChange={this.handleInputChange}
                        required
                    />
                    <span className="highlight"/>
                    <span className="bar"/>
                    <label htmlFor="passwordConfirmation">Password confirmation</label>
                </div>
            );
        }
    }

    auth(credentials) {
        let base64credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
        this.props.auth_request();
        http({
            method: 'get',
            url: 'api/auth/signin',
            headers: {'Authorization': `Basic ${base64credentials}`}
        }).then(response => {
            let {accessToken} = response.data;
            window.localStorage.setItem('Access-token', accessToken);
            this.props.auth_success();
        }).catch(err => {
            //err
        });
    }

    register(credentials) {
        this.props.register_request();
        http.post('api/auth/signup', credentials)
            .then((data) => {
                this.props.register_success();
            }).catch(() => {
            this.props.register_failure();
        });
    }

    renderForwardButton(isRegistration) {
        let {auth, register} = this;
        let {email, password} = this.state;

        let credentials = {email, password};
        let clickHandler = isRegistration ? register : auth;
        return (
            <button className="button auth__forward"
                    onClick={() => clickHandler(credentials)}>{this.state.action}</button>);
    }

    render() {
        let {action, isRegistration} = this.state;
        let {back} = this;

        return (
            <ScaleIn in={this.state.show}>
                <div className="auth card">
                    <div className="action-name-container">
                        <span className="action-name-container__name">/{action}</span>
                    </div>
                    <div className="credentials">
                        <div className="input-group">
                            <input
                                className='credentials__input'
                                type="email"
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                required
                            />
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label>Email</label>
                        </div>
                        <div className="input-group">
                            <input
                                className='credentials__input'
                                type="password"
                                name='password'
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                            <span className="highlight"/>
                            <span className="bar"/>
                            <label htmlFor="password">Password</label>
                        </div>
                        {this.renderPasswordConfirm(isRegistration)}
                    </div>
                    <div className="auth__actions">
                        <button className="button auth__back" onClick={back}>Back</button>
                        {this.renderForwardButton(isRegistration)}
                    </div>
                </div>
            </ScaleIn>);
    }
}

const ScaleIn = ({children, ...props}) => {
    return <CSSTransition
        {...props}
        timeout={1000}
        classNames="scale-in">
        {children}
    </CSSTransition>
};

const mapStateToProps = state => ({
    isPending: state.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
    goBack,
    auth_request,
    auth_success,
    register_request,
    register_success
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)
