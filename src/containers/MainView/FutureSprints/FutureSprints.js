import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
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
    futureSprintsContainer: {
        marginTop: theme.spacing(-5),
    },
    [theme.breakpoints.down('sm')]: { // Docs: https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
        conditionalButtonsContainer: {
            marginTop: '0',
        },
        futureSprintsContainer: {
            marginTop: '0',
        },
    },
    futureSprintsConditionalButtonsContainer: {
        marginTop: theme.spacing(0.75),
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
    },
});
  
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

export default withStyles(styles)(FutureSprints);