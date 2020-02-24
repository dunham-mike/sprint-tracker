import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import teal from  '@material-ui/core/colors/teal';

class MainView extends Component {
    render() {
        return(
            <div>
                <Button variant="contained" color="primary">CURRENT SPRINT</Button><br />
                <Button variant="contained" color="secondary">NEXT SPRINT</Button><br />
                <Button variant="contained" color="default">QUEUE</Button><br />
            </div>
        );
    }
}

export default MainView;