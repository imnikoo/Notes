import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./styles.css";
import * as classnames from "classnames";

class Notification extends Component {
    render() {
        return (
            <div className={classnames({
                notification: true,
                error: this.props.type === 'ERROR',
                warning: this.props.type === 'WARNING',
                info: this.props.type === 'INFO',
            })}>{this.props.message}</div>)
    }
}

const mapStateToProps = state => ({
    type: state.notification.type,
    message: state.notification.message,
    show: state.notification.show
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);
