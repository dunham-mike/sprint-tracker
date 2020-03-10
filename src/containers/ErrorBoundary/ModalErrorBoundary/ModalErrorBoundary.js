import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CancelButton from '../../../components/UI/CancelButton/CancelButton';

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 4, 5),
        outline: '0',
        width: theme.spacing(60),
        position: 'relative',
        zIndex: '1120',
        textAlign: 'center',
    },
    cancelButtonContainer: {
        position: 'absolute',
        top: '0',
        right: '0',
        // top: '7%',
        // right: '7%',
    },
});


// Modeled on: https://reactjs.org/docs/error-boundaries.html
class errorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    // componentDidCatch(error, errorInfo) {
    //   // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    // }
  
    render() {
        const { classes } = this.props;

        if (this.state.hasError) {
            // Rendering custom fallback UI
            return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={true}
                    className={classes.modal}
                    onClose={this.props.onClose}
                >
                    <Paper className={classes.paper}>
                        <div className={classes.cancelButtonContainer} >
                            <CancelButton clicked={this.props.onClose} />
                        </div>
                        <Typography variant="h5">
                            Something went wrong! Please try something else or refresh the page.
                        </Typography>
                    </Paper>
                </Modal>
            );
        }
    
        return this.props.children; 
    }
  }

  export default withStyles(styles)(errorBoundary);