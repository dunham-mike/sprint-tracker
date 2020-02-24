import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainView from './containers/MainView/MainView';
import Layout from './containers/Layout/Layout';
import { theme } from './theme/theme';


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <MainView />
            </Layout>
        </ThemeProvider>
    );
}

export default App;