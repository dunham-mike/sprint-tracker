import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    Modal: {
        position: 'fixed',
        zIndex: '10000',
        width: '86%',
        height: '86%',
        left: '7%',
        top: '7%',
        opacity: '1',
        backgroundColor: 'white',
        overflow: 'auto'
    },
});

const modal = (props) => {
    const { classes } = props;

    return(
        <div className={classes.Modal}>
            {props.children}
        </div>
    );
}

export default withStyles(styles)(modal);