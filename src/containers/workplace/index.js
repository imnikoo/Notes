import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./styles.css";
import img from '../../static/logo.png';

class Auth extends Component {
   constructor(props) {
      super(props);

   }

   render() {
      return (
         <div className="workplace card">
            <div className="logo">
               <img className="logo__img" src={img} alt="Notes"/>
            </div>
            <div className="recent-notes">
               <span className="recent-notes__title">Recent notes</span>
               <div className="notes-container">
                  <div className="note">Notes</div>
                  <div className="note">Notes</div>
                  <div className="note">Notes</div>
                  <div className="note">Notes</div>
                  <div className="note">Notes</div>
               </div>
            </div>
            <div className="workplace__actions"></div>
            <div className="all-notes"></div>
         </div>);
   }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth)
