import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import ExpertisePage from '../components/ExpertisePage.jsx';

export default function ExpertiseLayout() {
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
      <style>{`body { background: var(--color-two); }`}</style>
      <Header
        activeSection="services"
        scrollVelocity={0}
        scrollProgress={scrollYProgress}
        theme={theme}
        setTheme={setTheme}
      />
      <ExpertisePage />
      <Footer />
    </>
  );
}