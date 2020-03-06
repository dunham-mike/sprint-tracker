import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import PastSprint from './PastSprint/PastSprint';
import SprintStatistics from '../../components/SprintStatistics/SprintStatistics';

const styles = theme => ({
    mainViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        position: 'relative',
    },
});

class PastSprints extends Component {
    state = {
        displayingSprintStatistics: false,
        sprintIdBeingViewed: null,
        sprintIndexBeingViewed: null,
    }

    toggleCurrentSprint = () => {
        console.log('toggleCurrentSprint');
    }

    getSprintIndexFromSprintId = (sprintId) => {
        for(let i=0; i<this.props.sprints.length; i++) {
            if(this.props.sprints[i].id === sprintId) {
                return i;
            }
        }

        return null;
    }

    openSprintStatistics = (sprintId) => {
        this.setState({
            displayingSprintStatistics: true,
            sprintIdBeingViewed: sprintId,
            sprintIndexBeingViewed: this.getSprintIndexFromSprintId(sprintId),
        })
    }

    closeSprintStatistics = () => {
        this.setState({
            displayingSprintStatistics: false,
            sprintIdBeingViewed: null,
            sprintIndexBeingViewed: null,
        })
    }

    render(){
        const { classes } = this.props;

        const noSprintsMessage = (
            <Typography variant="h5" style={{textAlign: 'center',}}>
                There are no completed sprints to display.
            </Typography>
        );
    
        const sprintsToDisplay = this.props.sprints
            .filter(sprint => sprint.endDate < Date.now())
            .sort((a, b) => b.endDate - a.endDate) // Sort so most recent end dates are at the top
            .map(sprint => {
                return (
                    <PastSprint 
                        sprint={sprint} 
                        openSprintStatistics={this.openSprintStatistics}
                        key={sprint.id}
                    />
                );
            });

        
        console.log('sprintsToDisplay:', sprintsToDisplay);

        // Displaying the Sprint Statistics Modal
        let sprintStatistics = null;

        if (this.state.displayingSprintStatistics) {
            sprintStatistics = (
                <div>
                    <SprintStatistics 
                        sprintId = {this.state.sprintIdBeingViewed}
                        sprintIndex= {this.state.sprintIndexBeingViewed}
                        onCloseSprintStatistics = {this.closeSprintStatistics}
                    />
                </div>
            );
        }

        return(
            <div className={classes.mainViewContainer}>
                {sprintsToDisplay.length === 0 ? noSprintsMessage : null}
                {sprintsToDisplay}
                {sprintStatistics}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(PastSprints));