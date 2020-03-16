import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DvrIcon from '@material-ui/icons/Dvr';
import HistoryIcon from '@material-ui/icons/History';

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
                    {
                        this.props.isAuth
                        ?
                            <React.Fragment>
                                <ListItem button component={RouterLink} to={this.props.isDemo ? "/demo" : "/"}>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                <ListItem button component={RouterLink} to="/past-sprints">
                                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                                    <ListItemText primary="Past Sprints"/>
                                </ListItem>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <ListItem button component={RouterLink} to="/">
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                <ListItem button component={RouterLink} to="/demo">
                                    <ListItemIcon><DvrIcon /></ListItemIcon>
                                    <ListItemText primary="Try Demo"/>
                                </ListItem>
                            </React.Fragment>
                    }
                </List>
                <Divider />
                <List>
                    {
                        this.props.isAuth
                        ?
                            <ListItem button component={RouterLink} to="/logout">
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary={this.props.isDemo ? "End Demo" : "Log out"}/>
                            </ListItem>
                        :
                            <React.Fragment>
                                <ListItem button component={RouterLink} to="/create-account">
                                    <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                    <ListItemText primary="Create account"/>
                                </ListItem>
                                <ListItem button component={RouterLink} to="/login">
                                    <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                                    <ListItemText primary="Log in"/>
                                </ListItem>
                            </React.Fragment>
                    }
                    
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
                        <Link component={RouterLink} to={this.props.isDemo ? "/demo" : "/"} color="inherit" variant="h6" underline="none">
                            Deliberate Sprints
                        </Link>
                    </Typography>
                    {this.props.isAuth 
                        ? <Button color="inherit" component={RouterLink} to="/logout">{this.props.isDemo ? "End Demo" : "Log out"}</Button> 
                        : <Button color="inherit" component={RouterLink} to="/login">Log in</Button>
                    }
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

const mapStateToProps = state => {
    return {
      isAuth: state.authentication.token !== null,
      isDemo: state.authentication.token === "demo",
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Layout));