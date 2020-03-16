import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

export class Logout extends Component {
    componentDidMount = () => {
        this.props.onLogout(); // Immediately dispatches the Logout action
    }

    render() {
        return (<div>Logging out...</div>);
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);