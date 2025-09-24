import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  background: ${props => props.theme.background};
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

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.shadow};
  }
`;

const ProjectImage = styled.div`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProjectCard}:hover &::after {
    opacity: 0.1;
  }

  ${ProjectCard}:hover img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 0.25rem;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
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
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

const cardVariants = {
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
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const projects = [
  {
    id: 1,
    title: "Advanced Memory Analysis Tool",
    description: "A sophisticated memory scanning and manipulation toolkit for real-time game analysis, featuring advanced pattern recognition and memory patching capabilities.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop&auto=format&q=80",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Network Packet Interceptor",
    description: "Custom network analysis tool for intercepting and analyzing game traffic, with real-time packet manipulation and protocol reverse engineering.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop&auto=format&q=80",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Anti-Cheat Bypass Framework",
    description: "Comprehensive framework for analyzing and bypassing anti-cheat systems, featuring kernel-level hooks and advanced stealth techniques.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop&auto=format&q=80",
    demoUrl: "#",
    githubUrl: "#"
  }
];

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionHeader
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <SectionTitle variants={itemVariants}>
            My Projects
          </SectionTitle>
          <SectionDivider variants={itemVariants} />
        </SectionHeader>

        <ProjectsGrid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProjectImage>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />
              </ProjectImage>

              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectLinks>
                  <ProjectLink
                    href={project.demoUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </ProjectLink>
                  <ProjectLink
                    href={project.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
