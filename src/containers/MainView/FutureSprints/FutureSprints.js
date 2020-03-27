import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import Button from '@material-ui/core/Button';

import Sprint from '../../../components/Sprint/Sprint';
  
const FutureSprints = (props) => {

    const { classes } = props;

    const [displayFutureSprints, setDisplayFutureSprints] = useState(false);

    const toggleFutureSprints = () => {
        setDisplayFutureSprints(!displayFutureSprints);
    }

    let futureSprints = null;
    if (displayFutureSprints && props.sprints && props.futureSprintsStartIndex !== null) {
        const futureSprintsArray = [...props.sprints.slice(props.futureSprintsStartIndex)]
            .map((futureSprint => {
                return (
                <div key={futureSprint.id}>
                    <div className={classes.futureSprintsConditionalButtonsContainer}>
                        <Button 
                            size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => props.openCreatingProject(futureSprint.id)}
                        >
                            ADD NEW PROJECT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => props.openEditingSprint(futureSprint.id)}
                        >
                            EDIT SPRINT
                        </Button>
                        <Button 
                            size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                            startIcon={<InsertChartOutlinedOutlinedIcon />}
                            onClick={() => props.openSprintStatistics(futureSprint.id)}
                        >
                            SPRINT STATISTICS
                        </Button>
                    </div>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={futureSprint} 
                            sprintId={futureSprint.id}
                            onOpenProject={props.openEditingProject}
                            sprintType="future"
                        />
                    </div>
                </div>
                )
            }));
        
        futureSprints = (
            <div className={classes.futureSprintsContainer}>
                <div className={classes.sprintContainer}>
                    {futureSprintsArray}
                </div>
            </div>
        );
    } else if(displayFutureSprints) {
        futureSprints = <div className={classes.sprintMissingMessage} data-testid="NoFutureSprints">No upcoming sprints.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={toggleFutureSprints}>FUTURE SPRINTS</Button>
                    {futureSprints}
            </div>
        </div>
    );
}

export default FutureSprints;