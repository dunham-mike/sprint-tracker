import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';

import Sprint from '../../components/Sprint/Sprint';
import { withStyles } from '@material-ui/core/styles';
import Project from '../Project/Project';
import * as actions from '../../store/actions/index';

const styles = theme => ({
    mainViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
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
        paddingRight: theme.spacing(2),
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
        margin: '0 2px',
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: theme.spacing(40),
        fontWeight: 'bold',
    },
    sprintContainer: {
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

class MainView extends Component {
    state = {
        currentSprintIndex: null,
        nextSprintIndex: null,
        futureSprintsStartIndex: null,
        displayCurrentSprint: true,
        displayNextSprint: false,
        displayQueue: false,
        displayFutureSprints: false,
        viewingProject: false,
        projectBeingViewed: null,
        sprintIdBeingViewed: null,
        columnNamesBeingViewed: null,
    }

    componentDidMount = () => {
        this.props.onOrderSprintsByStartDate();
        this.categorizeSprintsByStartDate();
    }

    // TODO: if user changes sprint start dates, need to trigger this to re-run. Perhaps store these values in the Redux store?
    categorizeSprintsByStartDate = () => {
        let currentSprintIndex = null;
        let nextSprintIndex = null;
        let futureSprintsStartIndex = null;

        for(let i=0; i<this.props.sprints.length; i++) {
            if(this.props.sprints[i].startDate < Date.now() && this.props.sprints[i].endDate > Date.now()) {
                currentSprintIndex = i;
                nextSprintIndex = i+1;
                futureSprintsStartIndex = i+2;
                break;
            } else if (this.props.sprints[i].startDate > Date.now() && this.props.sprints[i].endDate > Date.now()) {
                nextSprintIndex = i;
                futureSprintsStartIndex = i+1;
                break;
            }
        }

        this.setState({
            currentSprintIndex: currentSprintIndex,
            nextSprintIndex: nextSprintIndex,
            futureSprintsStartIndex: futureSprintsStartIndex,
        });
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

    openProject = (project, sprintId, columnNames) => {
        this.setState({
            viewingProject: true,
            projectBeingViewed: project,
            sprintIdBeingViewed: sprintId,
            columnNamesBeingViewed: columnNames
        });
    }

    closeProject = () => {
        this.setState({
            viewingProject: false,
            projectBeingViewed: null,
            sprintIdBeingViewed: null,
            columnNamesBeingViewed: null
        });
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
                            sprintId={this.props.sprints[this.state.currentSprintIndex].id}
                            onOpenProject={this.openProject}
                            sprintType="current"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayCurrentSprint) {
            currentSprint = <div className={classes.sprintMissingMessage}>No current sprint.</div>
        }

        // Displaying Next Sprint
        let nextSprint = null;

        if (this.state.displayNextSprint && this.props.sprints && this.state.nextSprintIndex !== null ) {
            nextSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.sprints[this.state.nextSprintIndex]} 
                            sprintId={this.props.sprints[this.state.nextSprintIndex].id}
                            onOpenProject={this.openProject}
                            sprintType="next"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayNextSprint) {
            nextSprint = <div className={classes.sprintMissingMessage}>No upcoming sprint.</div>
        }

        // Displaying Queue
        let queue = null;

        if (this.state.displayQueue && this.props.queue !== null && this.props.queue.length > 0) {
            queue = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.queue} 
                            sprintId={-1}
                            onOpenProject={this.openProject}
                            sprintType="queue"
                        />
                    </div>
                </div>
            );
        } else if (this.state.displayQueue) {
            queue = <div className={classes.sprintMissingMessage}>No projects in the queue.</div>
        }

        // Displaying Future Sprints
        let futureSprints = null;

        if (this.state.displayFutureSprints && this.props.sprints && this.state.futureSprintsStartIndex !== null) {
            const futureSprintsArray = [...this.props.sprints.slice(this.state.futureSprintsStartIndex)]
                .map((futureSprint => {
                    return (
                    <div key={futureSprint.id}>
                        <div className={classes.futureSprintsConditionalButtonsContainer}>
                            <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
                            <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<EditOutlinedIcon />}>EDIT SPRINT</Button>
                            <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<InsertChartOutlinedOutlinedIcon />}>SPRINT STATISTICS</Button>
                        </div>
                        <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={futureSprint} 
                            sprintId={futureSprint.id}
                            onOpenProject={this.openProject}
                            sprintType="future"
                        />
                        </div>
                    </div>
                    )
                }));
            
            futureSprints = (
                <div className={classes.sprintContainer}>
                    {futureSprintsArray}
                </div>
            );
        } else if(this.state.displayFutureSprints) {
            futureSprints = <div className={classes.sprintMissingMessage}>No upcoming sprints.</div>
        }

        // --------------------

        // Displaying the Project Editing Modal
        let project = null;

        if (this.state.viewingProject) {
            project = (
                <div>
                    <Project 
                        project={this.state.projectBeingViewed}
                        sprintId={this.state.sprintIdBeingViewed}
                        columnNames={this.state.columnNamesBeingViewed}
                        onCloseProject={this.closeProject}
                    />
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
                                <Button size="small" variant="outlined" color="primary" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
                                <Button size="small" variant="outlined" color="primary" className={classes.conditionalButtons} startIcon={<EditOutlinedIcon />}>EDIT SPRINT</Button>
                                <Button size="small" variant="outlined" color="primary" className={classes.conditionalButtons} startIcon={<InsertChartOutlinedOutlinedIcon />}>SPRINT STATISTICS</Button>
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
                                <Button size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
                                <Button size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} startIcon={<EditOutlinedIcon />}>EDIT SPRINT</Button>
                                <Button size="small" variant="outlined" color="secondary" className={classes.conditionalButtons} startIcon={<InsertChartOutlinedOutlinedIcon />}>SPRINT STATISTICS</Button>
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
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
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
                        <div className={classes.futureSprintsContainer}>
                            {futureSprints}
                        </div>
                    </div>
                </div>

                {/* Edit Project Modal */}
                {project}
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
        onOrderSprintsByStartDate: () => dispatch(actions.orderSprintsByStartDate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainView));