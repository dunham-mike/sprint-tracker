import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    Input: {
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
    },
    Label: {
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '8px',
    },
    InputElement: {
        outline: 'none',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        font: 'inherit',
        padding: '6px 10px',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
    },
    
    // InputElement:focus: {
    //     outline: 'none'
    //     backgroundColor: '#ccc',
    // },
    
    Invalid: {
        border: '1px solid red',
        backgroundColor: '#FDA49A'
    }
});

const input = (props) => {
    const { classes } = props;

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case('readonly'):
            inputElement = (<div>{props.value}</div>);
            break;
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                // {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                rows='3'
                // {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ') + ' Select'}
                    value={props.value}
                    style={{width: 'auto'}}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                // {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    }

    // console.log('props.validation', props.validation);

    return (
        <div 
            className={classes.Input}
            >
            <label 
                className={classes.Label}
            >
                {props.elementConfig.displayName}
                {props.required ? '*' : null}
            </label>
            {inputElement}
        </div>
    );
}



export default withStyles(styles)(input);