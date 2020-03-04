import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as moment from 'moment';

import ProjectTable from './ProjectTable/ProjectTable';

const styles = theme => ({
    sprintTitle: {
        fontWeight: 'bold'
    },
    tableContainer: {
        marginTop: theme.spacing(1),
        maxHeight: '500px',
        overflow: 'auto',
    }
});

const sprint = (props) => {
    const { classes } = props;

    let sprintToDisplay = (
        <div>
            No sprint available.
        </div>
    );

    const getSprintLength = () => {
        const sprintLengthInDays = props.sprint.endDate.diff(props.sprint.startDate, 'days') + 1; // Add 1 because dates are inclusive        
        return Math.ceil(sprintLengthInDays / 7);
    }

    if (props.sprint && (props.sprintType === "current" || props.sprintType === "next" || props.sprintType === "future")) {
        sprintToDisplay = (
            <div>
                <div 
                    className={classes.tableContainer}>
                        <ProjectTable 
                            tableData={props.sprint.projects} 
                            tableTitle={
                                props.sprint.name + ': ' 
                                + moment(props.sprint.startDate).format("M") + '/' + moment(props.sprint.startDate).format("D") + 
                                // Conditionally show start date's year if it is different than the end date's year
                                (moment(props.sprint.startDate).format("YY") !== moment(props.sprint.endDate).format("YY") ? '/' + moment(props.sprint.startDate).format("YY") : '' )
                                + ' to ' + moment(props.sprint.endDate).format("M") + '/' + moment(props.sprint.endDate).format("D") + '/' + moment(props.sprint.endDate).format("YY")
                            }
                            sprintId={props.sprintId}
                            onOpenProject={props.onOpenProject}
                            sprintType={props.sprintType}
                            sprintLength={getSprintLength()}
                        />
                    </div>
            </div>
        );
    }

    // console.log('props.sprint for queue', props.sprint);

    if (props.sprint && props.sprintType === "queue") {
        sprintToDisplay = (
            <div>
                <div className={classes.tableContainer}>
                    <ProjectTable 
                        tableData={props.sprint} 
                        tableTitle={'Queue'}
                        sprintId={props.sprintId}
                        onOpenProject={props.onOpenProject}
                        sprintType={props.sprintType}
                        sprintLength={8}
                    />
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {sprintToDisplay}
        </React.Fragment>
    );
};

export default withStyles(styles)(sprint);