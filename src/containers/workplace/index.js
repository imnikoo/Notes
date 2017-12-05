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
            <div className="recent-notes">
               <span className="recent-notes__title">Recent notes</span>
               <div className="recent-notes__container">
                  <div className="recent-notes__container--note">Notes</div>
                  <div className="recent-notes__container--note">Notes</div>
               </div>
            </div>
            <div className="all-notes">
               <span className="all-notes__title">Notes</span>
               <div className="all-notes__container">
                  <div className="all-notes__container__note">
                     <div className="all-notes__container__note--title">Title</div>
                     <div className="all-notes__container__note--content">Content</div>
                  </div>
                  <div className="all-notes__container__note">
                     <div className="all-notes__container__note--title">Title</div>
                     <div className="all-notes__container__note--content">Content</div>
                  </div>
                  <div className="all-notes__container__note">
                     <div className="all-notes__container__note--title">Title</div>
                     <div className="all-notes__container__note--content">Content</div>
                  </div>
                  <div className="all-notes__container__note">
                     <div className="all-notes__container__note--title">Title</div>
                     <div className="all-notes__container__note--content">Content</div>
                  </div>
                  <div className="all-notes__container__note">
                     <div className="all-notes__container__note--title">Title</div>
                     <div className="all-notes__container__note--content">Content</div>
                  </div>
               </div>
            </div>
         </div>);
   }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth)
