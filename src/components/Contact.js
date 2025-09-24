import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactSection = styled.section`
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

const ContactContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)``;

const ContactTitle = styled(motion.h3)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const ContactDescription = styled(motion.p)`
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.7;
`;

const ContactDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.2rem;
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.surface};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
`;

const Textarea = styled(motion.textarea)`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.primary}dd;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px ${props => props.theme.primary}30;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare Discord webhook payload
    const discordPayload = {
      username: "Portfolio Contact Bot",
      avatar_url: "https://media.discordapp.net/attachments/1384935582819418245/1420379458547875882/Screenshot_2025-09-21_180522.png?ex=68d52ef4&is=68d3dd74&hm=f0ec2963f4e2744fd5b542745d64647d1930e5ca60c47e256d8a677151d0769b&=&format=webp&quality=lossless&width=746&height=913",
      embeds: [{
        title: "New Contact Form Submission",
        color: 3447003,
        fields: [
          {
            name: "👤 Name",
            value: formData.name,
            inline: true
          },
          {
            name: "📧 Email",
            value: formData.email,
            inline: true
          },
          {
            name: "💬 Message",
            value: formData.message,
            inline: false
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const response = await fetch('https://discord.com/api/webhooks/1420378625202458767/FhZ0TMOdpFpoi9lqV5dmq_1X50nppav_uYXt7rpDc_RVRGuclBRyWvVK9p3ChsZe9ZV6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordPayload)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again or contact directly.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionHeader
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <SectionTitle variants={itemVariants}>
            Get In Touch
          </SectionTitle>
          <SectionDivider variants={itemVariants} />
        </SectionHeader>

        <ContactContent
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <ContactInfo variants={itemVariants}>
            <ContactTitle>
              Let's collaborate on security research
            </ContactTitle>

            <ContactDescription>
              I'm always interested in discussing game security, reverse engineering challenges, and innovative solutions.
              Whether you have a complex problem or want to explore new possibilities, feel free to reach out!
            </ContactDescription>

            <ContactDetails variants={itemVariants}>
              <ContactItem
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ContactIcon>📧</ContactIcon>
                <span>notrealharly@example.com</span>
              </ContactItem>
              <ContactItem
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ContactIcon>📱</ContactIcon>
                <span>+1 (555) 123-4567</span>
              </ContactItem>
              <ContactItem
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ContactIcon>📍</ContactIcon>
                <span>San Francisco, CA</span>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>

          <ContactForm
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
