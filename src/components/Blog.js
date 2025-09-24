import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const BlogSection = styled.section`
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

const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.article)`
  background: ${props => props.theme.background};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${props => props.theme.shadow};
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BlogDate = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const BlogTags = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BlogTag = styled.span`
  background: ${props => props.theme.primary}20;
  color: ${props => props.theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled(motion.button)`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary}dd;
    transform: translateY(-2px);
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
    y: 50
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

const blogPosts = [
  {
    id: 1,
    title: "Reverse Engineering Modern Anti-Cheat Systems",
    date: "2024-01-15",
    excerpt: "Deep dive into analyzing and understanding contemporary anti-cheat architectures and their evasion techniques.",
    tags: ["Reverse Engineering", "Anti-Cheat", "Game Security"],
    content: "Full blog post content would go here..."
  },
  {
    id: 2,
    title: "Memory Analysis Techniques for Game Hacking",
    date: "2024-01-10",
    excerpt: "Advanced methods for analyzing and manipulating game memory structures in real-time applications.",
    tags: ["Memory Analysis", "Game Hacking", "Debugging"],
    content: "Full blog post content would go here..."
  },
  {
    id: 3,
    title: "Network Protocol Analysis in Online Games",
    date: "2024-01-05",
    excerpt: "Comprehensive guide to intercepting, analyzing, and manipulating network traffic in multiplayer games.",
    tags: ["Network Analysis", "Protocol", "Multiplayer"],
    content: "Full blog post content would go here..."
  }
];

const Blog = () => {
  const handleReadMore = (post) => {
    // In a real application, this would navigate to the full post
    alert(`Opening blog post: ${post.title}`);
  };

  return (
    <BlogSection id="blog">
      <Container>
        <SectionHeader
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <SectionTitle variants={itemVariants}>
            Latest Blog Posts
          </SectionTitle>
          <SectionDivider variants={itemVariants} />
        </SectionHeader>

        <BlogGrid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <BlogContent>
                <BlogMeta>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogTags>
                    {post.tags.map((tag, tagIndex) => (
                      <BlogTag key={tagIndex}>{tag}</BlogTag>
                    ))}
                  </BlogTags>
                </BlogMeta>

                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>

                <ReadMoreButton
                  onClick={() => handleReadMore(post)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                </ReadMoreButton>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </BlogSection>
  );
};

export default Blog;
