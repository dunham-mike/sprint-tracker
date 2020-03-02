import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

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
    createAccount: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
        a: {
            color: grey[300],
        }
        
    }
});

const login = (props) => {
    const { classes } = props;
    
    return(
        <Paper className={classes.paper}>
            <div className={classes.loginContainer}>
                <Typography variant="h5">Log into Sprint Tracker</Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(6, 'Must be 6 characters or more')
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                    <Form>
                        <div className={classes.formContainer}>
                            <div className={classes.innerFormContainer}>
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
                                        // startIcon={<SaveIcon />}
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        LOG IN
                                    </Button>
                                </div>
                                <div className={classes.createAccount}>
                                    <Link href="/create-account" color="inherit" variant="body2">Need to create an account instead?</Link>
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
  
  export default withStyles(styles)(login);