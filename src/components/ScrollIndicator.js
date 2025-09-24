import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const ScrollIndicatorContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ScrollDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.primary : props.theme.border};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.border};

  &:hover {
    background: ${props => props.theme.primary}80;
    transform: scale(1.2);
    box-shadow: 0 0 10px ${props => props.theme.primary}40;
  }
`;

const scrollIndicatorVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const sections = ['home', 'about', 'projects', 'blog', 'contact'];

  const activeSection = useTransform(scrollYProgress, [0, 1], [0, sections.length - 1]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <ScrollIndicatorContainer
      variants={scrollIndicatorVariants}
      initial="hidden"
      animate="visible"
    >
      {sections.map((section, index) => (
        <ScrollDot
          key={section}
          active={Math.round(activeSection.get()) === index}
          onClick={() => scrollToSection(section)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      ))}
    </ScrollIndicatorContainer>
  );
};

export default ScrollIndicator;
