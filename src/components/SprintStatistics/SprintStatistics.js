import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

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
    // FormContainer: {
    //     margin: theme.spacing(1),
    //     textAlign: 'center'
    // },
    // FormTitle: {
    //     marginTop: theme.spacing(1),
    //     color: red[300],
    //     fontWeight: 'bold',
    //     fontSize: '1.5rem'
    // },
    // Form: {
    //     textAlign: 'left'
    // },
    // ButtonContainer: {
    //     margin: '0 auto',
    //     display: 'flex',
    //     justifyContent: 'center',
    // },
    // Button: {
    //     marginLeft: theme.spacing(2)
    // }
    
});

const sprintStatistics = (props) => {
    const { classes } = props;

    return(
        <React.Fragment>
            <Backdrop />
            <Modal>
                <div className={classes.CancelButtonContainer} onClick={props.onCloseSprintStatistics}><CancelOutlinedIcon fontSize="large"/></div>
                <div>
                    Sprint Statistics for SprintId: {props.sprintId}
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default withStyles(styles)(sprintStatistics);