import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import * as moment from 'moment';

import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PastSprint from './PastSprint/PastSprint';
import SprintStatistics from '../../components/SprintStatistics/SprintStatistics';
import ModalErrorBoundary from '../ErrorBoundary/ModalErrorBoundary/ModalErrorBoundary';
import Footer from '../../components/Footer/Footer';

const styles = theme => ({
    overallContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 72px)',
    },
    mainViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(4),
        position: 'relative',
        flex: '1',
    },
    titleContainer: {
        width: '100%',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        
    },
    paper: {
        textAlign: 'center',
        width: '250px',
        margin: '0 auto',
        padding: theme.spacing(1),
    },
    button: {
        width: theme.spacing(40),
        fontWeight: 'bold',
        cursor: 'default',
        pointerEvents: 'auto',
        "&:hover": {
            backgroundColor: blue[500],
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        }
    }
});

class PastSprintsView extends Component {
    state = {
        displayingSprintStatistics: false,
        sprintIdBeingViewed: null,
        sprintIndexBeingViewed: null,
    }

    getSprintIndexFromSprintId = (sprintId) => {
        for(let i=0; i<this.props.sprints.length; i++) {
            if(this.props.sprints[i].id === sprintId) {
                return i;
            }
        }
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
            .filter(sprint => { 
                return  moment.utc().isAfter(moment.utc(sprint.endDate), "day"); }
            )
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

        // Displaying the Sprint Statistics Modal
        let sprintStatistics = null;

        if (this.state.displayingSprintStatistics) {
            sprintStatistics = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeSprintStatistics}
                    >
                        <SprintStatistics 
                            sprintId = {this.state.sprintIdBeingViewed}
                            sprintIndex= {this.state.sprintIndexBeingViewed}
                            onCloseSprintStatistics = {this.closeSprintStatistics}
                        />
                    </ModalErrorBoundary>
                </div>
            );
        }

        return(
            <div className={classes.overallContainer}>
                <div className={classes.mainViewContainer}>
                    <div className={classes.titleContainer}>
                        <Button variant="contained" 
                            disableRipple 
                            disableFocusRipple 
                            color="primary" 
                            className={classes.button}
                        >
                            PAST SPRINTS
                        </Button>
                    </div>
                    {sprintsToDisplay.length === 0 ? noSprintsMessage : null}
                    {sprintsToDisplay}
                    {sprintStatistics}
                </div>
                <Footer />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(PastSprintsView));