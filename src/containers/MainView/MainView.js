import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import moment from 'moment'; 

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import EditSprint from '../EditSprint/EditSprint';
import { withStyles } from '@material-ui/core/styles';
import EditProject from '../EditProject/EditProject';
import * as actions from '../../store/actions/index';
import SprintStatistics from '../../components/SprintStatistics/SprintStatistics';
import ModalErrorBoundary from '../ErrorBoundary/ModalErrorBoundary/ModalErrorBoundary';

import Footer from '../../components/Footer/Footer';
import CurrentSprint from './CurrentSprint/CurrentSprint';
import NextSprint from './NextSprint/NextSprint';
import Queue from './Queue/Queue';
import FutureSprints from './FutureSprints/FutureSprints';

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
    sprintSectionContainer: {
        width: '100%',
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
    conditionalButtons: {
        margin: '2px 2px',
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: theme.spacing(40),
        fontWeight: 'bold',
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
    }
});

export class MainView extends Component {
    state = {
        // Tracking which sprints to display
        currentSprintIndex: null,
        nextSprintIndex: null,
        futureSprintsStartIndex: null,

        // Tracking which sections to display
        displayCurrentSprint: true,
        displayNextSprint: false,
        displayQueue: false,
        displayFutureSprints: false,

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
        // console.log('process.env.REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY);
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

    toggleCurrentSprint = () => {
        this.setState(prevState => {
            return { displayCurrentSprint: !prevState.displayCurrentSprint }
        });
    }

    toggleNextSprint = () => {
        this.setState(prevState => {
            return { displayNextSprint: !prevState.displayNextSprint }
        });
    }

    toggleQueue = () => {
        this.setState(prevState => {
            return { displayQueue: !prevState.displayQueue }
        });
    }

    toggleFutureSprints = () => {
        this.setState(prevState => {
            return { displayFutureSprints: !prevState.displayFutureSprints }
        });
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

        const queueSprintId = -1;

        // --------------------

        // Displaying the Project Editing Modal
        let projectEdit = null;

        if (this.state.editingProject) {
            projectEdit = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeEditingProject}
                    >
                        <EditProject 
                            projectId={this.state.projectIdBeingViewed}
                            sprintId={this.state.sprintIdBeingViewed}
                            sprintIndex={this.state.sprintIndexBeingViewed}
                            onCloseProject={this.closeEditingProject}
                            actionType={"edit"}
                        />
                    </ModalErrorBoundary>
                </div>
            );
        }

        // Displaying the Project Creating Modal
        let projectCreate = null;

        if (this.state.creatingProject) {
            projectCreate = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeCreatingProject}
                    >
                        <EditProject 
                            projectId={null}
                            sprintId={this.state.sprintIdBeingViewed}
                            sprintIndex={this.state.sprintIndexBeingViewed}
                            onCloseProject={this.closeCreatingProject}
                            actionType={"create"}
                        />
                    </ModalErrorBoundary>
                </div>
            );
        }

        // Displaying the Sprint Editing Modal
        let sprintEdit = null;

        if (this.state.editingSprint) {
            sprintEdit = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeEditingSprint}
                    >
                        <EditSprint
                            sprintId={this.state.sprintIdBeingViewed}
                            onCloseSprint={this.closeEditingSprint}
                            actionType={"edit"}
                        />
                     </ModalErrorBoundary>
                </div>
            );
        }

        // Displaying the Sprint Creating Modal
        let sprintCreate = null;

        if (this.state.creatingSprint) {
            sprintCreate = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeCreatingSprint}
                    >
                        <EditSprint
                            onCloseSprint={this.closeCreatingSprint}
                            actionType={"create"}
                        />
                     </ModalErrorBoundary>
                </div>
            );
        }

        // Displaying the Sprint Statistics Modal
        let sprintStatistics = null;

        if (this.state.displayingSprintStatistics) {
            sprintStatistics = (
                <div>
                    <ModalErrorBoundary
                        onClose={this.closeSprintStatistics}
                    >
                        <SprintStatistics 
                            sprintId={this.state.sprintIdBeingViewed}
                            sprintIndex={this.state.sprintIndexBeingViewed}
                            onCloseSprintStatistics={this.closeSprintStatistics}
                        />
                    </ModalErrorBoundary>
                </div>
            );
        }

        return(
            <div className={classes.overallContainer}>
                <div className={classes.mainViewContainer}>
                    <CurrentSprint 
                        displayCurrentSprint={this.state.displayCurrentSprint}
                        sprints={this.props.sprints}
                        currentSprintIndex={this.state.currentSprintIndex}
                        openEditingProject={this.openEditingProject}
                        toggleCurrentSprint={this.toggleCurrentSprint}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                    />

                    <NextSprint 
                        displayNextSprint={this.state.displayNextSprint}
                        sprints={this.props.sprints}
                        nextSprintIndex={this.state.nextSprintIndex}
                        openEditingProject={this.openEditingProject}
                        toggleNextSprint={this.toggleNextSprint}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                    />

                    <Queue 
                        displayQueue={this.state.displayQueue}
                        queue={this.props.queue}
                        queueSprintId={queueSprintId}
                        openEditingProject={this.openEditingProject}
                        toggleQueue={this.toggleQueue}
                        openCreatingProject={this.openCreatingProject}
                    />

                    <FutureSprints 
                        displayFutureSprints={this.state.displayFutureSprints}
                        sprints={this.props.sprints}
                        futureSprintsStartIndex={this.state.futureSprintsStartIndex}
                        openCreatingProject={this.openCreatingProject}
                        openEditingSprint={this.openEditingSprint}
                        openSprintStatistics={this.openSprintStatistics}
                        openEditingProject={this.openEditingProject}
                        toggleFutureSprints={this.toggleFutureSprints}
                    />

                    {/* Create New Sprint Section */}
                    <div className={classes.sprintSectionContainer}>
                        <div className={classes.buttonContainer}>
                            <Button 
                                variant="text" color="default" className={classes.buttonSpacing} 
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                onClick={this.openCreatingSprint}
                            >
                                CREATE NEW SPRINT
                            </Button>
                        </div>
                    </div>

                    {/* Edit Projects and Sprints Modals */}
                    {projectEdit}
                    {projectCreate}
                    {sprintEdit}
                    {sprintCreate}

                    {/* Sprint Statistics Modal */}
                    {sprintStatistics}

                    
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