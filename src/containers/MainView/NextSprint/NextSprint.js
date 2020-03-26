import React from 'react';
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
});
  
const nextSprint = (props) => {
    const { classes } = props;

    let nextSprint = null;

    if (props.displayNextSprint && props.sprints && props.nextSprintIndex !== null ) {
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
    } else if (props.displayNextSprint) {
        nextSprint = <div className={classes.sprintMissingMessage} data-testid="NoNextSprint">No upcoming sprint.</div>
    }

    return(
        <div className={classes.sprintSectionContainer}>
            <div className={classes.buttonContainer}>
                <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={props.toggleNextSprint}>NEXT SPRINT</Button>
                {props.displayNextSprint && props.nextSprintIndex !== null
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

export default withStyles(styles)(nextSprint);