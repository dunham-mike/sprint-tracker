import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
// import { Redirect } from 'react-router-dom';

import Layout from './Layout';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = (storeData) => {

    const mockStore = configureStore([]);
    
    let store;

    if(storeData) {
        store = mockStore(storeData);
    } else {
        store = mockStore({
        authentication: {
            token: null,
            },
        });
    }

    const enzymeMountWrapper = mount(
        <BrowserRouter>
            <Provider store={store}>
                <Layout />
            </Provider>
        </BrowserRouter>
    );

    return {
        enzymeMountWrapper
    }
}

describe('Layout Component', () => {

    /* --- Snapshots --- */

    it('should match the snapshot for an unauthenticated user', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    it('should match the snapshot for an authenticated user', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'test_token',
                },
            }
        );
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    it('should match the snapshot for a demo user', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'demo',
                },
            }
        );
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });



    /* --- Unauthenticated --- */

    it('should show the major Layout common elements when unauthenticated: header bar, drawer toggle icon, title, and log in button', () => {
        const { enzymeMountWrapper } = mountSetup();
        
        expect(enzymeMountWrapper.find('header')).toHaveLength(1);
        expect(enzymeMountWrapper.find('button[aria-label="menu"] span')).toHaveLength(2);
        expect(enzymeMountWrapper.find('a[href="/"]')).toHaveLength(1);
    });

    it('should show the right-side log in button when unauthenticated', () => {
        const { enzymeMountWrapper } = mountSetup();
        
        expect(enzymeMountWrapper.find('a[href="/login"] span')).toHaveLength(2);
    });

    it('should open the unauthenticated side drawer after clicking the toggle icon when unauthenticated', () => {
        const { enzymeMountWrapper } = mountSetup();

        enzymeMountWrapper.find('button[aria-label="menu"]').simulate('click');
        
        // Show drawer container, backdrop, and drawer
        expect(enzymeMountWrapper.find('.MuiDrawer-root.MuiDrawer-modal[role="presentation"]')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiBackdrop-root')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiPaper-root.MuiDrawer-paper')).toHaveLength(1);

        // Correct list of items shown
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(0).prop('children')).toEqual('Home');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(1).prop('children')).toEqual('Try Demo');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(2).prop('children')).toEqual('Create account');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(3).prop('children')).toEqual('Log in');
    });



    /* --- Authenticated --- */

    it('should show the major Layout common elements when authenticated: header bar, drawer toggle icon, and title', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'test_token',
                },
            }
        );
        
        expect(enzymeMountWrapper.find('header')).toHaveLength(1);
        expect(enzymeMountWrapper.find('button[aria-label="menu"] span')).toHaveLength(2);
        expect(enzymeMountWrapper.find('a[href="/"]')).toHaveLength(1);
    });

    it('should show the right-side log out button when authenticated', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'test_token',
                },
            }
        );
        
        expect(enzymeMountWrapper.find('a[href="/logout"] span')).toHaveLength(2);
    });

    it('should open the authenticated side drawer after clicking the toggle icon when authenticated', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'test_token',
                },
            }
        );

        enzymeMountWrapper.find('button[aria-label="menu"]').simulate('click');
        
        // Show drawer container, backdrop, and drawer
        expect(enzymeMountWrapper.find('.MuiDrawer-root.MuiDrawer-modal[role="presentation"]')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiBackdrop-root')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiPaper-root.MuiDrawer-paper')).toHaveLength(1);

        // Correct list of items shown
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(0).prop('children')).toEqual('Home');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(1).prop('children')).toEqual('Past Sprints');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(2).prop('children')).toEqual('Log out');
    });



    /* --- Demo --- */

    it('should show the major Layout common elements when in the demo: header bar, drawer toggle icon, and title', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'demo',
                },
            }
        );
        
        expect(enzymeMountWrapper.find('header')).toHaveLength(1);
        expect(enzymeMountWrapper.find('button[aria-label="menu"] span')).toHaveLength(2);
        expect(enzymeMountWrapper.find('a[href="/"]')).toHaveLength(1);
    });

    it('should show the right-side end demo button when authenticated', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'demo',
                },
            }
        );
        
        expect(enzymeMountWrapper.find('a[href="/logout"] span')).toHaveLength(2);
    });

    it('should open the demo side drawer after clicking the toggle icon when in the demo', () => {
        const { enzymeMountWrapper } = mountSetup(
            {
                authentication: {
                    token: 'demo',
                },
            }
        );

        enzymeMountWrapper.find('button[aria-label="menu"]').simulate('click');
        
        // Show drawer container, backdrop, and drawer
        expect(enzymeMountWrapper.find('.MuiDrawer-root.MuiDrawer-modal[role="presentation"]')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiBackdrop-root')).toHaveLength(1);
        expect(enzymeMountWrapper.find('.MuiPaper-root.MuiDrawer-paper')).toHaveLength(1);

        // Correct list of items shown
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(0).prop('children')).toEqual('Home');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(1).prop('children')).toEqual('Past Sprints');
        expect(enzymeMountWrapper.find('.MuiListItemText-root .MuiTypography-root').at(2).prop('children')).toEqual('End Demo');
    });

});