import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import GovernmentPage from "../components/GovernmentPage.jsx";
import CallToAction from '../components/CallToAction.jsx';

const GovernmentLayout = ({ activeSection = '' }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    const { scrollYProgress } = useScroll();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <Header
                activeSection={activeSection}
                scrollVelocity={0}
                scrollProgress={{ on: () => () => {} }}
                theme={theme}
                setTheme={setTheme}
            />
            <GovernmentPage />
            <CallToAction
                    image="/11.png"
                    headline="Deliver High-Impact International Economic Programs"
                    subheadline="Partner with Wink to structure trade missions, delegations, and investment initiatives."
                    ctaLabel="Request a Proposal"
                  />
            <Footer />
        </>
    );
};

export default GovernmentLayout;