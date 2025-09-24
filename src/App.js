import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import ScrollIndicator from './components/ScrollIndicator';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.background};
    transition: all 0.3s ease;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  /* Ensure proper scrolling */
  html {
    scroll-behavior: smooth;
    height: 100%;
    overflow-x: hidden;
  }

  /* Fix for mobile viewport */
  @media (max-width: 768px) {
    html, body {
      overflow-x: hidden;
      position: relative;
    }
  }

  /* Ensure sections don't cause layout issues */
  section {
    width: 100%;
    position: relative;
  }
`;

const lightTheme = {
  background: '#f8fafc',
  surface: '#ffffff',
  primary: '#6366f1',
  secondary: '#8b5cf6',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const darkTheme = {
  background: '#0f172a',
  surface: '#1e293b',
  primary: '#818cf8',
  secondary: '#a78bfa',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c2d12 100%)'
};

const AppContainer = styled.div`
  position: relative;
`;

const Section = styled(motion.section)`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <ScrollIndicator />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header activeSection={activeSection} darkMode={darkMode} />

          <Section
            id="home"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            style={{ minHeight: '100vh' }}
          >
            <Hero />
          </Section>

          <Section
            id="about"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <About />
          </Section>

          <Section
            id="projects"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Projects />
          </Section>

          <Section
            id="blog"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Blog />
          </Section>

          <Section
            id="contact"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Contact />
          </Section>

          <Footer />
        </motion.div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
