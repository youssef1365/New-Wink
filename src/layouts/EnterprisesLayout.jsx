import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import EnterprisesPage from '../components/EnterprisesPage.jsx';
import CallToAction from '../components/CallToAction.jsx';

const EnterprisesLayout = ({ activeSection = '' }) => {
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
                scrollProgress={scrollYProgress}
                theme={theme}
                setTheme={setTheme}
            />
            <EnterprisesPage />
            <CallToAction
                    image="/3.png"
                    headline="Accelerate Your International Business Development"
                    subheadline="Access qualified buyers, structured meetings, and measurable growth opportunities."
                    ctaLabel="Apply for a Program"
                  />
            <Footer />
        </>
    );
};

export default EnterprisesLayout;