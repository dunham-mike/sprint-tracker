import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import Button from '@material-ui/core/Button';

import Sprint from '../../../components/Sprint/Sprint';
  
const CurrentSprint = (props) => {

    const { classes } = props;

    const [displayCurrentSprint, setDisplayCurrentSprint] = useState(true);

    const toggleCurrentSprint = () => {
        setDisplayCurrentSprint(!displayCurrentSprint);
    }

    let currentSprint = null;
    if (displayCurrentSprint && props.sprints && props.currentSprintIndex !== null) {
        currentSprint = (
            <div className={classes.sprintContainer}>
                <div className={classes.innerSprintContainer}>
                    <Sprint 
                        sprint={props.sprints[props.currentSprintIndex]} 
                        sprintId={
                            // This check is necessary to avoid an error when first deleting the current sprint
                            props.sprints[props.currentSprintIndex]
                            ? props.sprints[props.currentSprintIndex].id
                            : null
                        }
                        onOpenProject={props.openEditingProject}
                        sprintType="current"
                    />
                </div>
            </div>
        );
    } else if (displayCurrentSprint) {
        currentSprint = <div className={classes.sprintMissingMessage} data-testid="NoCurrentSprint">No current sprint.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={toggleCurrentSprint}>CURRENT SPRINT</Button>
                {displayCurrentSprint && props.currentSprintIndex !== null
                ?   <div className={classes.conditionalButtonsContainer}>
                        <Button 
                            size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                            startIcon={<AddCircleOutlineOutlinedIcon />} 
                            onClick={() => props.openCreatingProject(props.sprints[props.currentSprintIndex].id)}
                        >
                            ADD NEW PROJECT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => props.openEditingSprint(props.sprints[props.currentSprintIndex].id)}
                        >
                            EDIT SPRINT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                            startIcon={<InsertChartOutlinedOutlinedIcon />}
                            onClick={() => props.openSprintStatistics(props.sprints[props.currentSprintIndex].id)}
                        >
                            SPRINT STATISTICS
                        </Button>
                    </div>
                : null    
                }
            </div>
            {currentSprint}
        </div>
    );
}

export default CurrentSprint;