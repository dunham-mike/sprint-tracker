import * as actionTypes from './actionTypes';
import axios from 'axios';
const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const initiateDemo = () => {
    return dispatch => {
        dispatch(initiateDemoAuth());
        dispatch(initializeDemoData());
    }
}

const initiateDemoAuth = () => {
    console.log('initiateDemoAuth');
    return {
        type: actionTypes.INITIATE_DEMO_AUTH
    }
}

const initializeDemoData = () => {
    console.log('initializeDemoData');
    return {
        type: actionTypes.INITIALIZE_DEMO_DATA
    }
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        dispatch(clearSprintStore());
        dispatch(finalizeLogout());
    }
    
};

const finalizeLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) { // new Date() is now
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(fetchDataForAuthenticatedUser(token, userId));
            } else {
                dispatch(logout());
            }
        }
    };
};

const clearSprintStore = () => {
    return {
        type: actionTypes.CLEAR_SPRINT_STORE,
    }
}

const loadSprintStore = (fetchedSprintData, fetchedQueueData) => {
    return {
        type: actionTypes.LOAD_SPRINT_STORE,
        fetchedSprintData: fetchedSprintData,
        fetchedQueueData: fetchedQueueData,
    }
}

const fetchDataForAuthenticatedUser = (token, userId) => {
    return dispatch => {
        console.log('Trying to fetch data...');
        const fetchDataFromFirebaseURL = FIREBASE_URL + '/users/' + userId + '.json?auth=' + token;
        axios.get(fetchDataFromFirebaseURL)
            .then(fetchResponse => {
                console.log('fetchResponse:', fetchResponse);
                dispatch(loadSprintStore(fetchResponse.data.sprints, fetchResponse.data.queue));
            })
            .catch(fetchErr => {
                console.log('[Error] Fetching Data Failed:', fetchErr);
                // TODO: Kill the app here
            });
    }
}

export const kickoffAuthentication = (email, password, isCreateAccount, firstName, lastName) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { 
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FIREBASE_API_KEY;
        
        if(isCreateAccount) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_API_KEY;
        }
        
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); // JS time works in milliseconds
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

                if(isCreateAccount) {
                    const initializeUserDataUrl = FIREBASE_URL + '/users/' + response.data.localId + '.json?auth=' + response.data.idToken;
                    const initialUserData = {
                            'firstName': firstName,
                            'lastName': lastName,
                            // 'sprints': { 'tempId': false }, // Dummy data to represent empty sprints
                            // 'queue': { 'tempId': false },
                        };
                    
                    axios.put(initializeUserDataUrl, initialUserData)
                        .then(initalizeResponse => {
                            dispatch(clearSprintStore());
                        })
                        .catch(initializeErr => {
                            console.log('[Error] User Initialization Failed:', initializeErr);
                            // TODO: Kill the app here
                        });
                } else {
                    dispatch(fetchDataForAuthenticatedUser(response.data.localId, response.data.idToken));
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
};