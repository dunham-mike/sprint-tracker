import reducer from './authentication';
import * as actionTypes from '../actions/actionTypes';

/* --- Test Data --- */

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

/* --- Tests --- */
describe('authentication reducer', () => {

    /* --- Initializing Data Actions --- */

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {}))
        .toEqual(
            initialState
        );
    });


    
    /* --- Authentication Process Actions --- */

    it('should handle AUTH_START', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_START,
            })
        ).toEqual(
            {
                ...initialState,
                loading: true
            }
        );
    });

    it('should handle AUTH_SUCCESS', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    loading: true,
                },  
                {
                    type: actionTypes.AUTH_SUCCESS,
                    token: 'test_token',
                    userId: 'test_userId'
                }
            )
        ).toEqual(
            {
                ...initialState,
                token: 'test_token',
                userId: 'test_userId',
                error: null,
                loading: false
            }
        );
    });

    it('should handle AUTH_FAIL', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    loading: true,
                }, 
                {
                    type: actionTypes.AUTH_FAIL,
                    error: 'test_error'
                }
            )
        ).toEqual(
            {
                ...initialState,
                error: 'test_error',
                loading: false
            }
        );
    });

    it('should handle AUTH_LOGOUT', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    token: 'test_token',
                    userId: 'test_userId',
                }, 
                {
                    type: actionTypes.AUTH_LOGOUT,
                }
            )
        ).toEqual(
            {
                ...initialState,
                token: null,
                userId: null,
            }
        );
    });



    /* --- Misc. Actions --- */

    it('should handle INITIATE_DEMO_AUTH', () => {
        expect(
            reducer(
                {
                    ...initialState
                }, 
                {
                    type: actionTypes.INITIATE_DEMO_AUTH,
                }
            )
        ).toEqual(
            {
                ...initialState,
                token: 'demo',
                userId: null,
                error: null,
            }
        );
    });

    it('should handle SET_AUTH_REDIRECT_PATH', () => {
        expect(
            reducer(
                {
                    ...initialState
                }, 
                {
                    type: actionTypes.SET_AUTH_REDIRECT_PATH,
                    path: "/target-path"
                }
            )
        ).toEqual(
            {
                ...initialState,
                authRedirectPath: '/target-path'
            }
        );
    });

});