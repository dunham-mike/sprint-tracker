import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainView from './containers/MainView/MainView';
import Layout from './containers/Layout/Layout';
import { theme } from './theme/theme';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';

function App() {
    let routes = (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/" exact component = {MainView}/>
                <Redirect to="/" />
            </Switch>
        </Suspense>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                {routes}
                {/* <MainView /> */}
            </Layout>
        </ThemeProvider>
    );
}

export default App;