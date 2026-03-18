import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/footer.jsx';
import AboutUsSection from '../components/aboutuspage.jsx';
import CallToAction from '../components/CallToAction.jsx';


const AboutLayout = ({ activeSection = '' }) => {
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
      <AboutUsSection />
      <CallToAction
              image="/7.png"
              headline="Let’s Architect </br>Your  Next Growth Initiative"
              subheadline="Join a global network of decision-makers shaping the future of international business."
              ctaLabel="Start the Conversation"
              href="/Register"
            />
      <Footer />
    </>
  );
};

export default AboutLayout;