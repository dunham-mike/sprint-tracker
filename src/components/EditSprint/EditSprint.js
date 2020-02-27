import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // https://github.com/uuidjs/uuid
import * as moment from 'moment';

import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import Input from '../../components/UI/Input/Input';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const styles = theme => ({
    CancelButtonContainer: {
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
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    Form: {
        textAlign: 'left'
    },
    ButtonContainer: {
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
    },
    Button: {
        marginLeft: theme.spacing(2)
    }
});

class editSprint extends Component {
    // Props from parent component: sprintId, onCloseSprint, actionType ("edit" or "create")
    // Props from store: sprints (array of the sprints in the store)

    state = {
        formIsValid: false,
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
                    displayName: 'Sprint Name (e.g., #4)'
                },
                value: '',
                validation: {
                    required: false
                },
                editable: true,
                valid: true,
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
        
        const sprintKeys = Object.keys(this.state.sprintData);
        // console.log('sprintKeys:', sprintKeys);

        for(let i=0; i < sprintKeys.length; i++) {
            let updatedObject = {...this.state.sprintData[sprintKeys[i]]};
            // console.log('updatedObject:', updatedObject);

            updatedObject['value'] = this.props.sprints[sprintIndex][sprintKeys[i]];
            updatedObject['valid'] = true; // Assume it's valid when loading from existing project data
            
            newSprintData[sprintKeys[i]] = updatedObject;
        }

        this.setState({ 
            sprintData: newSprintData
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
            console.log('Date is not valid!');
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

        console.log('Updating sprintData in state:', updatedSprintData);
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
            console.log('Dispatch an action to edit the sprint');
            this.props.onUpdateSprint(this.props.sprintId, transformedSprintData);
        } else if (this.props.actionType === "create") {
            console.log('Dispatch an action to create the sprint');
            // this.props.onAddProject(this.state.sprintId, transformedProjectData);
        } else {
            console.log('[Project.js] Error: missing actionType prop');
        }
        
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

        return (
            <React.Fragment>
                <Backdrop />
                <Modal>
                    <div className={classes.CancelButtonContainer} onClick={this.props.onCloseSprint}><CancelOutlinedIcon fontSize="large"/></div>
                    <div className={classes.FormContainer}>
                        <div className={classes.FormTitle}>{verb1} Sprint</div>
                        <div>{verb2} the sprint information and click "Save" below. * = required field</div>
                        <div className={classes.Form}>
                            {form}
                        </div>
                        
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        sprints: state.sprints.sprints
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateSprint: (sprintId, sprintData) => dispatch(actions.updateSprint(sprintId, sprintData)),
        onAddSprint: (sprintData) => dispatch(actions.addSprint(sprintData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(editSprint));