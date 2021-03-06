import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import FrontPage from './components/FrontPage/FrontPage';
import MainView from './containers/MainView/MainView';
import PastSprintsView from './containers/PastSprintsView/PastSprintsView';
import Layout from './containers/Layout/Layout';
import { theme } from './theme/theme';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import * as actions from './store/actions/index';
import Logout from './components/Login/Logout/Logout';

import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';

export class App extends Component {
    componentDidMount = () => {
        // Only try to login if the user is not starting on the demo page
        if(this.props.location.pathname !== "/demo") {
            this.props.onTryAutoLogin();
        }
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

        if (this.props.isDemo) {
            routes = (
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                        <Route path="/login" component={Login} /> {/* So Redirect inside Login can work and route to different areas of the app that require login. */}
                        <Route path="/demo" exact component = {MainView}/>
                        <Route path="/logout" component={Logout} />
                        <Route path="/" exact component = {Logout}/> {/* Hitting the back button in the Demo can take you back to the FrontPage. */}
                        <Route path="/past-sprints" component={PastSprintsView} />
                        <Redirect to="/demo" />
                  </Switch>
                </Suspense>
              );
        } else if (this.props.isAuth) {
            routes = (
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/login" component={Login} /> {/* So Redirect inside Login can work and route to different areas of the app that require login. */}
                    <Route path="/" exact component = {MainView}/>
                    <Route path="/logout" component={Logout} />
                    <Route path="/past-sprints" component={PastSprintsView} />
                    <Redirect to="/" />
                </Switch>
              </Suspense>
            );
        } 

        if (this.props.isServerError) {
            routes = (
                <Typography variant="h5" style={{textAlign: 'center', padding: '10px',}}>
                    Deliberate Sprints is unable to reach the server. Please check your internet connection and refresh the page.
                </Typography>
            );
        }

        return(
            <ThemeProvider theme={theme}>
                {/* <ConfirmProvider> */}
                    <CssBaseline />
                    <ErrorBoundary>
                        <Layout>
                            <ErrorBoundary>
                                {routes}
                            </ErrorBoundary>
                        </Layout>
                    </ErrorBoundary>
                {/* </ConfirmProvider> */}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuth: state.authentication.token !== null,
      isDemo: state.authentication.token === "demo",
      isServerError: state.sprints.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoLogin: () => dispatch(actions.authCheckState())
    };
  };  

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));