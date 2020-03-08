import React from 'react';
import renderer from 'react-test-renderer';
import * as moment from 'moment';

import Input from './Input';

describe('Render Input', () => {

    it('renders Input component correctly with no props', () => {  
        const InputComponent = renderer.create(<Input />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

    it('renders Input component as "readonly" correctly', () => {  
        const props = {
            elementType: "readonly",
            value: "readonly value",
        };

        const InputComponent = renderer.create(<Input {...props} />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

    it('renders Input component as "input" correctly', () => {  
        const props = {
            elementType: "input",
            value: "input value",
        };

        const InputComponent = renderer.create(<Input {...props} />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

    it('renders Input component as "textarea" correctly', () => {  
        const props = {
            elementType: "textarea",
            value: "textarea value",
        };

        const InputComponent = renderer.create(<Input {...props} />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

    it('renders Input component as "select" correctly', () => {  
        const props = {
            elementType: "select",
            value: "initial select value",
            elementConfig: {
                options: [
                    {value: 'initial select value', displayValue: 'Initial Select Value'},
                    {value: 'second select value', displayValue: 'Second Select Value'},
                ]
            }
        };

        const InputComponent = renderer.create(<Input {...props} />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

    it('renders Input component as "date" correctly', () => {  
        const props = {
            elementType: "date",
            value: moment.utc(0),
        };

        const InputComponent = renderer.create(<Input {...props} />).toJSON();
        expect(InputComponent).toMatchSnapshot();
    });

});