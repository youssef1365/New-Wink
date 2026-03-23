import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import PackagesLayout from '../components/PackagesLayout.jsx';
import CallToAction from '../components/CallToAction.jsx';

const PackagesPage = ({ activeSection = '' }) => {
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
      <PackagesLayout />
      <CallToAction
        image="/9.png"
        headline="Explore the Right Program for Your Growth Stage"
        subheadline="From market testing to multi-country expansion, Wink structures your international journey."
        ctaLabel=" Explore Programs"
        href="/Packages"
        onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('prg-packages');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}

      />
      <Footer />
    </>
  );
};

export default PackagesPage;