import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from '@material-ui/core/Button';

import Sprint from '../../../components/Sprint/Sprint';
  
const Queue = (props) => {
    const { classes } = props;

    const [displayQueue, setDisplayQueue] = useState(false);

    const toggleQueue = () => {
        setDisplayQueue(!displayQueue);
    }

    const queueSprintId = -1;

    let queue = null;
    if (displayQueue && props.queue !== null && props.queue.length > 0) {
        queue = (
            <div className={classes.sprintContainer}>
                <div className={classes.innerSprintContainer}>
                    <Sprint 
                        sprint={props.queue} 
                        sprintId={queueSprintId}
                        onOpenProject={props.openEditingProject}
                        sprintType="queue"
                    />
                </div>
            </div>
        );
    } else if (displayQueue) {
        queue = <div className={classes.sprintMissingMessage} data-testid="NoQueueProjects">No projects in the queue.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={toggleQueue}>PROJECT QUEUE</Button>
                {displayQueue
                ?   <div className={classes.conditionalButtonsContainer}>
                        <Button 
                            size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => props.openCreatingProject(queueSprintId)}
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

export default Queue;