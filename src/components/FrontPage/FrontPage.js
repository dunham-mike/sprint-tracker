import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/dunham-mike" target="_blank" rel="noopener noreferrer">
        Mike Dunham
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  tryDemo: {
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(6),
      textAlign: 'center',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const cards = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1568584263125-bf8f0a77d51c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        heading: 'Simple, structured sprints.',
        content: 'Purposely designed for lightweight data collection, so individuals can be flexible in how they hit their goals.',
    }, 
    {
        imageUrl: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heading: 'Weekly progress tracking.',
        content: 'Updating and seeing a team\'s progress is a breeze.',
    }, 
    {
        imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heading: 'Authentication built-in.',
        content: 'Make sure your team\'s work stays private.',
    }, 
];

const frontPage = (props) => {
    const { classes } = props;

    return(
        <React.Fragment>
            <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Deliberate Sprints
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Sprint tracking. With a point of view.
                </Typography>
                <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                    <Button variant="contained" color="primary" component={RouterLink} to="/demo">
                        Try a demo
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button variant="outlined" color="primary" component={RouterLink} to="/create-account">
                        Create an account
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button variant="outlined" color="primary" component={RouterLink} to="/login">
                        Log in
                    </Button>
                    </Grid>
                </Grid>
                </div>
            </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.imageUrl}
                        title={card.heading}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.heading}
                        </Typography>
                        <Typography>
                        {card.content}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
            <div className={classes.tryDemo}>
            <Container maxWidth="sm">
                <Button variant="outlined" color="secondary" component={RouterLink} to="/create-account">
                    Create your free account
                </Button>
            </Container>
            </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
            Built with React and Material UI.
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Made with <FavoriteIcon fontSize="small" color={"secondary"} /> in Burlingame, CA.
            </Typography>
            <Copyright />
        </footer>
      </React.Fragment>
    );
};

export default withStyles(styles)(frontPage);