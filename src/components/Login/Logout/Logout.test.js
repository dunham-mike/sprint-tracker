import React from 'react';
import { Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

import { Logout } from './Logout';

Enzyme.configure({ adapter: new Adapter() })

const mountSetup = () => {
    const onLogout = jest.fn();

    const props = {
        onLogout: onLogout
    }

    // keyLength={0} to solve an issue with random keys: https://github.com/ReactTraining/react-router/issues/5579#issuecomment-365780767
    const enzymeMountWrapper = mount(
        <BrowserRouter keyLength={0}>
            <Logout {...props} />
        </BrowserRouter>
    );

    return {
        enzymeMountWrapper,
        onLogout
    }
}

describe('LogOut Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    it('should render a <Redirect> component', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(enzymeMountWrapper.contains(<Redirect to="/"/>)).toEqual(true);
    });

    it('should fire onLogout()', () => {
        const { enzymeMountWrapper, onLogout } = mountSetup();
        expect(onLogout).toHaveBeenCalledTimes(1);
    });
});