import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Footer from '../Footer/Footer';
import Hero from './Hero/Hero';
import CardSection from './CardSection/CardSection';


const styles = theme => ({
    overallContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 72px)',
    },
    nonFooterContainer: {
        flex: '1'
    }
});

const frontPage = (props) => {
    const { classes } = props;

    return(
        <div className={classes.overallContainer}>
            <main className={classes.nonFooterContainer}>
                <Hero />
                <CardSection />
            </main>
            <Footer />
        </div>
    );
};

export default withStyles(styles)(frontPage);