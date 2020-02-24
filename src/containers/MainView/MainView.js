import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import Sprint from '../../components/Sprint/Sprint';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    mainViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        position: 'relative'
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: '300px'
    },
    
});

class MainView extends Component {
    render() {
        const { classes } = this.props;

        return(
            <div className={classes.mainViewContainer}>
                <Button variant="contained" color="primary" className={classes.buttonSpacing}>CURRENT SPRINT</Button>
                <div  className={classes.buttonSpacing}>
                    <Sprint sprint={this.props.sprints[0]} />
                </div>
                <Button variant="contained" color="secondary" className={classes.buttonSpacing}>NEXT SPRINT</Button>
                <div  className={classes.buttonSpacing}>
                    <Sprint sprint={null} />
                </div>
                <Button variant="contained" color="default" className={classes.buttonSpacing}>QUEUE</Button>
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