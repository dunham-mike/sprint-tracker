import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // https://github.com/uuidjs/uuid
import * as moment from 'moment';

import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import Input from '../../components/UI/Input/Input';
import CancelButton from '../../components/UI/CancelButton/CancelButton';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const styles = theme => ({
    cancelButtonContainer: {
        position: 'fixed',
        top: '7%',
        right: '7%',
        cursor: 'pointer',
        color: red[100],
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

class editSprint extends Component {
    // Props from parent component: sprintId, onCloseSprint, actionType ("edit" or "create")
    // Props from store: sprints (array of the sprints in the store)

    state = {
        openConfirmDeleteDialog: false,
        formIsValid: false,
        sprintHasProjects: false,
        sprintData: {
            id: {
                elementType: 'readonly',
                elementConfig: {
                    type: 'text',
                    displayName: 'Sprint ID'
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
                    displayName: 'Sprint Name (e.g., Sprint #4)'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            startDate: {
                elementType: 'date',
                elementConfig: {
                    type: 'text', // Redundant?
                    displayName: 'Start Date'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: false,
                valid: false,
                touched: false
            },
            endDate: {
                elementType: 'date',
                elementConfig: {
                    type: 'text', // Redundant?
                    displayName: 'End Date'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: false,
                valid: false,
                touched: false
            },
            participants: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', // Redundant?
                    displayName: 'Sprint Participants'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: false,
                valid: false,
                touched: false
            },
            owner: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    displayName: 'Sprint Owner'
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
        }
    }

    componentDidMount() {
        if(this.props.actionType === "edit") {
            this.loadStateFromExistingSprint();
        } else if (this.props.actionType === "create") {
            this.loadStateForNewSprint();
        } else {
            console.log('[EditSprint.js] Error: missing actionType prop');
        }
    }

    loadStateForNewSprint = () => {
        let updatedSprintData = {...this.state.sprintData};

        // Generate new unique sprint Id
        updatedSprintData.id.value = uuidv4();

        this.setState({
            sprintData: updatedSprintData
        });
    }

    loadStateFromExistingSprint = () => {
        let newSprintData = {}

        let sprintIndex = null;
        
        for(let i=0; i< this.props.sprints.length; i++) {
            if(this.props.sprints[i].id === this.props.sprintId) {
                sprintIndex = i;
            }
        }

        if (sprintIndex === null) {
            console.log('[EditSprint.js] Error loading sprint data');
        }

        const predefinedSprintKeysOrder = {
            'id': 10,
            'name': 20,
            'startDate': 30,
            'endDate': 40,
            'participants': 50,
            'owner': 60,
            'projects': 70,
        }
        
        const sprintKeys = Object.keys(this.state.sprintData)
            .sort((a, b) => { return predefinedSprintKeysOrder[a] - predefinedSprintKeysOrder[b]});
        // console.log('sprintKeys:', sprintKeys);

        for(let i=0; i < sprintKeys.length; i++) {
            let updatedObject = {...this.state.sprintData[sprintKeys[i]]};
            // console.log('updatedObject:', updatedObject);

            updatedObject['value'] = this.props.sprints[sprintIndex][sprintKeys[i]];
            updatedObject['valid'] = true; // Assume it's valid when loading from existing project data
            
            newSprintData[sprintKeys[i]] = updatedObject;
        }

        const sprintHasProjects = this.props.sprints[sprintIndex].projects.length > 0;

        this.setState({ 
            sprintData: newSprintData,
            sprintHasProjects: sprintHasProjects
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSprintData = {
            ...this.state.sprintData
        };

        const updatedFormElement = {
            ...updatedSprintData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedFormElement.touched = true;
        updatedSprintData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedSprintData) {
            formIsValid = updatedSprintData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            sprintData: updatedSprintData,
            formIsValid: formIsValid
        });
    }

    dateChangedHandler = (incomingDateObject, dateInputIdentifier) => {
        /* Create a new Moment object based on the string output of the old object. This is necessary because Moment objects
           hold onto their initial value in _i, even though the current value is captured in _d. When using console.log, this
           will cause confusing output, so creating a fresh object makes debugging easier. */
        // console.log('incomingDateObject:', incomingDateObject);
        const updatedDate = moment.utc(incomingDateObject.toString()); 
        // console.log('updatedDate:', updatedDate);

        /* If new date isn't valid (say, by typing in something invalid), then mark the form as invalid to prevent saving and don't update 
           the value in the state. Note: Additionally, datetime is configured so users cannot manually edit the input. */
        if (!moment(updatedDate).isValid()) {
            console.log('[Error] Date is not valid!');
            this.setState({
                formIsValid: false
            })
            return;
        }

        const updatedSprintData = {
            ...this.state.sprintData
        };

        const updatedFormElement = {
            ...updatedSprintData[dateInputIdentifier]
        };
        updatedFormElement.value = updatedDate;
        if(updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedFormElement.touched = true;
        updatedSprintData[dateInputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedSprintData) {
            formIsValid = updatedSprintData[inputIdentifier].valid && formIsValid;
        }

        // Also check that endDate >= startDate
        if (formIsValid) {
            formIsValid = updatedSprintData.endDate.value >= updatedSprintData.startDate.value;
        }

        this.setState({
            sprintData: updatedSprintData,
            formIsValid: formIsValid
        });
    }

    saveSprintHandler = (event) => {
        event.preventDefault();

        let transformedSprintData = {};
        let keys = Object.keys(this.state.sprintData);

        for (let i=0; i<keys.length; i++) {
            transformedSprintData[keys[i]] = this.state.sprintData[keys[i]].value;
        }

        if (this.props.actionType === "edit") {
            // console.log('Dispatch an action to edit the sprint');
            this.props.onUpdateSprint(this.props.sprintId, transformedSprintData, this.props.token, this.props.userId);
        } else if (this.props.actionType === "create") {
            transformedSprintData['projects'] = [];
            // console.log('Dispatch an action to create the sprint');
            this.props.onAddSprint(transformedSprintData, this.props.token, this.props.userId);
        } else {
            console.log('[Project.js] Error: missing actionType prop');
        }
        
        this.props.onCloseSprint();
    }

    openConfirmDeleteDialog = () => {
        this.setState( { openConfirmDeleteDialog: true });
    }

    closeConfirmDeleteDialog = () => {
        this.setState( { openConfirmDeleteDialog: false });
    }

    deleteSprintHandler = () => {
        console.log('Deleting sprintId ' + this.props.sprintId);
        this.closeConfirmDeleteDialog();
        this.props.onDeleteSprint(this.props.sprintId, this.props.token, this.props.userId);
        this.props.onCloseSprint();
    }

    render() {
        const { classes } = this.props;

        const formElementsArray = [];
        for (let key in this.state.sprintData) {
            formElementsArray.push({
                id: key,
                config: this.state.sprintData[key],
            });
        }

        let form = (
            <form onSubmit={this.saveSprintHandler}>
                    {/* Display Form Elements */}
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value.toString()}
                            shouldValidate={formElement.config.validation}
                            required={formElement.config.validation.required}
                            valid={formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            dateChanged={(dateObject) => this.dateChangedHandler(dateObject, formElement.id)} />
                    ))}
                    <div className={classes.ButtonContainer}>
                        <Button
                            className={classes.Button}
                            variant="contained"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={this.props.onCloseSprint}
                        >
                            CANCEL
                        </Button>
                        { this.props.actionType === "edit"
                            ? <Button
                                className={classes.Button}
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={this.openConfirmDeleteDialog}
                            >
                            DELETE SPRINT
                        </Button>
                            : null
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

        let dialog = (
            <Dialog
                open={this.state.openConfirmDeleteDialog}
                onClose={this.closeConfirmDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you certain you want to delete the '" + this.state.sprintData.name.value + "' sprint?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeConfirmDeleteDialog} color="primary">
                        No, take me back.
                    </Button>
                    <Button onClick={this.deleteSprintHandler} color="secondary" autoFocus>
                        Yes, I'm certain I want to delete it.
                    </Button>
                </DialogActions>
            </Dialog>
        );
        
        if(this.state.sprintHasProjects) {
            dialog = (
                <Dialog
                    open={this.state.openConfirmDeleteDialog}
                    onClose={this.closeConfirmDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"This sprint cannot be deleted, because it has projects attached to it."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Delete the projects or move them to other sprints, then try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirmDeleteDialog} color="primary">
                            Okay, take me back.
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        let verb1 = "Edit";
        let verb2 = "Edit";

        if(this.props.actionType === "create") {
            verb1 = "Create";
            verb2 = "Enter";
        }

        return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={true}
                    onClose={this.props.onCloseSprint}
                >
                    <Paper className={classes.paper}>
                        <div className={classes.cancelButtonContainer} >
                            <CancelButton clicked={this.props.onCloseSprint} />
                        </div>
                        <div className={classes.FormContainer}>
                            <div className={classes.FormTitle}>
                                <Typography variant="h4">
                                    {verb1} Sprint
                                </Typography>
                            </div>
                            <div>{verb2} the sprint information and click "Save" below. * = required field</div>
                            <div className={classes.Form}>
                                {form}
                            </div>
                        </div>
                        {dialog}
                    </Paper>
                </Modal>
        );
    }
};

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints,
        token: state.authentication.token,
        userId: state.authentication.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateSprint: (sprintId, sprintData, token, userId) => dispatch(actions.updateSprint(sprintId, sprintData, token, userId)),
        onAddSprint: (sprintData, token, userId) => dispatch(actions.addSprint(sprintData, token, userId)),
        onDeleteSprint: (sprintId, token, userId) => dispatch(actions.deleteSprint(sprintId, token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(editSprint));