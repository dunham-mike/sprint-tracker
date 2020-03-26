import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from '@material-ui/core/Button';

import Sprint from '../../../components/Sprint/Sprint';

const styles = theme => ({
    sprintSectionContainer: {
        width: '100%',
    },
    sprintContainer: {
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(3),
        width: '100%',
        minHeight: theme.spacing(7),
    },
    innerSprintContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(4)
    },
    sprintMissingMessage: {
        marginBottom: theme.spacing(2)
    },
    buttonContainer: {
        width: '100%',
        position: 'relative',
    },
    conditionalButtonsContainer: {
        paddingTop: theme.spacing(0.75),
        paddingRight: theme.spacing(3),
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        marginTop: theme.spacing(-5),
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: theme.spacing(40),
        fontWeight: 'bold',
    },
    conditionalButtons: {
        margin: '2px 2px',
    },
});
  
const queue = (props) => {
    const { classes } = props;

    let queue = null;

    if (props.displayQueue && props.queue !== null && props.queue.length > 0) {
        queue = (
            <div className={classes.sprintContainer}>
                <div className={classes.innerSprintContainer}>
                    <Sprint 
                        sprint={props.queue} 
                        sprintId={props.queueSprintId}
                        onOpenProject={props.openEditingProject}
                        sprintType="queue"
                    />
                </div>
            </div>
        );
    } else if (props.displayQueue) {
        queue = <div className={classes.sprintMissingMessage} data-testid="NoQueueProjects">No projects in the queue.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={props.toggleQueue}>PROJECT QUEUE</Button>
                {props.displayQueue
                ?   <div className={classes.conditionalButtonsContainer}>
                        <Button 
                            size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => props.openCreatingProject(props.queueSprintId)}
                        >
                            ADD NEW PROJECT
                        </Button>
                    </div>
                : null    
                }
                {queue}
            </div>
        </div>
    );
}

export default withStyles(styles)(queue);