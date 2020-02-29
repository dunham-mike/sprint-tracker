import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const styles = theme => ({
    cancelButtonContainer: {
        cursor: 'pointer',
        color: red[100],
        margin: theme.spacing(1),
        '&:hover': {
            color: red[200],
        },
    },
});

const cancelButton = (props) => {
    const { classes } = props;

    return (
        <div className={classes.cancelButtonContainer} onClick={props.clicked}>
            <CancelOutlinedIcon fontSize="large"/>
        </div>
    );
};

export default withStyles(styles)(cancelButton);