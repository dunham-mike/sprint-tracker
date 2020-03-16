// Based on: https://stackoverflow.com/questions/43044696/test-a-create-react-app-index-js-file

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom', ()=> ({render: jest.fn()}))

describe('Deliberate Sprints', () => {
    it('renders without crashing', () => {

        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        global.document.getElementById = (id) => id ==='root' && div;
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});