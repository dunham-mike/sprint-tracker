import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';


// import classes from './Modal.module.css';

const styles = theme => ({
    Backdrop: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '9000',
        left: '0',
        top: '0',
        backgroundColor: 'black',
        opacity: '0.6',
    },
    Modal: {
        position: 'fixed',
        zIndex: '10000',
        width: '86%',
        height: '86%',
        left: '7%',
        top: '7%',
        opacity: '1',
        backgroundColor: 'white',
        overflow: 'auto'
    },
    CancelButtonContainer: {
        position: 'fixed',
        top: '7%',
        right: '7%',
        cursor: 'pointer',
        color: red[100],
    },
    FormContainer: { // TODO: Get rid of this unless we need it.
        margin: theme.spacing(1),
        textAlign: 'center'
    },
    FormTitle: {
        // textAlign: 'center',
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

class Project extends Component {
    state = {
        sprintId: null,
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
                valid: false,
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
                        {value: '1', displayValue: '1 - Extra Small'},
                        {value: '2', displayValue: '2 - Small'},
                        {value: '3', displayValue: '3 - Small-to-Medium'},
                        {value: '5', displayValue: '5 - Medium'},
                        {value: '8', displayValue: '8 - Medium-to-Large'},
                        {value: '13', displayValue: '13 - Large'},
                        {value: '21', displayValue: '21 - Extra Large'},
                        {value: '34', displayValue: '34 - Gargantuan'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
                touched: false
            },
            mustDo: {
                elementType: 'select',
                elementConfig: {
                    displayName: 'Must Do or Nice-to-Have?',
                    options: [
                        {value: 'mustDo', displayValue: 'Must Do'},
                        {value: 'niceToHave', displayValue: 'Nice-to-Have'}]
                },
                value: '',
                validation: {
                    required: true
                },
                editable: true,
                valid: false,
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
                valid: false,
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
                valid: false,
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
                valid: false,
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
                valid: false,
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
                valid: false,
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
                valid: false,
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
                valid: false,
                touched: false
            },
            statusEndOfWeek2: {
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
                valid: false,
                touched: false
            },
            statusEndOfWeek3: {
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
                valid: false,
                touched: false
            },
            statusEndOfWeek4: {
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
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    componentDidMount() {
        this.loadStateFromProject(this.props.sprintId, this.props.project);
    }

    loadStateFromProject = (sprintId, project) => {
        let newProjectState = {}

        // console.log(project);
        
        const projectKeys = Object.keys(project);

        for(let i=0; i < projectKeys.length; i++) {
            // console.log(projectKeys[i]);
            let updatedObject = this.state.projectData[projectKeys[i]];
            // console.log('updatedObject:', updatedObject);

            updatedObject['value'] = project[projectKeys[i]];
            updatedObject['valid'] = true; // Assume it's true when loading from existing project data
            
            // console.log('fully updatedObject:', updatedObject);
            newProjectState[projectKeys[i]] = updatedObject;
        }

        // console.log('newSprintId:', sprintId);
        // console.log('newProjectState:', newProjectState);

        this.setState({ 
            sprintId: sprintId,
            projectData: newProjectState 
        });
    }

    // inputChangedHandler = () => {
    //     console.log('Update input');
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedProjectData = {
            ...this.state.projectData
        };

        const updatedFormElement = {
            ...updatedProjectData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.validation) {
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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

    updateProjectHandler = (event) => {
        // console.log('updateProjectHandler');
        event.preventDefault();

        let transformedProjectData = {};
        let keys = Object.keys(this.state.projectData);

        for (let i=0; i<keys.length; i++) {
            let thisObject = { 'value': this.state.projectData[keys[i]].value };

            transformedProjectData[keys[i]] = thisObject;
        }

        this.props.onUpdateProject(this.state.sprintId, transformedProjectData);
        this.props.onCloseProject();
        this.props.onUpdateNeeded();
    }

    checkValidity = (value, rules) => {
        let isValid = true;
    
        if (!rules) {
            return true;
        }
    
        if (isValid && rules.required) {
            isValid = value.trim() !== ''; // Remove white space before and after and check that it's not blank
        }
    
        if (isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }
    
        if (isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }
    
        if (isValid && rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value);
        }
    
        if (isValid && rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value);
        }
    
        return isValid;
    }

    render() {
        const { classes } = this.props;
        // console.log(this.props.project);
        // console.log(this.props.columnNames);

        const formElementsArray = [];
        for (let key in this.state.projectData) {
            formElementsArray.push({
                id: key,
                config: this.state.projectData[key],
            });
        }

        // console.log('formElementsArray:', formElementsArray);

        let form = (
            <form onSubmit={this.updateProjectHandler}>
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


        return (
            <React.Fragment>
                <div 
                    className={classes.Backdrop} 
                    // onClick={this.props.onCloseProject} // Commenting this out so users don't accidentally click out while editing.
                />
                <div className={classes.Modal}>
                    <div className={classes.CancelButtonContainer} onClick={this.props.onCloseProject}><CancelOutlinedIcon fontSize="large"/></div>
                    <div className={classes.FormContainer}>
                        <div className={classes.FormTitle}>Edit Project</div>
                        <div>Edit the project information and click "Save" below. * = required field</div>
                        <div className={classes.Form}>
                            {form}
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateProject: (sprintId, projectData) => dispatch(actions.updateProject(sprintId, projectData)),
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Project));