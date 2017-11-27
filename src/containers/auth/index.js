import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {goBack} from "react-router-redux";
import {auth_request, register_request} from "../../actions/auth";
import drop from "lodash/drop";
import {CSSTransition} from "react-transition-group";
import Input from '../../components/Input';
import "./styles.css";
import Spinner from "../../components/Spinner/index";
const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


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
   }

   componentDidMount() {
      this.setState({show: true});
   }

   back = () => {
      this.setState({show: false});
      setTimeout(() => {
         this.props.goBack();
      }, 300);
   };

   handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });
   };

   renderPasswordConfirm(isNeeded) {
      return isNeeded ?
         <Input
            type='password'
            name='passwordConfirmation'
            label='Password confirmation'
            value={this.state.passwordConfirmation}
            onChange={this.handleInputChange}
         /> : null;
   }


   renderForwardButton(isRegistration) {
      let {email, password} = this.state;
      let { register_request, auth_request } = this.props;
      let credentials = {email, password};

      let clickHandler = isRegistration ? register_request : auth_request;
      return (
         <button className="button auth__forward"
                 onClick={() => clickHandler(credentials)}>{this.state.action}</button>);
   }

   render() {
      let {action, isRegistration} = this.state;

      return (
         <ScaleIn in={this.state.show}>
            <div className="auth card">
               <div className="action-name-container">
                  <span className="action-name-container__name">/{action}</span>
               </div>
               <div className="credentials">
                  <Input
                     name='email'
                     label='Email'
                     value={this.state.email}
                     onChange={this.handleInputChange}
                     validationRule={{pattern: emailRegExp}} //TODO: string, regexp, fn, number
                     validationMessage='Email is not correct'
                  />
                  <Input
                     type='password'
                     name='password'
                     label='Password'
                     value={this.state.password}
                     onChange={this.handleInputChange}
                  />
                  {this.renderPasswordConfirm(isRegistration)}
               </div>
               <div className="auth__actions">
                  <button className="button auth__back" onClick={this.back}>Back</button>
                  {this.renderForwardButton(isRegistration)}
               </div>
               <div className={classnames({ 'backdrop' : true, show: this.props.isPending })}>
                  <Spinner />
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
   register_request,
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth)
