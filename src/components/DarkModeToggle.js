import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ToggleContainer = styled(motion.button)`
  position: fixed;
  top: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.surface};
  border: 2px solid ${props => props.theme.border};
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px ${props => props.theme.shadow};
  }

  @media (max-width: 768px) {
    top: 80px;
    right: 15px;
    width: 50px;
    height: 50px;
  }
`;

const ToggleIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: ${props => props.theme.primary};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const toggleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <ToggleContainer
      onClick={toggleDarkMode}
      variants={toggleVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.1,
        rotate: 180,
        transition: { duration: 0.3 }
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <ToggleIcon
        key={darkMode ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? '🌙' : '☀️'}
      </ToggleIcon>
    </ToggleContainer>
  );
};

export default DarkModeToggle;
