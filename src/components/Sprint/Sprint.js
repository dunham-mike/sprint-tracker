import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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

    if (props.sprint && (props.sprintType === "current" || props.sprintType === "next" || props.sprintType === "future")) {
        sprintToDisplay = (
            <div>
                <div 
                    className={classes.tableContainer}>
                        <ProjectTable 
                            tableData={props.sprint.projects} 
                            tableTitle={
                                'Sprint #' + props.sprint.order + ': ' 
                                + (props.sprint.startDate.getMonth()+1) + '/' + props.sprint.startDate.getDate() // + '/' + props.sprint.endDate.getFullYear().toString().substr(-2)
                                + ' to ' + (props.sprint.endDate.getMonth()+1) + '/' + props.sprint.endDate.getDate() + '/' + props.sprint.endDate.getFullYear().toString().substr(-2)
                            }
                            sprintId={props.sprintId}
                            onOpenProject={props.onOpenProject}
                            sprintType={props.sprintType}
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