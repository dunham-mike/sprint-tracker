import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
// import grey from '@material-ui/core/colors/grey';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';


const styles = theme => ({
    CancelButtonContainer: {
        position: 'fixed',
        top: '7%',
        right: '7%',
        cursor: 'pointer',
        color: red[100],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    title: {
        textAlign: 'center',
        // color: blue[400],
        marginTop: theme.spacing(2),
    },
    contentContainer: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(-2),
    },
    contentSection: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    centeredContentSection: {
        display: 'flex',
        alignItems: 'center',
    },
    unorderedList: {
        paddingLeft: theme.spacing(3),
    },
    horizontalRule: {
        width: '60%',
    },
    xsOnlyHorizontalRule: {
        width: '0',
    },
    [theme.breakpoints.down('sm')]: {
        xsOnlyHorizontalRule: {
            width: '60%',
        }
    },
});

const sprintStatistics = (props) => {
    // props: sprintId
    const { classes } = props;

    const getSprintIndexBySprintId = (sprintId) => {
        const sprintsArray = props.sprints;

        for (let i=0; i<sprintsArray.length; i++) {
            if(sprintsArray[i].id === sprintId) {
                return i;
            }
        }
        
        return null;
    }

    const calculateNumProjectsByGrouping = (grouping) => {
        // Grouping options: 'manager', 'category'
        console.log('calculateNumProjectsByGrouping()');

        const sprintIndex = getSprintIndexBySprintId(props.sprintId);
        if (sprintIndex === null) {
            return null;
        }
        let projectCountByGrouping = {};
        const sprintProjectsArray = props.sprints[sprintIndex].projects;

        for(let i=0; i<sprintProjectsArray.length; i++) {
            let groupingHolder = null;

            if (grouping === 'manager') {
                groupingHolder = sprintProjectsArray[i].manager.value;
            } else if (grouping === 'category') {
                groupingHolder = sprintProjectsArray[i].category.value;
            } else {
                return null;
            }
            

            if(projectCountByGrouping[groupingHolder]) {
                projectCountByGrouping[groupingHolder] = projectCountByGrouping[groupingHolder]+1;
            } else {
                projectCountByGrouping[groupingHolder] = 1;
            }
        }

        return projectCountByGrouping;
    }

    const calculateProjectPointsByGrouping = (grouping) => {
        // Grouping options: 'manager', 'category'
        console.log('calculateProjectPointsByGrouping()');

        const sprintIndex = getSprintIndexBySprintId(props.sprintId);
        if (sprintIndex === null) {
            return null;
        }
        let projectPointsByGrouping = {};
        const sprintProjectsArray = props.sprints[sprintIndex].projects;

        for(let i=0; i<sprintProjectsArray.length; i++) {
            let groupingHolder = null;

            if (grouping === 'manager') {
                groupingHolder = sprintProjectsArray[i].manager.value;
            } else if (grouping === 'category') {
                groupingHolder = sprintProjectsArray[i].category.value;
            } else {
                return null;
            }
            
            const estimatedProjectSizeString = sprintProjectsArray[i].estimatedProjectSize.value;
            const projectPoints = Number(estimatedProjectSizeString.slice(0, estimatedProjectSizeString.indexOf(' ')));

            if(projectPointsByGrouping[groupingHolder]) {
                projectPointsByGrouping[groupingHolder] = projectPointsByGrouping[groupingHolder] + projectPoints;
            } else {
                projectPointsByGrouping[groupingHolder] = projectPoints;
            }
        }

        return projectPointsByGrouping;
    }

    const calculateTotalProjects = () => {
        const sprintIndex = getSprintIndexBySprintId(props.sprintId);
        if (sprintIndex !== null) {
            return props.sprints[sprintIndex].projects.length;
        } else {
            return null;
        }
    }

    const calculateTotalProjectPoints = () => {
        const sprintIndex = getSprintIndexBySprintId(props.sprintId);
        if (sprintIndex === null) {
            return null;
        }

        let totalProjectPoints = 0;
        const sprintProjectsArray = props.sprints[sprintIndex].projects;

        for(let i=0; i<sprintProjectsArray.length; i++) {
            const estimatedProjectSizeString = sprintProjectsArray[i].estimatedProjectSize.value;
            const projectPoints = Number(estimatedProjectSizeString.slice(0, estimatedProjectSizeString.indexOf(' ')));

            totalProjectPoints += projectPoints;
        }

        return totalProjectPoints;
    }

    const generateOneWeeksProgressData = (weekNum, totalWeeks) => {
        const sprintIndex = getSprintIndexBySprintId(props.sprintId);
        const sprintProjectsArray = props.sprints[sprintIndex].projects;

        let actualPoints = 0;
        let expectedPoints = 0;

        for(let i=0; i<sprintProjectsArray.length; i++) {
            const estimatedProjectSizeString = sprintProjectsArray[i].estimatedProjectSize.value;
            const projectPoints = Number(estimatedProjectSizeString.slice(0, estimatedProjectSizeString.indexOf(' ')));

            let actualPercentage = parseFloat(sprintProjectsArray[i]['statusEndOfWeek' + weekNum].value);
            if(Number.isNaN(actualPercentage)) {
                actualPercentage = 0;
            } else {
                actualPercentage = actualPercentage / 100;
            }

            actualPoints += projectPoints * actualPercentage;
            expectedPoints += projectPoints * (weekNum / totalWeeks);
        }

        const progressDataObject = {
            name: 'End of Week ' + weekNum,
            actualPoints: actualPoints,
            expectedPoints: expectedPoints,
        };

        return progressDataObject;
    }

    const generateProgressData = (numWeeks) => {
        let progressData = [  
            {name: 'Start', actualPoints: 0, expectedPoints: 0},
        ];

        for(let i=1; i<=numWeeks; i++) { // Not using an index for this for loop, so it starts at 1 and uses <= to determine end
            progressData.push(generateOneWeeksProgressData(i, numWeeks));
        }

        return progressData;
    }

    // Calculating data for display
    const sprintData = props.sprints[getSprintIndexBySprintId(props.sprintId)];
    const numTotalProjects = calculateTotalProjects();
    const numTotalProjectPoints = calculateTotalProjectPoints();
    const numProjectsByProjectManager = calculateNumProjectsByGrouping('manager');
    const numProjectPointsByProjectManager = calculateProjectPointsByGrouping('manager');
    const numProjectsByCategory = calculateNumProjectsByGrouping('category');
    const numProjectPointsByCategory = calculateProjectPointsByGrouping('category');

    // Generating lists of data points for display
    const projectStatsByProjectManager = Object.keys(numProjectsByProjectManager).map(pmKey => {
                return (
                    <div key={pmKey}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.blue}>
                                {pmKey[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={pmKey}
                                secondary={
                                    numProjectsByProjectManager[pmKey] + ' project' + (numProjectsByProjectManager[pmKey] > 1 ? 's' : '')
                                    + '  |  ' 
                                    + numProjectPointsByProjectManager[pmKey] + ' project point' + (numProjectPointsByProjectManager[pmKey] > 1 ? 's' : '')
                                }
                            />
                        </ListItem>
                    </div>
                );
        }); 
    
    const numAveragePointsPerProjectManager = numTotalProjectPoints / projectStatsByProjectManager.length;
    
    const projectStatsByCategory = Object.keys(numProjectsByCategory).map(catKey => {
            return (
                <div key={catKey}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.red}>
                        {catKey[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={catKey}
                        secondary={
                            numProjectsByCategory[catKey] + ' project' + (numProjectsByCategory[catKey] > 1 ? 's' : '')
                            + '  |  ' 
                            + numProjectPointsByCategory[catKey] + ' project point' + (numProjectPointsByCategory[catKey] > 1 ? 's' : '')
                        }
                    />
                </ListItem>
                
                    
                </div>
            );
    });  

    // Recharts
    const progressData = generateProgressData(4); // TODO: Dynamically determine number of weeks to chart based on length of sprint

    const renderLineChart = (
        <ResponsiveContainer height={350}>
            <LineChart width={700} height={350} data={progressData} margin={{ top: 5, right: 50, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="expectedPoints" 
                    stroke={red[300]} 
                    strokeDasharray="10 10"
                    dot={{ strokeDasharray: "0 0" }}
                />
                <Line type="monotone" dataKey="actualPoints" stroke={blue[500]} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, (name === 'actualPoints' ? 'Actual Points' : 'Expected Points')]}/>
            </LineChart>
        </ResponsiveContainer>
      );

    return(
        <React.Fragment>
            <Backdrop />
            <Modal>
                <div className={classes.CancelButtonContainer} onClick={props.onCloseSprintStatistics}><CancelOutlinedIcon fontSize="large"/></div>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={classes.title}>
                                <Typography variant="h4">
                                    {sprintData.name} Overview
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.contentContainer}>
                                <div className={classes.contentSection}>
                                    <Typography variant="h6">
                                        Sprint Size
                                    </Typography>
                                    
                                        <ul className={classes.unorderedList}>
                                            <li>
                                                <Typography variant="body2">{numTotalProjects} projects</Typography>
                                            </li>
                                            <li>
                                                <Typography variant="body2">{numTotalProjectPoints} project points{numTotalProjectPoints > 0 ? ' (' + numAveragePointsPerProjectManager.toFixed(1) + ' avg. per PM)' : ''}</Typography>
                                            </li>
                                        </ul>            
                                </div>
                                <hr className={classes.horizontalRule}/>
                                <div className={classes.contentSection}>
                                    <Typography variant="h6">
                                        Allocation by Project Manager
                                    </Typography>
                                    <List>
                                        {projectStatsByProjectManager}
                                    </List>
                                </div>
                                <hr className={classes.horizontalRule}/>
                                <div className={classes.contentSection}>
                                    <Typography variant="h6">
                                        Projects by Category
                                    </Typography>
                                    <List>
                                        {projectStatsByCategory}
                                    </List>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <div className={classes.contentContainer}>
                                <hr className={classes.xsOnlyHorizontalRule}/>
                                <div className={classes.contentSection}>
                                    <Typography variant="h6">
                                        Sprint Progress
                                    </Typography>
                                </div>
                                <div className={classes.centeredContentSection}>
                                    {renderLineChart}
                                </div>
                                
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints
    }
}

export default connect(mapStateToProps)(withStyles(styles)(sprintStatistics));