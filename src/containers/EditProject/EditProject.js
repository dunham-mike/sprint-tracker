import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // https://github.com/uuidjs/uuid
// Changed import from 'import * as moment' to accommodate testing, per: https://github.com/palantir/blueprint/issues/959#issuecomment-562836914
import moment from 'moment'; 

import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import InputOutlinedIcon from '@material-ui/icons/InputOutlined';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import Input from '../../components/UI/Input/Input';
import CancelButton from '../../components/UI/CancelButton/CancelButton';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

const styles = theme => ({
    cancelButtonContainer: {
        position: 'fixed',
        top: '7%',
        right: '7%',
    },
    FormContainer: {
        margin: theme.spacing(1),
        textAlign: 'center'
    },
    FormTitle: {
        marginTop: theme.spacing(1),
        color: red[300],
    },
    Form: {
        textAlign: 'left'
    },
    ButtonContainer: {
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    Button: {
        margin: theme.spacing(1)
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    avatarCurrent: {
        backgroundColor: green[100],
        color: green[600],
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: '0',
        position: 'fixed',
        zIndex: '1120',
        width: '86%',
        height: '86%',
        left: '7%',
        top: '7%',
        overflow: 'auto',
    },
});

export class editProject extends Component {
    state = {
        sprintId: null,
        formIsValid: false,
        openConfirmDeleteDialog: false,
        openAssignSprintDialog: false,
        projectData: {
            id: {
                elementType: 'readonly',
                elementConfig: {
                    type: 'text',
                    displayName: 'Project ID'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: false,
                valid: true,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Project Name'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            manager: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Project Manager'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    displayName: 'Description'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            category: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Category'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            categoryLead: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Category Lead'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            estimatedProjectSize: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Estimated Project Size',
                    options: [
                        {value: '1 - Extra Small', displayValue: '1 - Extra Small'},
                        {value: '2 - Small', displayValue: '2 - Small'},
                        {value: '3 - Small-to-Medium', displayValue: '3 - Small-to-Medium'},
                        {value: '5 - Medium', displayValue: '5 - Medium'},
                        {value: '8 - Medium-to-Large', displayValue: '8 - Medium-to-Large'},
                        {value: '13 - Large', displayValue: '13 - Large'},
                        {value: '21 - Extra Large', displayValue: '21 - Extra Large'},
                        {value: '34 - Gargantuan', displayValue: '34 - Gargantuan'}
                    ]
                },
                value: '1 - Extra Small',
                validation: {
                    required: true
                },
                editable: true,
                valid: true,
                touched: false
            },
            mustDo: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Must Do or Nice-to-Have?',
                    options: [
                        {value: 'Must Do', displayValue: 'Must Do'},
                        {value: 'Nice-to-Have', displayValue: 'Nice-to-Have'}]
                },
                value: 'Must Do',
                validation: {
                    required: true
                },
                editable: true,
                valid: true,
                touched: false
            },
            externalDueDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'External Due Date'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true, // Any field that is not required defaults to valid
                touched: false
            },
            deliverables: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    displayName: 'Deliverables / Outcomes'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            deliverableLink: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Link to Deliverable'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            notes: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    displayName: 'Notes'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            completionStatus: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Did We Fully Complete the Expected Deliverable?',
                    options: [
                        {value: '', displayValue: ''},
                        {value: 'Yes', displayValue: 'Yes'},
                        {value: 'No, but mostly did', displayValue: 'No, but mostly did'},
                        {value: 'No, but partially did', displayValue: 'No, but partially did'},
                        {value: 'No', displayValue: 'No'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            notCompletedExplanation: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    displayName: 'If Not, Why Not?'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek1: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 1 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek2: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 2 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek3: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 3 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek4: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 4 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek5: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 5 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek6: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 6 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek7: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 7 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
            statusEndOfWeek8: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Status End of Week 8 (0-100%)',
                    options: [
                        {value: '', displayValue: ''},
                        {value: '0%', displayValue: '0%'},
                        {value: '25%', displayValue: '25%'},
                        {value: '50%', displayValue: '50%'},
                        {value: '75%', displayValue: '75%'},
                        {value: '100%', displayValue: '100%'},
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
                touched: false
            },
        }
    };

    componentDidMount() {
        // console.log('initialProjectState:', initialProjectState);
        if(this.props.actionType === "edit") {
            this.loadStateFromExistingProject(this.props.sprintId, this.props.projectId);
        } else if (this.props.actionType === "create") {
            this.loadStateForNewProject();
        } else {
            throw new Error("[EditProject.js] Error: missing appropriate actionType prop");
        }
    }

    getProjectIndexWithSprintIndexAndProjectId = (sprintIndex, projectId) => {
        let projectArray;
        if (sprintIndex === -1) { // A value of -1 indicates the sprint is the queue
            projectArray = this.props.queue;
        } else {
            projectArray = this.props.sprints[sprintIndex].projects;
        }
        
        for(let i=0; i<projectArray.length; i++) {
            if(projectArray[i].id.value === projectId) {
                return i;
            }
        }
    
        throw new Error("[EditProject.js] Error: cannot find projectIndex");
    };

    loadStateForNewProject = () => {
        let updatedProjectData = {...this.state.projectData};

        // Generate new unique project Id
        updatedProjectData.id.value = uuidv4();

        this.setState({
            sprintId: this.props.sprintId,
            projectData: updatedProjectData
        });
    }

    loadStateFromExistingProject = (sprintId, projectId) => {
        let newProjectState = {}

        const predefinedProjectKeysOrder = {
            'id': 10,
            'name': 20,
            'manager': 30, 
            'description': 40,
            'category': 50,
            'categoryLead': 60,
            'estimatedProjectSize': 70, 
            'mustDo': 80, 
            'externalDueDate': 90, 
            'deliverables': 100,
            'deliverableLink': 110,
            'notes': 120,
            'completionStatus': 130,
            'notCompletedExplanation': 140,
            'statusEndOfWeek1': 150, 
            'statusEndOfWeek2': 160, 
            'statusEndOfWeek3': 170, 
            'statusEndOfWeek4': 180, 
            'statusEndOfWeek5': 190, 
            'statusEndOfWeek6': 200, 
            'statusEndOfWeek7': 210, 
            'statusEndOfWeek8': 220, 
        }

        const sprintIndex = this.props.sprintIndex;
        const projectIndex = this.getProjectIndexWithSprintIndexAndProjectId(sprintIndex, projectId);

        let projectData = null;
        
        if(sprintIndex === -1) {
            projectData = this.props.queue[projectIndex];
        } else {
            if(this.props.sprints[sprintIndex].id !== sprintId) {
                throw new Error("[EditProject.js] Error: sprintIndex and sprintId don't match the same sprint");
            }
            projectData = this.props.sprints[sprintIndex].projects[projectIndex];
        }
        
        const projectKeys = Object.keys(projectData)
            .sort((a, b) => { return predefinedProjectKeysOrder[a] - predefinedProjectKeysOrder[b]});

        for(let i=0; i < projectKeys.length; i++) {
            let updatedObject = { ...this.state.projectData[projectKeys[i]] };

            updatedObject['value'] = projectData[projectKeys[i]].value;
            updatedObject['valid'] = true; // Assume it's valid when loading from existing project data
            
            newProjectState[projectKeys[i]] = updatedObject;
        }

        // console.log('newProjectState:', newProjectState);

        this.setState({ 
            sprintId: sprintId,
            projectData: newProjectState 
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedProjectData = {
            ...this.state.projectData
        };

        const updatedFormElement = {
            ...updatedProjectData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedFormElement.touched = true;
        updatedProjectData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedProjectData) {
            formIsValid = updatedProjectData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            projectData: updatedProjectData,
            formIsValid: formIsValid
        });
    }

    getTransformedProjectData = () => {
        let transformedProjectData = {};
        let keys = Object.keys(this.state.projectData);

        for (let i=0; i<keys.length; i++) {
            let thisObject = { 'value': this.state.projectData[keys[i]].value };

            transformedProjectData[keys[i]] = thisObject;
        }

        return transformedProjectData;
    }

    saveProjectHandler = (event) => {
        event.preventDefault();

        const transformedProjectData = this.getTransformedProjectData();

        if (this.props.actionType === "edit") {
            this.props.onUpdateProject(this.state.sprintId, transformedProjectData, this.props.token, this.props.userId);
        } else if (this.props.actionType === "create") {
            this.props.onAddProject(this.state.sprintId, transformedProjectData, this.props.token, this.props.userId);
        }
        
        this.props.onCloseProject();
    }

    openConfirmDeleteDialog = () => {
        this.setState( { openConfirmDeleteDialog: true });
    }

    closeConfirmDeleteDialog = () => {
        this.setState( { openConfirmDeleteDialog: false });
    }

    deleteProjectHandler = () => {
        console.log('Deleting projectId ' + this.state.projectData.id.value + ' from sprintId ' + this.props.sprintId);
        this.closeConfirmDeleteDialog();
        this.props.onDeleteProject(this.props.sprintId, this.state.projectData.id.value, this.props.token, this.props.userId);
        this.props.onCloseProject();
    }

    openAssignSprintDialog = () => {
        this.setState( { openAssignSprintDialog: true });
    }

    closeAssignSprintDialog = () => {
        this.setState( { openAssignSprintDialog: false });
    }

    moveProjectHandler = (originSprintId, destinationSprintId) => {
        const projectData = this.getTransformedProjectData();

        this.props.onMoveProject(originSprintId, destinationSprintId, projectData, this.props.token, this.props.userId);
        this.closeAssignSprintDialog();
        this.props.onCloseProject();
    }

    getSprintLength = () => {
        if (this.props.sprintIndex === -1) {
            return 8;
        } else {
            const sprintForProject = this.props.sprints[this.props.sprintIndex];
            const sprintLengthInDays = sprintForProject.endDate.diff(sprintForProject.startDate, 'days') + 1; // Add 1 because dates are inclusive
            
            return Math.ceil(sprintLengthInDays / 7);
        }
    }

    render() {
        const { classes } = this.props;

        const sprintLength = this.getSprintLength();

        const formElementsArray = [];
        for (let key in this.state.projectData) {
            // Filter out statusEndOfWeek keys beyond the length of the sprint
            let includeKey = true;

            if(sprintLength !== null && key.startsWith('statusEndOfWeek')) {
                if(Number(key.slice(15)) > sprintLength) {
                    includeKey = false;
                }
            }

            if(includeKey) {
                formElementsArray.push({
                    id: key,
                    config: this.state.projectData[key],
                });
            }
        }

        let form = (
            <form onSubmit={this.saveProjectHandler}>
                    {/* Display Sprint Info */}
                    <Input 
                        elementType="readonly"
                        elementConfig={{ displayName: 'Sprint ID'}}
                        required={true}
                        value={this.props.sprintId === -1 ? "n/a - on Project Queue" : this.props.sprintId}
                    />
                    {/* Display Rest of Form Elements */}
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            required={formElement.config.validation.required}
                            valid={formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <div className={classes.ButtonContainer}>
                        <Button
                            className={classes.Button}
                            variant="contained"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={this.props.onCloseProject}
                        >
                            CANCEL
                        </Button>
                        { this.props.actionType === "edit"
                            ?   <Button
                                    className={classes.Button}
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<DeleteOutlinedIcon />}
                                    onClick={this.openConfirmDeleteDialog}
                                >
                                    DELETE PROJECT
                                </Button>
                            :   null
                        }
                        { this.props.actionType === "edit"
                            ?   <Button
                                    className={classes.Button}
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<InputOutlinedIcon />}
                                    onClick={this.openAssignSprintDialog}
                                >
                                    ASSIGN TO ANOTHER SPRINT
                                </Button>
                            :   null
                        }
                        <Button 
                            className={classes.Button}
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={!this.state.formIsValid}
                            type="submit"
                        >
                            SAVE
                        </Button>
                    </div>
            </form>
        );

        let verb1 = "Edit";
        let verb2 = "Edit";

        if(this.props.actionType === "create") {
            verb1 = "Create";
            verb2 = "Enter";
        }

        const confirmDeleteDialog = (
            <Dialog
                open={this.state.openConfirmDeleteDialog}
                onClose={this.closeConfirmDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you certain you want to delete the '" + this.state.projectData.name.value + "' project?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeConfirmDeleteDialog} color="primary">
                        NO, TAKE ME BACK.
                    </Button>
                    <Button onClick={this.deleteProjectHandler} color="secondary" autoFocus>
                        YES, I'M CERTAIN I WANT TO DELETE IT.
                    </Button>
                </DialogActions>
            </Dialog>
        );

        let sprints = null;
        let selectNewSprintDialog = null;

        // Only calculate AssignSprintDialog data if it is shown
        if (this.state.openAssignSprintDialog) {
            sprints = this.props.sprints
            // Show only sprints that have not yet ended
            .filter(
                (sprint) => moment(sprint.endDate) > moment()
            )
            // Transform each sprint into an object for display
            .map(sprint => {
                const isCurrentAssignment = sprint.id === this.state.sprintId;

                const sprintDateDisplay = ': ' 
                    + moment(sprint.startDate).format("M") + '/' + moment(sprint.startDate).format("D") + 
                    // Conditionally show start date's year if it is different than the end date's year
                    (moment(sprint.startDate).format("YY") !== moment(sprint.endDate).format("YY") ? '/' + moment(sprint.startDate).format("YY") : '' )
                    + ' to ' + moment(sprint.endDate).format("M") + '/' + moment(sprint.endDate).format("D") + '/' + moment(sprint.endDate).format("YY");

                const displayName = (isCurrentAssignment ? '[Current Assignment] ' : '') + sprint.name + sprintDateDisplay;
                return {
                    sprintId: sprint.id,
                    isCurrentAssignment: isCurrentAssignment,
                    displayName: displayName,
                }
            });

            // Add the object representing the Project Queue
            sprints.push(
                {
                    sprintId: -1,
                    isCurrentAssignment: (this.state.sprintId === -1 ? true : false),
                    displayName: (this.state.sprintId === -1 ? '[Current Assignment] ' : '') + 'Project Queue',
                }
            );

            selectNewSprintDialog = (
                <Dialog onClose={this.closeAssignSprintDialog} aria-labelledby="simple-dialog-title" open={this.state.openAssignSprintDialog}>
                    <DialogTitle id="simple-dialog-title">Select New Sprint</DialogTitle>
                    <List>
                        { sprints.map(sprint => {

                            return (
                                <ListItem button={!sprint.isCurrentAssignment} onClick={sprint.isCurrentAssignment ? null : () => this.moveProjectHandler(this.state.sprintId, sprint.sprintId)} key={sprint.sprintId}>
                                    <ListItemAvatar>
                                    <Avatar 
                                        className={
                                            sprint.isCurrentAssignment
                                            ? classes.avatarCurrent
                                            : classes.avatar
                                        }
                                    >
                                        {sprint.isCurrentAssignment
                                            ? <CheckIcon /> 
                                            : <AddIcon />
                                        }
                                        
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={sprint.displayName} />
                                </ListItem>
                            );
                            
                            }
                        )
                        }

                        <ListItem autoFocus button onClick={this.closeAssignSprintDialog}>
                            <ListItemAvatar>
                                <Avatar>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            );
        } // End of "if (this.state.openAssignSprintDialog)"

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                onClose={this.props.onCloseProject}
            >
                <Paper className={classes.paper}>
                    <div className={classes.cancelButtonContainer} >
                        <CancelButton clicked={this.props.onCloseProject} />
                    </div>
                    <div className={classes.FormContainer}>
                        <div className={classes.FormTitle}>
                            <Typography variant="h4">{verb1} Project</Typography>
                        </div>
                        <div>{verb2} the project information and click "Save" below. * = required field</div>
                        <div className={classes.Form}>
                            {form}
                        </div>
                    </div>
                    {confirmDeleteDialog}
                    {selectNewSprintDialog}
                </Paper>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints,
        queue: state.sprints.queue,
        token: state.authentication.token,
        userId: state.authentication.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateProject: (sprintId, projectData, token, userId) => dispatch(actions.updateProject(sprintId, projectData, token, userId)),
        onAddProject: (sprintId, projectData, token, userId) => dispatch(actions.addProject(sprintId, projectData, token, userId)),
        onDeleteProject: (sprintId, projectId, token, userId) => dispatch(actions.deleteProject(sprintId, projectId, token, userId)),
        onMoveProject: (originSprintId, destinationSprintId, projectData, token, userId) => dispatch(actions.moveProject(originSprintId, destinationSprintId, projectData, token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(editProject));