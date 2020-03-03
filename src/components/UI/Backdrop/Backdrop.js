import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    Backdrop: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '1110',
        left: '0',
        top: '0',
        backgroundColor: 'black',
        opacity: '0.6',
    }
});

const backdrop = (props) => {
    const { classes } = props;

    return(
        <div 
            className={classes.Backdrop} 
            onClick={props.onClick}
        />
    );
}

export default withStyles(styles)(backdrop);