import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

import * as actions from '../../store/actions/index';

const styles = theme => ({
    paper: {
        width: '350px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(13)
    },
    loginContainer: {
        textAlign: 'center',
        padding: theme.spacing(3),
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    innerFormContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
    },
    fieldContainer: {
        width: '250px',
        margin: theme.spacing(2),
    },
    label: {
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '8px',
    },
    submitContainer: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
    },
    field: {
        outline: 'none',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        font: 'inherit',
        padding: '6px 10px',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        '&:focus': {
            outline: 'none',
            backgroundColor: grey[100],
        },
    },
    errorMessage: {
        margin: theme.spacing(1),
        color: red[400],
    },
    signupErrorMessage: {
        marginTop: theme.spacing(2),
        color: red[400],
        textAlign: 'center',
    },
    createAccount: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
        a: {
            color: grey[300],
        }
        
    }
});

export const createAccount = (props) => {
    const { classes } = props;

    let errorMessage = null;

    if (props.error) {
        const errorMessageTranslation = {
            'EMAIL_EXISTS' : 'An account with that email address already exists',
            'OPERATION_NOT_ALLOWED' : 'New account signups are not allowed at this time',
            'TOO_MANY_ATTEMPTS_TRY_LATER' : 'All requests from this device have been blocked due to unusual activity. Try again later.',
        }

        // Show no error if it's not in the list above
        errorMessage = (
            errorMessageTranslation[props.error.message] 
                ? (<div id="signupErrorMessage" className={classes.signupErrorMessage}>
                    {errorMessageTranslation[props.error.message]}
                </div>)
                : null
        );
    }

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    const submitHandler = (values, { setSubmitting }) => {
        props.onKickoffSignup(values.email, values.password, values.firstName, values.lastName);
        setSubmitting(false);
    }
    
    return(
        <Paper className={classes.paper}>
            {authRedirect}
            <div className={classes.loginContainer}>
                <Typography variant="h5">Create Account</Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(30, 'Must be 30 characters or less'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(6, 'Must be 6 characters or more')
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => { submitHandler(values, { setSubmitting })}}
                >
                    {({ isSubmitting, isValid, dirty, touched }) => (
                    <Form>
                        <div className={classes.formContainer}>
                            <div className={classes.innerFormContainer}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        First Name:
                                    </div>
                                    <Field type="firstName" name="firstName" className={classes.field} />
                                    <ErrorMessage name="firstName" component="div" className={classes.errorMessage} />
                                </div>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Last Name (optional):
                                    </div>
                                    <Field type="lastName" name="lastName" className={classes.field} />
                                    <ErrorMessage name="lastName" component="div" className={classes.errorMessage} />
                                </div>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Email:
                                    </div>
                                    <Field type="email" name="email" className={classes.field} />
                                    <ErrorMessage name="email" component="div" className={classes.errorMessage} />
                                </div>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Password:
                                    </div>
                                    <Field type="password" name="password" className={classes.field} />
                                    <ErrorMessage name="password" component="div" className={classes.errorMessage}/>
                                </div>
                                <div className={classes.submitContainer}>
                                    <Button 
                                        className={classes.Button}
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            !isValid 
                                            || !dirty 
                                            || isSubmitting 
                                            || !touched['firstName']
                                            || !touched['email']
                                            || !touched['password']
                                        }
                                        type="submit"
                                    >
                                        CREATE ACCOUNT
                                    </Button>
                                </div>
                                {errorMessage}
                                <div className={classes.createAccount}>
                                    <Link component={RouterLink} to="/login" color="inherit" variant="body2">Need to log in instead?</Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </Paper>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuth: state.authentication.token !== null,
        authRedirectPath: state.authentication.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onKickoffSignup: (email, password, firstName, lastName) => dispatch(actions.kickoffAuthentication(email, password, true, firstName, lastName)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(createAccount));