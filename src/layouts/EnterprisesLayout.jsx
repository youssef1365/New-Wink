import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import EnterprisesPage from '../components/EnterprisesPage.jsx';

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
            <Footer />
        </>
    );
};

export default EnterprisesLayout;