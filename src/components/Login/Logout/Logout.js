import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

export class Logout extends Component {
    componentDidMount = () => {
        this.props.onLogout(); // Immediately dispatches the Logout action
    }

    render() {
        return (<Redirect to="/"/>); // Redirects to the root
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);