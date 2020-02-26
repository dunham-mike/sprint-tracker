import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { theme } from '../../theme/theme';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    childrenContainer: {
        position: 'relative',
        marginTop: theme.spacing(9),
    }
};

class Layout extends Component {
    state = {
        showDrawer: false,
    }

    toggleDrawer = () => {
        this.setState(prevState => {
            console.log('Toggling');
            console.log('Current showDrawer: ' + this.state.showDrawer);
            return { ...this.state, showDrawer: !prevState.showDrawer };
        });
      };
    
    render() {
        const { classes } = this.props;

        const sideList = side => (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer}
                // onKeyDown={toggleDrawer(side, false)}
            >
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </div>
        );

        return(
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Sprint Tracker
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.showDrawer} onClose={this.toggleDrawer}>
                    {sideList('left')}
                </Drawer>
                <div className={classes.childrenContainer}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(Layout);