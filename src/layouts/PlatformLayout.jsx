import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import PlatformPage from '../components/PlatformPage.jsx';
import CallToAction from '../components/CallToAction.jsx';


const PlatformLayout = ({ activeSection = '' }) => {
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
      <PlatformPage />
      <CallToAction
        image="/12.png"
        headline="Power Your B2B Programs with Structured Intelligence"
        subheadline="Leverage smart matching, structured data, and real-time performance tracking to transform how you manage international business interactions."
        ctaLabel="  Request a Demo"
      />
      <Footer />
    </>
  );
};

export default PlatformLayout;