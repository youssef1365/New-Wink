import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import OrganizersPage from "../components/OrganizersPage.jsx";
import CallToAction from '../components/CallToAction.jsx';

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
            <CallToAction
                image="/10.png"
                headline="Transform Your Event into a Performance-Driven Platform"
                subheadline="Increase exhibitor ROI with structured and measurable B2B engagement systems."
                ctaLabel="Partner with Wink"
                href="/Register"
            />

            <Footer />
        </>
    );
};

export default OrganizersLayout;