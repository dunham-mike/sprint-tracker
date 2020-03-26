import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    copyright: {
      marginTop: theme.spacing(1.3)
    },
    flexDisplay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
const footer = (props) => {
    const { classes } = props;

    return(
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
            Built with React and Material UI.
            </Typography>

            <Typography variant="subtitle1" align="center" color="textSecondary" component="p"
                className={classes.flexDisplay}
            >
                <span>Made with&nbsp;</span>
                <FavoriteIcon fontSize="small" color={"secondary"}/>
                <span>&nbsp;in Burlingame, CA.</span>
            </Typography>

            <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
                {'© '}
                <Link color="inherit" href="https://www.mikedunham.org" target="_blank" rel="noopener noreferrer">
                Mike Dunham
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </footer>
    );
}

export default withStyles(styles)(footer);