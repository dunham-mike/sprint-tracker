import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';

import Sprint from '../../components/Sprint/Sprint';
import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
import Project from '../Project/Project';

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
        position: 'absolute',
        right: '0',
        top: '0',
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
        // backgroundColor: 'red'
    },
    innerSprintContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(4)
        // backgroundColor: 'green',
    },
    sprintMissingMessage: {
        marginBottom: theme.spacing(2)
    }
});

class MainView extends Component {
    state = {
        dateOrderedSprintsArray: null,
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
        updateNeeded: false // This is necessary, because a copy of the sprints are re-ordered after being pulled out of the store
    }

    componentDidMount = () => {
        this.categorizeSprintsByStartDate();
    }

    componentDidUpdate = () => {
        if (this.state.updateNeeded) {
            this.categorizeSprintsByStartDate();
            this.setState({
                updateNeeded: false
            });
        }
    }

    categorizeSprintsByStartDate = () => {
        const dateOrderedSprintsArray = this.orderSprintsByStartDate(this.props.sprints);
        let currentSprintIndex = null;
        let nextSprintIndex = null;
        let futureSprintsStartIndex = null;

        for(let i=0; i<dateOrderedSprintsArray.length; i++) {
            if(dateOrderedSprintsArray[i].startDate < Date.now() && dateOrderedSprintsArray[i].endDate > Date.now()) {
                currentSprintIndex = i;
                nextSprintIndex = i+1;
                futureSprintsStartIndex = i+2;
                break;
            } else if (dateOrderedSprintsArray[i].startDate > Date.now() && dateOrderedSprintsArray[i].endDate > Date.now()) {
                nextSprintIndex = i;
                futureSprintsStartIndex = i+1;
                break;
            }
        }

        this.setState({
            dateOrderedSprintsArray: dateOrderedSprintsArray,
            currentSprintIndex: currentSprintIndex,
            nextSprintIndex: nextSprintIndex,
            futureSprintsStartIndex: futureSprintsStartIndex,
        });
    }

    orderSprintsByStartDate = (sprintsArray) => {
        let dateOrderedSprintsArray = [...sprintsArray];

        dateOrderedSprintsArray.sort((a, b) => {
            return a.startDate - b.startDate
        });

        return dateOrderedSprintsArray;
    }

    triggerUpdateNeeded = () => {
        this.setState({
            updateNeeded: true
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

        if (this.state.displayCurrentSprint && this.state.dateOrderedSprintsArray && this.state.currentSprintIndex !== null) {
            currentSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.state.dateOrderedSprintsArray[this.state.currentSprintIndex]} 
                            sprintId={this.state.dateOrderedSprintsArray[this.state.currentSprintIndex].id}
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

        if (this.state.displayNextSprint && this.state.dateOrderedSprintsArray && this.state.nextSprintIndex !== null ) {
            nextSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.state.dateOrderedSprintsArray[this.state.nextSprintIndex]} 
                            sprintId={this.state.dateOrderedSprintsArray[this.state.nextSprintIndex].id}
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

        if (this.state.displayFutureSprints && this.state.dateOrderedSprintsArray && this.state.futureSprintsStartIndex !== null) {
            const futureSprintsArray = [...this.state.dateOrderedSprintsArray.slice(this.state.futureSprintsStartIndex)]
                .map((futureSprint => {
                    return (<div className={classes.innerSprintContainer} key={futureSprint.id}>
                        <Sprint 
                            sprint={futureSprint} 
                            sprintId={futureSprint.id}
                            onOpenProject={this.openProject}
                            sprintType="future"
                        />
                    </div>)
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

        // Displaying a Project
        let project = null;

        if (this.state.viewingProject) {
            project = (
                <div>
                    <Project 
                        project={this.state.projectBeingViewed}
                        sprintId={this.state.sprintIdBeingViewed}
                        columnNames={this.state.columnNamesBeingViewed}
                        onCloseProject={this.closeProject}
                        onUpdateNeeded={this.triggerUpdateNeeded}
                    />
                </div>
            );
        }

        return(
            <div className={classes.mainViewContainer}>
                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonsContainer}>
                        <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={this.toggleCurrentSprint}>CURRENT SPRINT</Button>
                        {this.state.displayCurrentSprint 
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

                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={this.toggleNextSprint}>NEXT SPRINT</Button>
                        {this.state.displayNextSprint 
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

                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleQueue}>PROJECT QUEUE</Button>
                        {this.state.displayQueue
                        ?   <div className={classes.conditionalButtonsContainer}>
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
                                {/* <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<EditOutlinedIcon />}>EDIT SPRINT</Button>
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<InsertChartOutlinedOutlinedIcon />}>SPRINT STATISTICS</Button> */}
                            </div>
                        : null    
                        }
                        {queue}
                    </div>
                </div>

                <div className={classes.sprintSectionContainer}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleFutureSprints}>FUTURE SPRINTS</Button>
                        {this.state.displayFutureSprints
                        ?   <div className={classes.conditionalButtonsContainer}>
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<AddCircleOutlineOutlinedIcon />}>ADD NEW PROJECT</Button>
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<EditOutlinedIcon />}>EDIT SPRINT</Button>
                                <Button size="small" variant="outlined" color="default" className={classes.conditionalButtons} startIcon={<InsertChartOutlinedOutlinedIcon />}>SPRINT STATISTICS</Button>
                            </div>
                        : null    
                        }
                        {futureSprints}
                    </div>
                    {project}
                </div>
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

export default connect(mapStateToProps)(withStyles(styles)(MainView));