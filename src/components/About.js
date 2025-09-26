import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import { useEffect } from 'react';

const AboutSection = styled.section`
  background: ${props => props.theme.surface};
  color: ${props => props.theme.text};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const SectionDivider = styled(motion.div)`
  width: 60px;
  height: 4px;
  background: ${props => props.theme.gradient};
  margin: 0 auto;
  border-radius: 2px;
`;

const AboutContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const AboutImage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 1rem;
    box-shadow: 0 10px 30px ${props => props.theme.shadow};
  }
`;

const AboutText = styled(motion.div)``;

const AboutTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const AboutDescription = styled(motion.p)`
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1.1rem;
`;

const AboutStats = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.theme.background};
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled(motion.span)`
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const StatLabel = styled(motion.span)`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
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

const AnimatedNumber = ({ value }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    config: { tension: 120, friction: 14 }
  });

  return (
    <animated.span ref={ref}>
      {number.to(n => Math.floor(n))}
    </animated.span>
  );
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const stats = [
    { number: 50, label: 'Projects Completed' },
    { number: 2, label: 'Years Experience' },
    { number: 100, label: 'Happy Clients' }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionHeader
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <SectionTitle variants={itemVariants}>
            About Me
          </SectionTitle>
          <SectionDivider variants={itemVariants} />
        </SectionHeader>

        <AboutContent
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <AboutImage variants={itemVariants}>
            <motion.img
              src="https://cdn.discordapp.com/attachments/1409979614599708846/1420388050567041107/292b1c7f0.png?ex=68d73134&is=68d5dfb4&hm=a66456f57d95cc15e61ec882e9c1a9ba6d8e69fc8e20d08381a3f79094e6bd98&"
              alt="About Harly Ohara"
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </AboutImage>

          <AboutText variants={itemVariants}>
            <AboutTitle>
              Hi, I'm Harly Ohara
            </AboutTitle>

            <AboutDescription>
              I'm a game security researcher and reverse engineer with extensive experience in analyzing game systems,
              developing custom tools, and creating solutions for complex gaming challenges.
            </AboutDescription>

            <AboutDescription>
              My expertise includes low-level programming, memory analysis, packet manipulation, and developing
              sophisticated tools for game environment interaction and security research.
            </AboutDescription>

            <AboutStats variants={itemVariants}>
              {stats.map((stat, index) => (
                <Stat
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <StatNumber>
                    <AnimatedNumber value={stat.number} />+
                  </StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </Stat>
              ))}
            </AboutStats>
          </AboutText>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
