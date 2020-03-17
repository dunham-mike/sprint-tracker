import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Redirect } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import Login, { login as UnconnectedLogin } from './Login';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = (storeData, isNoStore) => {

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

    let enzymeMountWrapper = mount(
        <BrowserRouter>
            <Provider store={store}>
                <Login 
                    // {...props}
                />
            </Provider>
        </BrowserRouter>
    );

    const onKickoffLogin = jest.fn();

    const props = {
        onKickoffLogin: onKickoffLogin,
        classes: {}, // Necessary to work with Material UI
        authentication: {
            loading: false,
            error: null,
            token: null,
            authRedirectPath: "/",
        },
    }

    if (isNoStore) {
        enzymeMountWrapper = mount(
            <BrowserRouter>
                <UnconnectedLogin
                    {...props}
                />
            </BrowserRouter>
        );
    }

    return {
        enzymeMountWrapper,
        store,
        onKickoffLogin
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

    it('should have the Submit button disabled initally. After completing required fields, submit button is enabled.' +
        'Upon submission, onKickoffLogin() should be fired.', async () => {
        const { enzymeMountWrapper, onKickoffLogin } = mountSetup(undefined, true);

        // Submit button is disabled
        expect(enzymeMountWrapper.find('button[type="submit"]').props('children').disabled).toEqual(true);

        /* --- Email --- */

        // Pattern based on: https://github.com/jaredpalmer/formik/blob/f5d76609b222ce583663add279ac76e807e2d0ba/README.md#testing-formik
        enzymeMountWrapper.find('input[type="email"]').simulate('change', { 
            persist: () => {},
                // simulate changing e.target.name and e.target.value
                target: {
                    name: 'email',
                    value: 'test@test.com',
                },
        });

        // Blur necessary to trigger touched to become true, per: https://stackoverflow.com/questions/57385931/why-isnt-the-formik-touched-property-being-populated
        enzymeMountWrapper.find('input[type="email"]').simulate('blur');

        /* --- Password --- */

        enzymeMountWrapper.find('input[type="password"]').simulate('change', { 
            persist: () => {},
                // simulate changing e.target.name and e.target.value
                target: {
                    name: 'password',
                    value: 'test_password',
                },
        });

        enzymeMountWrapper.find('input[type="password"]').simulate('blur');

        /* --- Submitting Form --- */
        
        // Submit button enabled
        expect(enzymeMountWrapper.find('button[type="submit"]').props('children').disabled).toEqual(false);

        // Submit form based on this pattern: https://github.com/jaredpalmer/formik/issues/937#issuecomment-565256589
        await act(async () => {
            enzymeMountWrapper.find('form').simulate('submit', {
                preventDefault: () => {} // no op 
            })
        });
        
        expect(onKickoffLogin).toHaveBeenCalledTimes(1);
    });

});
