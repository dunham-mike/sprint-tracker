import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

const styles = theme => ({
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
});

class editSprint extends Component {

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <Backdrop />
                <Modal>
                    THIS IS THE EDITSPRINT COMPONENT - SprintId: {this.props.sprintId}
                </Modal>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(editSprint);