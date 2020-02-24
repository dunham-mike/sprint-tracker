import React from 'react';

const sprint = (props) => {
    let sprintToDisplay = (
        <div>
            No sprint available.
        </div>
    );

    if (props.sprint) {
        sprintToDisplay = (
            <div>
                {props.sprint.startDate}
            </div>
        );
    }

    return (
        <React.Fragment>
            {sprintToDisplay}
        </React.Fragment>
    );
};

export default sprint;