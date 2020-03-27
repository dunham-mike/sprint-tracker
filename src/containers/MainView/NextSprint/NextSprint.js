import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import Button from '@material-ui/core/Button';

import Sprint from '../../../components/Sprint/Sprint';
  
const NextSprint = (props) => {
    const { classes } = props;

    const [displayNextSprint, setDisplayNextSprint] = useState(false);

    const toggleNextSprint = () => {
        setDisplayNextSprint(!displayNextSprint);
    }

    let nextSprint = null;
    if (displayNextSprint && props.sprints && props.nextSprintIndex !== null ) {
        nextSprint = (
            <div className={classes.sprintContainer}>
                <div className={classes.innerSprintContainer}>
                    <Sprint 
                        sprint={props.sprints[props.nextSprintIndex]} 
                        sprintId={
                            // This check is necessary to avoid an error when first deleting the next sprint
                            props.sprints[props.nextSprintIndex] 
                            ? props.sprints[props.nextSprintIndex].id
                            : null
                        }
                        onOpenProject={props.openEditingProject}
                        sprintType="next"
                    />
                </div>
            </div>
        );
    } else if (displayNextSprint) {
        nextSprint = <div className={classes.sprintMissingMessage} data-testid="NoNextSprint">No upcoming sprint.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={toggleNextSprint}>NEXT SPRINT</Button>
                {displayNextSprint && props.nextSprintIndex !== null
                ?   <div className={classes.conditionalButtonsContainer}>
                        <Button 
                            size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => props.openCreatingProject(props.sprints[props.nextSprintIndex].id)}
                        >
                            ADD NEW PROJECT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => props.openEditingSprint(props.sprints[props.nextSprintIndex].id)}
                        >
                            EDIT SPRINT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                            startIcon={<InsertChartOutlinedOutlinedIcon />}
                            onClick={() => props.openSprintStatistics(props.sprints[props.nextSprintIndex].id)}
                        >
                            SPRINT STATISTICS
                        </Button>
                    </div>
                : null    
                }
            </div> 
            {nextSprint}
        </div>            
    );
}

export default NextSprint;