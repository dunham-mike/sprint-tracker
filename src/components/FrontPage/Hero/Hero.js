import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    buttonContainer: {
        justifyContent: "center",
        '@media (max-width: 500px)': {
            flexDirection: 'column',
        },
    },
    buttonGridItem: {
        '@media (max-width: 500px)': {
            margin: '0 auto',
            width: '100%',
        },
    },
    button: {
        '@media (max-width: 500px)': {
            width: '100%',
        },
    }
});
  
const hero = (props) => {
    const { classes } = props;

    return(
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Deliberate Sprints
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Sprint tracking. With a point of view.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} className={classes.buttonContainer}>
                        <Grid item className={classes.buttonGridItem}>
                            <Button variant="contained" color="primary" className={classes.button} component={RouterLink} to="/demo">
                                TRY A DEMO
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonGridItem}>
                            <Button variant="outlined" color="primary" className={classes.button} component={RouterLink} to="/create-account">
                                CREATE AN ACCOUNT
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonGridItem}>
                            <Button variant="outlined" color="primary" className={classes.button} component={RouterLink} to="/login">
                                LOG IN
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default withStyles(styles)(hero);