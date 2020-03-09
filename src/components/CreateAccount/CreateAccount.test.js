import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import CreateAccount from './CreateAccount';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore([]);
const store = mockStore({
    authentication: {
        loading: false,
        error: null,
        token: null,
        authRedirectPath: "/",
    },
});

const setup = () => {

    const enzymeWrapper = mount(
        <BrowserRouter>
            <Provider store={store}>
                <CreateAccount />
            </Provider>
        </BrowserRouter>
    );

    return {
        enzymeWrapper
    }
}


describe('CreateAccount Component', () => {

    it('should render with given state from Redux store', () => {
        const { enzymeWrapper } = setup();
        expect(toJson(enzymeWrapper)).toMatchSnapshot();

    });

});