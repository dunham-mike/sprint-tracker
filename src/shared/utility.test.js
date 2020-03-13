import { checkValidity } from './utility';

describe('checkValidity() function', () => {

    it('should evaluate isRequired', () => {
        
        expect(checkValidity(
            'test_value', 
            {
                required: true
            },
        )).toEqual(true);

        expect(checkValidity(
            '', 
            {
                required: true
            },
        )).toEqual(false);

        expect(checkValidity(
            ' test_value ', 
            {
                required: true
            },
        )).toEqual(true);

        expect(checkValidity(
            null, 
            {
                required: true
            },
        )).toEqual(false);

        expect(checkValidity(
            99, 
            {
                required: true
            },
        )).toEqual(true);

        expect(checkValidity(
            { property: 'value' }, 
            {
                required: true
            },
        )).toEqual(true);

        expect(checkValidity(
            {}, 
            {
                required: true
            },
        )).toEqual(true);
    });

    it('should evaluate when there are no rules passed', () => {
        
        expect(checkValidity(
            'test_value', 
            {
            },
        )).toEqual(true);

        expect(checkValidity(
            '', 
            {
            },
        )).toEqual(true);

        expect(checkValidity(
            null, 
            {
            },
        )).toEqual(true);

        expect(checkValidity(
            null, 
            null,
        )).toEqual(true);

    });

    it('should evaluate minLength', () => {
        
        expect(checkValidity(
            'test_value', 
            {
                minLength: 3
            },
        )).toEqual(true);

        expect(checkValidity(
            'test_value', 
            {
                minLength: 10
            },
        )).toEqual(true);

        expect(checkValidity(
            'test_value', 
            {
                minLength: 11
            },
        )).toEqual(false);

        expect(checkValidity(
            '', 
            {
                minLength: 0
            },
        )).toEqual(true);
    });

    it('should evaluate maxLength', () => {
        
        expect(checkValidity(
            'test_value', 
            {
                maxLength: 3
            },
        )).toEqual(false);

        expect(checkValidity(
            'test_value', 
            {
                maxLength: 10
            },
        )).toEqual(true);

        expect(checkValidity(
            'test_value', 
            {
                maxLength: 11
            },
        )).toEqual(true);

        expect(checkValidity(
            '', 
            {
                maxLength: 0
            },
        )).toEqual(true);
    });

    it('should evaluate isEmail', () => {
        
        expect(checkValidity(
            'test@test.com', 
            {
                isEmail: true
            },
        )).toEqual(true);

        expect(checkValidity(
            'test_value', 
            {
                isEmail: true
            },
        )).toEqual(false);

        expect(checkValidity(
            'test@', 
            {
                isEmail: true
            },
        )).toEqual(false);

        expect(checkValidity(
            '@test.com', 
            {
                isEmail: true
            },
        )).toEqual(false);

        expect(checkValidity(
            'test@test', 
            {
                isEmail: true
            },
        )).toEqual(false);

        expect(checkValidity(
            'test@test.', 
            {
                isEmail: true
            },
        )).toEqual(false);

        expect(checkValidity(
            'test@test.c', 
            {
                isEmail: true
            },
        )).toEqual(true);
    });

    it('should evaluate isNumeric', () => {
        
        expect(checkValidity(
            'test_value', 
            {
                isNumeric: true
            },
        )).toEqual(false);

        expect(checkValidity(
            '1234', 
            {
                isNumeric: true
            },
        )).toEqual(true);

        expect(checkValidity(
            'test1234', 
            {
                isNumeric: true
            },
        )).toEqual(false);

        expect(checkValidity(
            '', 
            {
                isNumeric: true
            },
        )).toEqual(false);

        expect(checkValidity(
            '1234%', 
            {
                isNumeric: true
            },
        )).toEqual(false);
    });

});