import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import FrontPage from './FrontPage';

describe('Render FrontPage', () => {

    it('renders FrontPage component correctly', () => {  
        const FrontPageComponent = renderer.create(<BrowserRouter><FrontPage /></BrowserRouter>).toJSON();
        expect(FrontPageComponent).toMatchSnapshot();
    });

});