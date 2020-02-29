import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

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
        <Paper className={classes.Modal}>
            {props.children}
        </Paper>
    );
}

export default withStyles(styles)(modal);