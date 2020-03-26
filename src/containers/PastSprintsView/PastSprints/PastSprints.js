import React from 'react';
import * as moment from 'moment';

import Typography from '@material-ui/core/Typography';

import PastSprint from './PastSprint/PastSprint';
  
const pastSprints = (props) => {

    const noSprintsMessage = (
        <Typography variant="h5" style={{textAlign: 'center',}}>
            There are no completed sprints to display.
        </Typography>
    );

    const sprintsToDisplay = props.sprints
        .filter(sprint => { 
            return  moment.utc().isAfter(moment.utc(sprint.endDate), "day"); }
        )
        .sort((a, b) => b.endDate - a.endDate) // Sort so most recent end dates are at the top
        .map(sprint => {
            return (
                <PastSprint 
                    sprint={sprint} 
                    openSprintStatistics={props.openSprintStatistics}
                    key={sprint.id}
                />
            );
        });

    return(
        <React.Fragment>
            {sprintsToDisplay.length === 0 ? noSprintsMessage : null}
            {sprintsToDisplay}
        </React.Fragment>
    );
}

export default pastSprints;