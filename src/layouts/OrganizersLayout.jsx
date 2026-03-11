import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import OrganizersPage from "../components/OrganizersPage.jsx";

const OrganizersLayout = ({ activeSection = '' }) => {
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
            <OrganizersPage />
            <Footer />
        </>
    );
};

export default OrganizersLayout;