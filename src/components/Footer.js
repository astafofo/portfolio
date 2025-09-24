import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  padding: 3rem 0 1rem;
  border-top: 1px solid ${props => props.theme.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterContent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterBrand = styled(motion.div)``;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.primary};
`;

const FooterSubtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
`;

const FooterSocial = styled(motion.div)`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;

  &:hover {
    color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.primary}10;
  }
`;

const FooterBottom = styled(motion.div)`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textSecondary};
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
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

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Email', url: '#' }
  ];

  return (
    <FooterSection>
      <Container>
        <FooterContent
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <FooterBrand variants={itemVariants}>
            <FooterTitle>Harly Ohara</FooterTitle>
            <FooterSubtitle>Game Security Researcher & Reverse Engineer</FooterSubtitle>
          </FooterBrand>

          <FooterSocial variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <SocialLink
                key={link.name}
                href={link.url}
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {link.name}
              </SocialLink>
            ))}
          </FooterSocial>
        </FooterContent>

        <FooterBottom
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &copy; 2025 Harly Ohara. All rights reserved.
          </motion.p>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;
