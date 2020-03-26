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

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center'
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
        '@media (max-width: 599px)': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    button: {
        '@media (max-width: 599px)': {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

const cards = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1568584263125-bf8f0a77d51c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        heading: 'Simple, structured sprints.',
        content: 'Purposely designed for lightweight data collection, so individuals can be flexible in how they manage their work.',
    }, 
    {
        imageUrl: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heading: 'Weekly progress tracking.',
        content: 'Updating and seeing a sprint\'s progress is a breeze.',
    }, 
    {
        imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heading: 'Authentication built-in.',
        content: 'Make sure your work stays private.',
    }, 
];
  
const cardSection = (props) => {
    const { classes } = props;

    return(
        <React.Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4} className={classes.cardContainer}>
                    {cards.map((card, index) => (
                        <Grid item key={card.heading} xs={11} sm={index === 0 ? 8 : 6} md={4}>
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
                    <Button variant="outlined" color="secondary" 
                        className={classes.button}
                        component={RouterLink} to="/create-account"
                    >
                        Create your free account
                    </Button>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(cardSection);