import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; 

import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';

import Footer from '../../components/Footer/Footer';
import CurrentSprint from './CurrentSprint/CurrentSprint';
import NextSprint from './NextSprint/NextSprint';
import Queue from './Queue/Queue';
import FutureSprints from './FutureSprints/FutureSprints';
import CreateNewSprintButton from './CreateNewSprintButton/CreateNewSprintButton';
import MainViewModals from './MainViewModals/MainViewModals';

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
        flex: '1'
    },

    // Sprint Section Styles
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

    // Future Sprints-Specific Styles
    futureSprintsContainer: {
        marginTop: theme.spacing(-5),
    },
    futureSprintsConditionalButtonsContainer: {
        marginTop: theme.spacing(0.75),
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
    },

    // Breakpoints
    [theme.breakpoints.down('sm')]: { // Docs: https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
        conditionalButtonsContainer: {
            marginTop: '0',
        },
        futureSprintsContainer: {
            marginTop: '0',
        },
    },
    [theme.breakpoints.down('xs')]: { // Docs: https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
        conditionalButtonsContainer: {
            flexDirection: 'column',
        },
        futureSprintsConditionalButtonsContainer: {
            flexDirection: 'column',
        },
        conditionalButtons: {
            width: '100%',
            maxWidth: '320px',
            margin: '2px 0',
        },
    },
});

export class MainView extends Component {
    state = {
        // Tracking which sprints to display
        currentSprintIndex: null,
        nextSprintIndex: null,
        futureSprintsStartIndex: null,

        // Editing/creating a project
        editingProject: false,
        creatingProject: false,
        editingSprint: false,
        creatingSprint: false,
        projectIdBeingViewed: null,
        sprintIdBeingViewed: null,
        sprintIndexBeingViewed: null,

        // Sprint Statistics
        displayingSprintStatistics: false,
    }

    componentDidMount = () => {
        this.props.onOrderSprintsByStartDate();
        this.categorizeSprintsByStartDate();
        if(this.props.isDemo) {
            this.props.onInitiateDemo();
        }
    }

    componentDidUpdate = () => {
        this.categorizeSprintsByStartDate(); // This function only conditionally updates state, so it shouldn't lead to any infinite loops.
    }

    categorizeSprintsByStartDate = () => {
        // console.log('Running categorizeSprintsByStartDate()');
        let currentSprintIndex = null;
        let nextSprintIndex = null;
        let futureSprintsStartIndex = null;

        for(let i=0; i<this.props.sprints.length; i++) {
            if(
                moment.utc().isSameOrAfter(moment.utc(this.props.sprints[i].startDate), "day") // "Now" is same or after the start date
                && moment.utc().isSameOrBefore(moment.utc(this.props.sprints[i].endDate), "day") // "Now" is same or before the end date
                ) {
                    currentSprintIndex = i;

                    // Make sure later indexes are in bounds
                    if (i+1 < this.props.sprints.length) {
                        nextSprintIndex = i+1;
                    }
                    
                    if (i+2 < this.props.sprints.length) {
                        futureSprintsStartIndex = i+2;
                    }
                    
                    break;
            } else if (
                moment.utc().isBefore(moment.utc(this.props.sprints[i].startDate), "day") // "Now" is before the start date
                && moment.utc().isBefore(moment.utc(this.props.sprints[i].endDate), "day") // "Now" is before the end date
                ) {
                    nextSprintIndex = i;

                    if (i+1 < this.props.sprints.length) {
                        futureSprintsStartIndex = i+1;
                    }
                    
                    break;
            }
        }

        if (this.state.currentSprintIndex !== currentSprintIndex 
            || this.state.nextSprintIndex !== nextSprintIndex
            || this.state.futureSprintsStartIndex !== futureSprintsStartIndex) {

            this.setState({
                currentSprintIndex: currentSprintIndex,
                nextSprintIndex: nextSprintIndex,
                futureSprintsStartIndex: futureSprintsStartIndex,
            });
        }        
    }

    getSprintIndexFromSprintId = (sprintId) => {
        if(sprintId === -1) {
            return -1;
        } else {
            for(let i=0; i<this.props.sprints.length; i++) {
                if(this.props.sprints[i].id === sprintId) {
                    return i;
                }
            }
        }
    }

    openEditingProject = (projectId, sprintId) => {
        this.setState({
            editingProject: true,
            projectIdBeingViewed: projectId,
            sprintIdBeingViewed: sprintId,
            sprintIndexBeingViewed: this.getSprintIndexFromSprintId(sprintId),
        });
    }

    closeEditingProject = () => {
        this.setState({
            editingProject: false,
            projectIdBeingViewed: null,
            sprintIdBeingViewed: null,
            sprintIndexBeingViewed: null,
        });
    }

    openCreatingProject = (sprintId) => {
        this.setState({
            creatingProject: true,
            sprintIdBeingViewed: sprintId,
            sprintIndexBeingViewed: this.getSprintIndexFromSprintId(sprintId),
        });
    }

    closeCreatingProject = () => {
        this.setState({
            creatingProject: false,
            sprintIdBeingViewed: null,
            sprintIndexBeingViewed: null,
        });
    }

    openEditingSprint = (sprintId) => {
        this.setState({
            editingSprint: true,
            sprintIdBeingViewed: sprintId,
            sprintIndexBeingViewed: this.getSprintIndexFromSprintId(sprintId),
        });
    }

    closeEditingSprint = () => {
        this.setState({
            editingSprint: false,
            sprintIdBeingViewed: null,
            sprintIndexBeingViewed: null,
        });
    }

    openCreatingSprint = (sprintId) => {
        this.setState({
            creatingSprint: true,
        });
    }

    closeCreatingSprint = () => {
        this.setState({
            creatingSprint: false,
        });
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

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.overallContainer}>
                <div className={classes.mainViewContainer}>
                    <CurrentSprint 
                        classes={classes}
                        sprints={this.props.sprints}
                        currentSprintIndex={this.state.currentSprintIndex}
                        openEditingProject={this.openEditingProject}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                    />

                    <NextSprint 
                        classes={classes}
                        sprints={this.props.sprints}
                        nextSprintIndex={this.state.nextSprintIndex}
                        openEditingProject={this.openEditingProject}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                    />

                    <Queue 
                        classes={classes}
                        queue={this.props.queue}
                        openEditingProject={this.openEditingProject}
                        openCreatingProject={this.openCreatingProject}
                    />

                    <FutureSprints 
                        classes={classes}
                        sprints={this.props.sprints}
                        futureSprintsStartIndex={this.state.futureSprintsStartIndex}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                        openEditingProject={this.openEditingProject}
                    />

                    <CreateNewSprintButton openCreatingSprint={this.openCreatingSprint} />

                    <MainViewModals 
                        sprintIdBeingViewed={this.state.sprintIdBeingViewed}
                        sprintIndexBeingViewed={this.state.sprintIndexBeingViewed}

                        editingProject={this.state.editingProject}
                        closeEditingProject={this.closeEditingProject}
                        projectIdBeingViewed={this.state.projectIdBeingViewed}

                        creatingProject={this.state.creatingProject}
                        closeCreatingProject={this.closeCreatingProject}

                        editingSprint={this.state.editingSprint}
                        closeEditingSprint={this.closeEditingSprint}

                        creatingSprint={this.state.creatingSprint}
                        closeCreatingSprint={this.closeCreatingSprint}

                        displayingSprintStatistics={this.state.displayingSprintStatistics}
                        closeSprintStatistics={this.closeSprintStatistics}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints,
        queue: state.sprints.queue // An array of projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSprintsByStartDate: () => dispatch(actions.orderSprintsByStartDate()),
        onInitiateDemo: () => dispatch(actions.initiateDemo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainView));