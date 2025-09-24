import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.gradient};
  color: white;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 600px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &.primary {
    background: ${props => props.theme.primary};
    color: white;
  }

  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    width: 200px;
    text-align: center;
  }
`;

const HeroImage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 50%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    order: -1;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
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
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

const Hero = () => {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 14 }
  }));

  return (
    <HeroSection id="home">
      <FloatingElements>
        {[...Array(5)].map((_, i) => (
          <FloatingElement
            key={i}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              width: `${30 + i * 10}px`,
              height: `${30 + i * 10}px`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </FloatingElements>

      <HeroContainer>
        <HeroContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={itemVariants}>
            Harly Ohara
          </HeroTitle>

          <HeroSubtitle variants={itemVariants}>
            Game Security Researcher & Reverse Engineer
          </HeroSubtitle>

          <HeroDescription variants={itemVariants}>
            Specializing in game security analysis, reverse engineering, and developing custom solutions for complex gaming environments.
          </HeroDescription>

          <HeroButtons variants={itemVariants}>
            <HeroButton
              href="#projects"
              className="primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </HeroButton>
            <HeroButton
              href="#contact"
              className="secondary"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </HeroButton>
          </HeroButtons>
        </HeroContent>

        <HeroImage
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.6, 0.01, 0.05, 0.95]
          }}
        >
          <motion.img
            src="https://media.discordapp.net/attachments/1409979614599708846/1420388050567041107/292b1c7f0.png?ex=68d536f4&is=68d3e574&hm=2ea7de6ef140380ae46247e633679388eeceba778bbe96efae58da0a980d69c6&=&format=webp&quality=lossless&width=938&height=938"
            alt="Harly Ohara - Game Security Researcher"
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </HeroImage>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
