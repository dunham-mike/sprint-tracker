import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as moment from 'moment';
// Changed import from 'import * as moment' to accommodate testing, per: https://github.com/palantir/blueprint/issues/959#issuecomment-562836914
import moment from 'moment'; 

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import yellow from '@material-ui/core/colors/yellow';
// import green from '@material-ui/core/colors/green';


import ProjectTable from '../../../components/Sprint/ProjectTable/ProjectTable';

const styles = theme => ({
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
    [theme.breakpoints.down('xs')]: { // Docs: https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
        conditionalButtonsContainer: {
            marginTop: '0',
        },
      },
    conditionalButtons: {
        margin: '0 2px',
        // backgroundColor: yellow[400],
        // color: yellow[400],
        // '&:hover': {
        //     backgroundColor: yellow[600],
        //   },
    },
    buttonSpacing: {
        marginBottom: theme.spacing(1),
        width: theme.spacing(40),
        fontWeight: 'bold',
        backgroundColor: yellow[400],
        color: theme.palette.getContrastText(yellow[400]),
        '&:hover': {
            backgroundColor: yellow[600],
          },
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
    tableContainer: {
        marginTop: theme.spacing(1),
        maxHeight: '500px',
        overflow: 'auto',
    }
});

class PastSprint extends Component {
    state = {
        displaySprint: false,
    }

    toggleSprint = () => {
        this.setState(prevState => {
            return {
                displaySprint: !prevState.displaySprint
            }
        });
        // console.log('toggleCurrentSprint');
    }

    getSprintLength = () => {
        const sprintLengthInDays = this.props.sprint.endDate.diff(this.props.sprint.startDate, 'days') + 1; // Add 1 because dates are inclusive        
        return Math.ceil(sprintLengthInDays / 7);
    }

    render(){
        const { classes } = this.props;

        let sprintTable = null;

        if(this.state.displaySprint) {
            sprintTable = (
                <div className={classes.sprintContainer}>
                    <div className={classes.innerSprintContainer}>
                        <div className={classes.tableContainer}>
                            <ProjectTable 
                                tableData={this.props.sprint.projects} 
                                tableTitle={
                                    this.props.sprint.name + ': ' 
                                    + moment(this.props.sprint.startDate).format("M") + '/' + moment(this.props.sprint.startDate).format("D") + 
                                    // Conditionally show start date's year if it is different than the end date's year
                                    (moment(this.props.sprint.startDate).format("YY") !== moment(this.props.sprint.endDate).format("YY") ? '/' + moment(this.props.sprint.startDate).format("YY") : '' )
                                    + ' to ' + moment(this.props.sprint.endDate).format("M") + '/' + moment(this.props.sprint.endDate).format("D") + '/' + moment(this.props.sprint.endDate).format("YY")
                                }
                                sprintId={this.props.sprintId}
                                onOpenProject={null}
                                sprintType={"past"}
                                sprintLength={this.getSprintLength()}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return(
            <div className={classes.sprintSectionContainer}>
                <div className={classes.buttonContainer}>
                    <Button variant="contained" color="primary" className={classes.buttonSpacing} onClick={this.toggleSprint}>
                        {this.props.sprint.name}
                    </Button>
                    {this.state.displaySprint
                    ?   <div className={classes.conditionalButtonsContainer}>
                            <Button 
                                size="small" variant="outlined" color="default" className={classes.conditionalButtons} 
                                startIcon={<InsertChartOutlinedOutlinedIcon />}
                                onClick={() => this.props.openSprintStatistics(this.props.sprint.id)} 
                            >
                                SPRINT STATISTICS
                            </Button>
                        </div>
                    : null    
                    }
                </div>
                {sprintTable}
            </div>
        );
    }
};


export default withStyles(styles)(PastSprint);