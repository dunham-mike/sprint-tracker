import * as actions from './index';
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fetchDataForAuthenticatedUser } from './authentication';

// Setup for testing async action creators
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

jest.mock('axios');

/* --- Test Data --- */

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
};
  
global.localStorage = new LocalStorageMock;


/* --- Tests --- */

describe('async authentication actions', () => {


    /* --- initiateDemo() --- */

    it('should create INITIATE_DEMO_AUTH and INITIALIZE_DEMO_DATA upon initiateDemo() function being called', () => {
        const expectedActions = [
            {
                type: actionTypes.INITIATE_DEMO_AUTH
                
            },
            {
                type: actionTypes.INITIALIZE_DEMO_DATA
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.initiateDemo());
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- logout() --- */

    it('should create CLEAR_SPRINT_STORE and AUTH_LOGOUT upon logout() function being called', () => {
        const expectedActions = [
            {
                type: actionTypes.CLEAR_SPRINT_STORE
                
            },
            {
                type: actionTypes.AUTH_LOGOUT
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.logout());
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- fetchDataForAuthenticatedUser() --- */

    it('should create SET_AUTH_REDIRECT_PATH upon setAuthRedirectPath() function being called', () => {
        const expectedActions = [
            {
                type: actionTypes.SET_AUTH_REDIRECT_PATH,
                path: '/test-path'
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.setAuthRedirectPath('/test-path'));
        expect(store.getActions()).toEqual(expectedActions);
    });



    /* --- fetchDataForAuthenticatedUser() --- */

    it('creates LOAD_SPRINT_STORE when fetchDataForAuthenticatedUser() is run and successfully gets data from the server', () => {
        const resp = {
            data: {
                sprints: 'test_sprintData',
                queue: 'test_queueData',
            }
        };
        axios.get.mockResolvedValue(resp);
    
        const expectedActions = [
            { 
                type: actionTypes.LOAD_SPRINT_STORE,
                fetchedSprintData: 'test_sprintData',
                fetchedQueueData: 'test_queueData',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(fetchDataForAuthenticatedUser('test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates MARK_SERVER_UPDATE_ERROR when fetchDataForAuthenticatedUser() is run but fails to get data from the server', () => {
        const error = {data: 'mock_error'};
        axios.get.mockRejectedValue(error);
    
        const expectedActions = [
            { 
                type: actionTypes.MARK_SERVER_UPDATE_ERROR,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(fetchDataForAuthenticatedUser('test_token', 'test_userId'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });



    /* --- kickoffAuthentication() --- */

    it('creates AUTH_START, AUTH_SUCCESS, and LOAD_SPRINT_STORE when kickoffAuthentication() is called and a user successfully logs in', () => {
        const postResp = {
            data: {
                expiresIn: 60,
                idToken: 'test_token',
                localId: 'test_userId',
            }
        };
        axios.post.mockResolvedValue(postResp);

        const getResp = {
            data: {
                sprints: 'test_sprintData',
                queue: 'test_queueData',
            }
        };
        axios.get.mockResolvedValue(getResp);
    
        const expectedActions = [
            { 
                type: actionTypes.AUTH_START
            },
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'test_token',
                userId: 'test_userId',
            },
            {
                type: actionTypes.LOAD_SPRINT_STORE,
                fetchedSprintData: 'test_sprintData',
                fetchedQueueData: 'test_queueData',
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.kickoffAuthentication('test_email', 'test_password', false, 'test_firstName', 'test_lastName'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates AUTH_START and AUTH_FAIL when kickoffAuthentication() is called and a user is unable to log in', () => {
        const error = { response: { data: { error: 'mock_error' } } };
        axios.post.mockRejectedValue(error);

        const expectedActions = [
            { 
                type: actionTypes.AUTH_START
            },
            { 
                type: actionTypes.AUTH_FAIL,
                error: 'mock_error'
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.kickoffAuthentication('test_email', 'test_password', false, 'test_firstName', 'test_lastName'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates AUTH_START, AUTH_SUCCESS, and CLEAR_SPRINT_STORE when kickoffAuthentication() is called and a user successfully creates an account', () => {
        const postResp = {
            data: {
                expiresIn: 60,
                idToken: 'test_token',
                localId: 'test_userId',
            }
        };
        axios.post.mockResolvedValue(postResp);

        const putResp = { data: 'mock_response' };
        axios.put.mockResolvedValue(putResp);
    
        const expectedActions = [
            { 
                type: actionTypes.AUTH_START
            },
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'test_token',
                userId: 'test_userId',
            },
            {
                type: actionTypes.CLEAR_SPRINT_STORE,
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.kickoffAuthentication('test_email', 'test_password', true, 'test_firstName', 'test_lastName'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates AUTH_START and AUTH_FAIL when kickoffAuthentication() is called and a user is unable create an account', () => {
        const error = { response: { data: { error: 'mock_error' } } };
        axios.post.mockRejectedValue(error);

        const expectedActions = [
            { 
                type: actionTypes.AUTH_START
            },
            { 
                type: actionTypes.AUTH_FAIL,
                error: 'mock_error'
            }
        ];
        const store = mockStore({ sprints: [] });
    
        return store.dispatch(actions.kickoffAuthentication('test_email', 'test_password', true, 'test_firstName', 'test_lastName'))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
        });
    });
});

describe('local storage authentication actions', () => {

    beforeEach(() => {
        localStorage.clear();
    });



    /* --- authCheckState() --- */

    it('should execute logout() function if there is no locally-stored token', () => {
        const expectedActions = [
            {
                type: actionTypes.CLEAR_SPRINT_STORE
                
            },
            {
                type: actionTypes.AUTH_LOGOUT
            }
        ];
        const store = mockStore({ sprints: [] });
    
        store.dispatch(actions.authCheckState());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should execute logout() function if there is a locally-stored token but it is expired', () => {
        const expectedActions = [
            {
                type: actionTypes.CLEAR_SPRINT_STORE
                
            },
            {
                type: actionTypes.AUTH_LOGOUT
            }
        ];
        const store = mockStore({ sprints: [] });

        localStorage.setItem('token', 'test_token');
        localStorage.setItem('expirationDate', new Date(new Date().getTime() - 5000));
    
        store.dispatch(actions.authCheckState());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should log the user in if there is a locally-stored token that has not expired', () => {
        const resp = {data: 'mock_response'};
        axios.get.mockResolvedValue(resp);

        const expectedActions = [
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'test_token',
                userId: 'test_userId',
            }
        ];
        const store = mockStore({ sprints: [] });

        localStorage.setItem('token', 'test_token');
        localStorage.setItem('userId', 'test_userId');
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + 1000 * 60));
    
        store.dispatch(actions.authCheckState());
        expect(store.getActions()).toEqual(expectedActions);

        // This test doesn't seem to check whether fetchDataForAuthenticatedUser() succeeds or not, even though it is called in authCheckState()
    });

});