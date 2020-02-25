import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import Sprint from '../../components/Sprint/Sprint';
import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';

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
        displayQueue: false
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

    render() {
        const { classes } = this.props;

        let currentSprint = null;

        if (this.state.displayCurrentSprint) {
            currentSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint sprint={this.props.sprints[0]} />
                    </div>
                </div>
            );
        }

        let nextSprint = null;

        if (this.state.displayNextSprint) {
            nextSprint = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <Sprint sprint={null} />
                    </div>
                </div>
            );
        }

        let queue = null;

        if (this.state.displayQueue) {
            queue = (<div>This is the queue so far.</div>);
        }

        return(
            <div className={classes.mainViewContainer}>
                <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={this.toggleCurrentSprint}>CURRENT SPRINT</Button>
                {currentSprint}
                <Button variant="contained" color="secondary" className={classes.buttonSpacing} onClick={this.toggleNextSprint}>NEXT SPRINT</Button>
                {nextSprint}
                <Button variant="contained" color="default" className={classes.buttonSpacing} onClick={this.toggleQueue}>QUEUE</Button>
                {queue}
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