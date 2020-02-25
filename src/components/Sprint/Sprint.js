import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ProjectTable from './ProjectTable/ProjectTable';

const styles = theme => ({
    sprintTitle: {
        fontWeight: 'bold'
    },
    tableContainer: {
        marginTop: theme.spacing(1),
        maxHeight: '800px',
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

    if (props.sprint) {
        // console.log(props.sprint.projects);
        sprintToDisplay = (
            <div>
                {/* <div className={classes.sprintTitle}>Sprint #{props.sprint.order}: {props.sprint.startDate} to {props.sprint.endDate}</div> */}
                <div 
                    className={classes.tableContainer}>
                        <ProjectTable 
                            tableData={props.sprint.projects} 
                            tableTitle={'Sprint #' + props.sprint.order + ': ' + props.sprint.startDate + ' to ' + props.sprint.endDate}
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