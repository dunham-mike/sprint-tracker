import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConfirmProvider } from 'material-ui-confirm';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import FrontPage from './components/FrontPage/FrontPage';
import MainView from './containers/MainView/MainView';
import Layout from './containers/Layout/Layout';
import { theme } from './theme/theme';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import * as actions from './store/actions/index';
import Logout from './components/Login/Logout/Logout';

class App extends Component {
    componentDidMount =() => {
        this.props.onTryAutoLogin();
    }

    render() {
        let routes = (
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/create-account" component={CreateAccount} />
                    <Route path="/" exact component = {FrontPage}/>
                    <Route
                        path='/demo'
                        render={(props) => <MainView isDemo={true} />}
                    />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        );

        console.log('this.props.isAuth:', this.props.isAuth);
    
        if (this.props.isAuth) {
            routes = (
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/login" component={Login} /> {/* So Redirect inside Login can work and route to different areas of the app that require login. */}
                    <Route path="/" exact component = {MainView}/>
                    <Route path="/logout" component={Logout} />
                    <Route
                        path='/demo'
                        render={(props) => <MainView isDemo={true} />}
                    />
                    <Redirect to="/" />
                </Switch>
              </Suspense>
            );
        }

        return(
            <ThemeProvider theme={theme}>
                {/* <ConfirmProvider> */}
                    <CssBaseline />
                    <Layout>
                        {routes}
                    </Layout>
                {/* </ConfirmProvider> */}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuth: state.authentication.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoLogin: () => dispatch(actions.authCheckState())
    };
  };  

export default connect(mapStateToProps, mapDispatchToProps)(App);