import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    sprintSectionContainer: {
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        position: 'relative',
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: theme.spacing(40),
        fontWeight: 'bold',
    },
});
  
const createNewSprintButton = (props) => {
    const { classes } = props;

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button 
                    variant="text" color="default" className={classes.buttonSpacing} 
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={props.openCreatingSprint}
                >
                    CREATE NEW SPRINT
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(createNewSprintButton);