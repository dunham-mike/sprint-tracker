import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';

import ModalErrorBoundary from './ModalErrorBoundary';
import CancelButton from '../../../components/UI/CancelButton/CancelButton';

Enzyme.configure({ adapter: new Adapter() });

const mountSetup = () => {

    const enzymeMountWrapper = mount(
        <ModalErrorBoundary>
            <CancelButton />
        </ModalErrorBoundary>
    );

    return {
        enzymeMountWrapper
    }
}

describe('ModalErrorBoundary Component', () => {

    it('should match the snapshot', () => {
        const { enzymeMountWrapper } = mountSetup();
        expect(toJson(enzymeMountWrapper)).toMatchSnapshot();
    });

    it('should display an ErrorMessage if wrapped component throws', () => {  
        const { enzymeMountWrapper } = mountSetup();

        const error = new Error('test_error');
    
        enzymeMountWrapper.find(CancelButton).simulateError(error);
    
        expect(enzymeMountWrapper.find('.MuiTypography-root.MuiTypography-h5').prop('children'))
            .toEqual('Something went wrong! Please try something else or refresh the page.');
    });

});