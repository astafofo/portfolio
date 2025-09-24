import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.surface}ee;
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px ${props => props.theme.shadow};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-decoration: none;
  cursor: pointer;
`;

const NavMenu = styled(motion.ul)`
  display: flex;
  gap: 2rem;
  list-style: none;

  @media (max-width: 768px) {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: ${props => props.theme.surface};
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px ${props => props.theme.shadow};
    padding: 2rem 0;
    gap: 1rem;

    &.active {
      left: 0;
    }
  }
`;

const NavItem = styled(motion.li)``;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }

  &.active {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const MobileMenuToggle = styled(motion.button)`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled(motion.span)`
  width: 25px;
  height: 3px;
  background: ${props => props.theme.textSecondary};
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;

  &:nth-child(1) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'rotate(0)'};
  }

  &:nth-child(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'rotate(0)'};
  }
`;

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

const menuVariants = {
  closed: { opacity: 0, x: -20 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const menuItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

const Header = ({ activeSection, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <HeaderContainer
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={isScrolled ? 'scrolled' : ''}
    >
      <Nav>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('#home')}
        >
          Portfolio
        </Logo>

        <NavMenu
          variants={menuVariants}
          animate={isOpen ? "open" : "closed"}
          className={isOpen ? 'active' : ''}
        >
          {navItems.map((item, index) => (
            <NavItem key={item.name} variants={menuItemVariants}>
              <NavLink
                className={activeSection === item.href.substring(1) ? 'active' : ''}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => scrollToSection(item.href)}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>

        <MobileMenuToggle
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {[1, 2, 3].map((bar) => (
            <Bar
              key={bar}
              isOpen={isOpen}
              animate={isOpen ? "open" : "closed"}
            />
          ))}
        </MobileMenuToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
