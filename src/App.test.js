import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import App from './App';

import FrontPage from './components/FrontPage/FrontPage';
import MainView from './containers/MainView/MainView';
import PastSprints from './containers/PastSprints/PastSprints';
import Layout from './containers/Layout/Layout';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Logout from './components/Login/Logout/Logout';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = (pathname, serverError, isDemo, isAuthenticated) => {

    const props = {
        classes: {}, // Necessary to work with Material UI
    }

    const mockStore = configureStore([thunk]);
    
    let store = mockStore({
        sprints: {
            sprints: [],
            queue: [],
            error: (serverError ? serverError : null),
        },
        authentication: {
            token: (
                isDemo 
                ? 'demo' 
                : (isAuthenticated ? 'test_token' : null)
            ),
            userId: (isAuthenticated ? 'test_userId' : null),
            error: null,
            loading: false,
            authRedirectPath: '/'
        },
    });

    const enzymeMountWrapper = mount(
        <Provider store={store}>
            <MemoryRouter
                keyLength={0}
                initialEntries={[pathname || "/"]}
            >
                <App {...props}  />
            </MemoryRouter>
        </Provider>
    );

    return {
        enzymeMountWrapper,
        store
    }
}

describe('App Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Unauthenticated --- */

    it('["/"] should render layout container and the front page when unauthenticated and onTryAutoLogin() should fire.', () => {
        const { enzymeMountWrapper, store } = mountSetup();

        // Layout container is rendered
        expect(enzymeMountWrapper.find(Layout)).toHaveLength(1);
        
        // FrontPage component is rendered
        expect(enzymeMountWrapper.find(FrontPage)).toHaveLength(1);

        // MainView component is not rendered
        expect(enzymeMountWrapper.find(MainView)).toHaveLength(0);

        // Because this test is using the mock store, test onTryAutoLogin() by seeing what actions on the store are called: https://stackoverflow.com/a/53538931
        expect(store.getActions()).toEqual(
            [ 
                { type: 'CLEAR_SPRINT_STORE' }, 
                { type: 'AUTH_LOGOUT' } 
            ]
        );
    });

    it('["/login"] should render the login page when unauthenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/login");

        expect(enzymeMountWrapper.find(Login)).toHaveLength(1);
    });

    it('["/create-account"] should render the create account page when unauthenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/create-account");

        expect(enzymeMountWrapper.find(CreateAccount)).toHaveLength(1);
    });

    it('["/demo"] should render the MainView page when unauthenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/demo");

        // Renders MainView
        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);

        // Note: Layout won't render properly for the Demo state, because the store is not updated with the right token.
    });

    it('["/random-url"] should render the front page when unauthenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/random-url");

        expect(enzymeMountWrapper.find(FrontPage)).toHaveLength(1);
    });



    /* --- Authenticated --- */

    it('["/"] should render the MainView page when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/", undefined, undefined, true);

        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);
    });

    it('["/login"] should redirect from Login to the MainView page when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/login", undefined, undefined, true);

        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);
    });

    it('["/past-sprints"] should render the PastSprints page when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/past-sprints", undefined, undefined, true);

        expect(enzymeMountWrapper.find(PastSprints)).toHaveLength(1);
    });

    it('["/logout"] should render the Logout component when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/logout", undefined, undefined, true);

        console.log('logout:', enzymeMountWrapper.debug());
        expect(enzymeMountWrapper.find(Logout)).toHaveLength(1);
    });

    it('["/demo"] should render the MainView page when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/demo", undefined, undefined, true);

        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);
    });

    it('["/random-url"] should render the MainView page when authenticated.', () => {
        const { enzymeMountWrapper } = mountSetup("/random-url", undefined, undefined, true);

        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);
    });



    /* --- Demo --- */

    it('["/"] should render the Logout component when in the demo.', () => {
        const { enzymeMountWrapper } = mountSetup("/", undefined, true);

        expect(enzymeMountWrapper.find(Logout)).toHaveLength(1);
    });

    it('["/login"] should render the Login component when in the demo.', () => {
        const { enzymeMountWrapper } = mountSetup("/login", undefined, true);

        expect(enzymeMountWrapper.find(Login)).toHaveLength(1);
    });

    it('["/logout"] should render the Logout component when in the demo.', () => {
        const { enzymeMountWrapper } = mountSetup("/logout", undefined, true);

        expect(enzymeMountWrapper.find(Logout)).toHaveLength(1);
    });

    it('["/past-sprints"] should render the PastSprints component when in the demo.', () => {
        const { enzymeMountWrapper } = mountSetup("/past-sprints", undefined, true);

        expect(enzymeMountWrapper.find(PastSprints)).toHaveLength(1);
    });

    it('["/demo"] should render the MainView component when in the demo.', () => {
        const { enzymeMountWrapper } = mountSetup("/demo", undefined, true);

        expect(enzymeMountWrapper.find(MainView)).toHaveLength(1);

        // End Demo link is visible in the Layout component
        expect(enzymeMountWrapper.find('header a span').at(0).prop('children'))
            .toEqual(expect.arrayContaining(['End Demo']));
    });



    /* --- All Authentication Statuses --- */

    it('should render an error message when there is a server error.', () => {
        const { enzymeMountWrapper } = mountSetup(undefined, 'error_message');

        // Error message is displayed
        expect(enzymeMountWrapper.find('div h5').prop('children'))
            .toEqual('Deliberate Sprints is unable to reach the server. Please check your internet connection and refresh the page.');
    });
});