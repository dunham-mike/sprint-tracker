import React from 'react';

import Footer from '../Footer/Footer';
import Hero from './Hero/Hero';
import CardSection from './CardSection/CardSection';

const frontPage = () => {
    return(
        <React.Fragment>
            <main>
                <Hero />
                <CardSection />
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default frontPage;