import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import moment from 'moment'; 

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';

import Sprint from '../../components/Sprint/Sprint';
import EditSprint from '../EditSprint/EditSprint';
import { withStyles } from '@material-ui/core/styles';
import EditProject from '../EditProject/EditProject';
import * as actions from '../../store/actions/index';
import SprintStatistics from '../../components/SprintStatistics/SprintStatistics';
import ModalErrorBoundary from '../ErrorBoundary/ModalErrorBoundary/ModalErrorBoundary';

const styles = theme => ({
    mainViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        position: 'relative',
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
        queueSprintId: -1,
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
        console.log('openCreatingSprint!');

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

        // Displaying Current Sprint
        let currentSprint = null;

        if (this.state.displayCurrentSprint && this.props.sprints && this.state.currentSprintIndex !== null) {
            currentSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.sprints[this.state.currentSprintIndex]} 
                            sprintId={
                                // This check is necessary to avoid an error when first deleting the current sprint
                                this.props.sprints[this.state.currentSprintIndex]
                                ? this.props.sprints[this.state.currentSprintIndex].id
                                : null
                            }
                            onOpenProject={this.openEditingProject}
                            sprintType="current"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayCurrentSprint) {
            currentSprint = <div className={classes.sprintMissingMessage} data-testid="NoCurrentSprint">No current sprint.</div>
        }

        // Displaying Next Sprint
        let nextSprint = null;

        if (this.state.displayNextSprint && this.props.sprints && this.state.nextSprintIndex !== null ) {
            nextSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.sprints[this.state.nextSprintIndex]} 
                            sprintId={
                                // This check is necessary to avoid an error when first deleting the next sprint
                                this.props.sprints[this.state.nextSprintIndex] 
                                ? this.props.sprints[this.state.nextSprintIndex].id
                                : null
                            }
                            onOpenProject={this.openEditingProject}
                            sprintType="next"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayNextSprint) {
            nextSprint = <div className={classes.sprintMissingMessage} data-testid="NoNextSprint">No upcoming sprint.</div>
        }

        // Displaying Queue
        let queue = null;

        if (this.state.displayQueue && this.props.queue !== null && this.props.queue.length > 0) {
            queue = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.queue} 
                            sprintId={this.state.queueSprintId}
                            onOpenProject={this.openEditingProject}
                            sprintType="queue"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayQueue) {
            queue = <div className={classes.sprintMissingMessage} data-testid="NoQueueProjects">No projects in the queue.</div>
        }

        // Displaying Future Sprints
        let futureSprints = null;

        if (this.state.displayFutureSprints && this.props.sprints && this.state.futureSprintsStartIndex !== null) {
            console.log('this.state.futureSprintsStartIndex:', this.state.futureSprintsStartIndex);
            const futureSprintsArray = [...this.props.sprints.slice(this.state.futureSprintsStartIndex)]
                .map((futureSprint => {
                    return (
                    <div key={futureSprint.id}>
                        <div className={classes.futureSprintsConditionalButtonsContainer}>
                            <Button 
                                size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                onClick={() => this.openCreatingProject(futureSprint.id)}
                            >
                                ADD NEW PROJECT
                            </Button>
                            <Button 
                                size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                                startIcon={<EditOutlinedIcon />}
                                onClick={() => this.openEditingSprint(futureSprint.id)}
                            >
                                EDIT SPRINT
                            </Button>
                            <Button 
                                size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                                startIcon={<InsertChartOutlinedOutlinedIcon />}
                                onClick={() => this.openSprintStatistics(futureSprint.id)}
                            >
                                SPRINT STATISTICS
                            </Button>
                        </div>
                        <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={futureSprint} 
                            sprintId={futureSprint.id}
                            onOpenProject={this.openEditingProject}
                            sprintType="future"
                        />
                        </div>
                    </div>
                    )
                }));
            
            futureSprints = (
                <div className={classes.futureSprintsContainer}>
                    <div className={classes.sprintContainer}>
                        {futureSprintsArray}
                    </div>
                </div>
            );
        } else if(this.state.displayFutureSprints) {
            futureSprints = <div className={classes.sprintMissingMessage} data-testid="NoFutureSprints">No upcoming sprints.</div>
        }

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
            <div className={classes.mainViewContainer}>
                {/* Current Sprint Section */}
                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={this.toggleCurrentSprint}>CURRENT SPRINT</Button>
                        {this.state.displayCurrentSprint && this.state.currentSprintIndex !== null
                        ?   <div className={classes.conditionalButtonsContainer}>
                                <Button 
                                    size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                                    startIcon={<AddCircleOutlineOutlinedIcon />} 
                                    onClick={() => this.openCreatingProject(this.props.sprints[this.state.currentSprintIndex].id)}
                                >
                                    ADD NEW PROJECT
                                </Button>
                                <Button 
                                    size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                                    startIcon={<EditOutlinedIcon />}
                                    onClick={() => this.openEditingSprint(this.props.sprints[this.state.currentSprintIndex].id)}
                                >
                                    EDIT SPRINT
                                </Button>
                                <Button 
                                    size="small" variant="outlined" color="primary" className={classes.conditionalButtons} 
                                    startIcon={<InsertChartOutlinedOutlinedIcon />}
                                    onClick={() => this.openSprintStatistics(this.props.sprints[this.state.currentSprintIndex].id)}
                                >
                                    SPRINT STATISTICS
                                </Button>
                            </div>
                        : null    
                        }
                    </div>
                    {currentSprint}
                </div>

                {/* Next Sprint Section */}
                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={this.toggleNextSprint}>NEXT SPRINT</Button>
                        {this.state.displayNextSprint && this.state.nextSprintIndex !== null
                        ?   <div className={classes.conditionalButtonsContainer}>
                                <Button 
                                    size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                                    startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => this.openCreatingProject(this.props.sprints[this.state.nextSprintIndex].id)}
                                >
                                    ADD NEW PROJECT
                                </Button>
                                <Button 
                                    size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                                    startIcon={<EditOutlinedIcon />}
                                    onClick={() => this.openEditingSprint(this.props.sprints[this.state.nextSprintIndex].id)}
                                >
                                    EDIT SPRINT
                                </Button>
                                <Button 
                                    size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} 
                                    startIcon={<InsertChartOutlinedOutlinedIcon />}
                                    onClick={() => this.openSprintStatistics(this.props.sprints[this.state.nextSprintIndex].id)}
                                >
                                    SPRINT STATISTICS
                                </Button>
                            </div>
                        : null    
                        }
                    </div> 
                    {nextSprint}
                </div>    

                {/* Queue Section */}
                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleQueue}>PROJECT QUEUE</Button>
                        {this.state.displayQueue
                        ?   <div className={classes.conditionalButtonsContainer}>
                                <Button 
                                    size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                                    startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => this.openCreatingProject(this.state.queueSprintId)}
                                >
                                    ADD NEW PROJECT
                                </Button>
                            </div>
                        : null    
                        }
                        {queue}
                    </div>
                </div>

                {/* Future Sprints Section */}
                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleFutureSprints}>FUTURE SPRINTS</Button>
                            {futureSprints}
                    </div>
                </div>

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