import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

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
        // backgroundColor: 'green',
    }
});

class MainView extends Component {
    state = {
        displayCurrentSprint: true,
        displayNextSprint: false,
        displayQueue: false,
        viewingProject: false,
        projectBeingViewed: null,
        sprintIdBeingViewed: null,
        columnNamesBeingViewed: null
    }

    toggleCurrentSprint = () => {
        this.setState(prevState => {
            return { displayCurrentSprint: !prevState.displayCurrentSprint}
        });
    }

    toggleNextSprint = () => {
        this.setState(prevState => {
            return { displayNextSprint: !prevState.displayNextSprint}
        });
    }

    toggleQueue = () => {
        this.setState(prevState => {
            return { displayQueue: !prevState.displayQueue}
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

        if (this.state.displayCurrentSprint) {
            currentSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={this.props.sprints[0]} 
                            sprintId={this.props.sprints[0].id}
                            onOpenProject={this.openProject}
                        />
                    </div>
                </div>
            );
        }

        // Displaying Next Sprint
        let nextSprint = null;

        if (this.state.displayNextSprint) {
            nextSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint 
                            sprint={null} 
                            sprintId={null}
                            onOpenProject={this.openProject}
                        />
                    </div>
                </div>
            );
        }

        // Displaying Queue
        let queue = null;

        if (this.state.displayQueue) {
            queue = (<div>This is the queue so far.</div>);
        }

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
                    />
                </div>
            );
        }

        return(
            <div className={classes.mainViewContainer}>
                <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={this.toggleCurrentSprint}>CURRENT SPRINT</Button>
                {currentSprint}
                <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={this.toggleNextSprint}>NEXT SPRINT</Button>
                {nextSprint}
                <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleQueue}>QUEUE</Button>
                {queue}
                {project}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints
    }
}

export default connect(mapStateToProps)(withStyles(styles)(MainView));