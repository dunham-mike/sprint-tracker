import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initiateDemo = () => {
    return {
        type: actionTypes.INITIATE_DEMO
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

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
            } else {
                dispatch(logout());
            }
        }
    };
};

export const kickoffAuthentication = (email, password, isCreateAccount, firstName, lastName) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { 
            email: email,
            password: password,
            returnSecureToken: true
        };

        // TODO: Store first and last somewhere
        console.log('firstName:', firstName);
        console.log('lastName:', lastName);

        // TODO: Update these specifically for this app.
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIkqUP0Y8W1b8Tvnv60WVf0-R4ag6fQ4g';
        
        if(isCreateAccount) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIkqUP0Y8W1b8Tvnv60WVf0-R4ag6fQ4g';
        }
        
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); // JS time works in milliseconds
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
};