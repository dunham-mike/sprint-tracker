import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Redirect } from 'react-router-dom';

import Login from './Login';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = (storeData) => {

    const mockStore = configureStore([]);
    
    let store;

    if(storeData) {
        store = mockStore(storeData);
    } else {
        store = mockStore({
        authentication: {
            loading: false,
            error: null,
            token: null,
            authRedirectPath: "/",
            },
        });
    }

    // const onKickoffSignup = jest.fn();

    // const props = {
    //     onKickoffSignup: onKickoffSignup
    // }

    const enzymeMountWrapper = mount(
        <BrowserRouter>
            <Provider store={store}>
                <Login 
                    // {...props}
                />
            </Provider>
        </BrowserRouter>
    );

    return {
        enzymeMountWrapper,
        store
    }
}

describe('Login Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    it('should show the two input fields', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('input[type="email"]')).toHaveLength(1);
        expect(enzymeMountWrapper.find('input[type="password"]')).toHaveLength(1);
    });

    it('should display a translated error message from the store', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    loading: false,
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                    },
                    token: null,
                    authRedirectPath: "/",
                    },
            }
        );
        expect(enzymeMountWrapper.find('#loginErrorMessage')).toHaveLength(1);
    });

    it('should display no error message if the store error is not in the translation list', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    loading: false,
                    error: {
                        message: 'NO_ERROR_TRANSLATION',
                    },
                    token: null,
                    authRedirectPath: "/",
                    },
            }
        );
        expect(enzymeMountWrapper.find('#loginErrorMessage')).toHaveLength(0);
    });

    it('should not display an error message if error in the store is null', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.find('#loginErrorMessage')).toHaveLength(0);
    });

    it('should render a <Redirect> component if the user is authenticated', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    loading: false,
                    error: null,
                    token: 'test_token',
                    authRedirectPath: "/",
                },
            }
        );
        expect(enzymeMountWrapper.find(Redirect)).toHaveLength(1);
    });

});
