import React from 'react';
import renderer from 'react-test-renderer';

import CancelButton from './CancelButton';

describe('Render CancelButton', () => {

    it('renders CancelButton component correctly', () => {  
        const CancelButtonComponent = renderer.create(<CancelButton />).toJSON();
        expect(CancelButtonComponent).toMatchSnapshot();
    });

});