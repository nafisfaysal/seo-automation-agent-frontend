import React, { useState, useRef } from 'react';
import {
  Container, Typography, Button, Box, Grid, CssBaseline, TextField, AppBar, Toolbar,
  Card, CardContent, CardMedia, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails,
  IconButton, Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SpeedIcon from '@mui/icons-material/Speed';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BuildIcon from '@mui/icons-material/Build';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Tabs, Tab } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PricingTable from './PricingTable';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from '@mui/material/Link';
import StarIcon from '@mui/icons-material/Star';

const FORMSPARK_ACTION_URL = "https://submit-form.com/y8yM94lqU";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3', // Bright blue
      light: '#42a5f5',
      dark: '#0053b3',
    },
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#ffffff',
      paper: '#f7f8f9',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    body1: {
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // Pill-shaped buttons
          textTransform: 'none', // No uppercase text
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Rounded corners for cards
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});
const GradientBackground = styled('div')({
  background: 'linear-gradient(120deg, #0070f3 0%, #00c6fb 100%)',
  color: 'white',
});

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #0070f3 0%, #00c6fb 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  textAlign: 'center',
  width: '100%',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: 'bold',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '60px',
    height: '4px',
    background: theme.palette.primary.main,
    margin: '15px auto',
  },
}));

const TestimonialCard = ({ name, title, content, avatar }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
    <Box sx={{ mb: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} sx={{ color: '#FFD700', fontSize: 20 }} />
      ))}
    </Box>
    <Typography variant="body1" sx={{ flexGrow: 1, mb: 2 }}>{content}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
      </Box>
      <Avatar src={avatar} alt={name} />
    </Box>
  </Card>
);

function LandingPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const heroSectionRef = useRef(null);

  const handleViewWorkflow = () => {
    navigate('/workflow');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');

    // Track form submission event
    if (window.gtag) {
      window.gtag('event', 'form_submission', {
        'event_category': 'engagement',
        'event_label': 'waitlist_signup'
      });
    }

    try {
      const response = await fetch(FORMSPARK_ACTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitMessage('Thank you for joining our waitlist!');
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        ref={heroSectionRef}
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 2, 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎉 Limited Time Offer: 30% Off Early Bird Subscriptions! 🎉
          </Typography>
          <Typography variant="body1">
            Don't miss out on this exclusive discount. Contact us at{' '}
            <Link href="mailto:support@aiseoflow.com" sx={{ color: 'white', textDecoration: 'underline' }}>
              support@aiseoflow.com
            </Link>
            {' '}to claim your early bird access.
          </Typography>
        </Container>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '40px 40px',
            animation: 'moveStripes 1s linear infinite',
            opacity: 0.2,
            '@keyframes moveStripes': {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '40px 0' },
            },
          }}
        />
      </Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mt: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SEOFlow
          </Typography>
          <Button color="inherit" href="#features">Features</Button>
          <Button color="inherit" href="#how-it-works">How It Works</Button>
          <Button color="inherit" href="#benefits">Benefits</Button>
          <Button color="primary" variant="contained" href="#join">Join Waitlist</Button>
        </Toolbar>
      </AppBar>

      <GradientBackground>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700 }}>
            Stop Wasting Hours on Manual SEO
          </Typography>
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 4, fontWeight: 300, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            While you're stuck doing manual SEO tasks, your competitors are getting ahead. It's time to take the smart route and automate your entire SEO workflow before you fall behind.
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 2,
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                name="name"
                required
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', flex: 1 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your Email"
                type="email"
                name="email"
                required
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', flex: 1 }}
              />
            </Box>
            <Button 
              type="submit"
              variant="contained" 
              size="large" 
              fullWidth
              disabled={isSubmitting}
              sx={{ 
                bgcolor: 'secondary.main',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'secondary.light',
                },
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Join the Waitlist – Limited Spots Available!'}
            </Button>
            {submitMessage && (
              <Typography variant="body2" sx={{ mt: 1, color: 'secondary.main' }}>
                {submitMessage}
              </Typography>
            )}
          </Box>

          {/* New waitlist information section */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            <Box sx={{ display: 'flex', mr: 2 }}>
              {['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar4.jpg'].map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  sx={{
                    width: 32,
                    height: 32,
                    border: '2px solid white',
                    marginLeft: index !== 0 ? -1 : 0,
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 'bold', mr: 1 }}>
                246
              </Typography>
              <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                joined the waitlist
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ color: 'secondary.main', fontSize: 20 }} />
              ))}
            </Box>
          </Box>
        </Container>
      </GradientBackground>

      {/* Demo Video Section */}
      <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GradientText variant="h3" sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              SEOFlow in Action
            </GradientText>
            <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
              Watch how SEOFlow Automator transforms your workflow
            </Typography>
          </Box>
          <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <iframe 
              src="https://www.youtube.com/embed/zEp3JIhHyv0" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="SEO Automation Demo"
            />
          </Box>
        </Container>
      </Box>

      {/* Combined Features and How It Works Section */}
      <Container maxWidth="lg" sx={{ my: 8 }} id="how-it-works">
        <GradientText variant="h2" component="h2" align="center" gutterBottom>
          How SEOFlow Works
        </GradientText>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Automate every part of your SEO process from keyword research to content creation and performance tracking all powered by AI. If you're still handling these tasks manually, you're wasting valuable time and missing out on faster results.
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Here's how SEOFlow makes sure you don't get left behind:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard>
              <CardContent>
                <BuildIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Custom Workflows
                </Typography>
                <Typography variant="body2">
                  Build your SEO strategy with drag-and-drop ease, so you spend less time and get faster results.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard>
              <CardContent>
                <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  AI-Powered Analysis
                </Typography>
                <Typography variant="body2">
                  Gain smart insights tailored to your business niche and competition. Don't let others outsmart you.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard>
              <CardContent>
                <InsightsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Real-Time Reports
                </Typography>
                <Typography variant="body2">
                  Track your rankings and get actionable recommendations in real-time, ensuring your SEO strategy is always ahead of the curve.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard>
              <CardContent>
                <IntegrationInstructionsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Seamless Integration
                </Typography>
                <Typography variant="body2">
                  Connect with your favorite SEO tools effortlessly to create a complete, automated solution that others wish they had.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* SEO Automation in Action Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }} id="workflow-demo">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GradientText variant="h3" sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              SEO Automation in Action
            </GradientText>
            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
              See how our tool streamlines your SEO workflow
            </Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Workflow Overview" />
              <Tab label="Keyword Analysis" />
              <Tab label="Content Strategy" />
            </Tabs>
          </Box>
          <Box sx={{ mt: 4 }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Our SEO Automation Workflow provides a comprehensive, step-by-step process for optimizing your website. From initial niche analysis to content generation, our tool guides you through each crucial stage of SEO optimization.
                </Typography>
                <img src="/images/workflow-overview.jpg" alt="SEO Automation Workflow" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Our advanced Keyword Analysis tool helps you identify the most valuable keywords for your niche. It provides detailed metrics such as search volume, CPC, intent, difficulty, and competition, allowing you to make data-driven decisions for your SEO strategy.
                </Typography>
                <img src="/images/keyword-analysis.jpg" alt="Keyword Analysis" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
              </Box>
            )}
            {tabValue === 2 && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Based on the keyword analysis and competitor insights, our tool generates a comprehensive Content Strategy. This includes suggestions for article topics, content types, and optimization tips to help you create SEO-friendly content that ranks well and engages your audience.
                </Typography>
                <img src="/images/content-strategy.jpg" alt="Content Strategy" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 12 }} id="benefits">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GradientText variant="h3" sx={{ mb: 4, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              Why You Can't Afford to Miss Out on SEOFlow
            </GradientText>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                title: "Save 70% of Your Time", 
                description: "Stop wasting precious hours on repetitive tasks. Automate them and focus on growing your business.",
                icon: <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              },
              { 
                title: "Boost Efficiency by 200%", 
                description: "While others are still manually tweaking, you'll be optimizing strategies with AI-driven insights.",
                icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              },
              { 
                title: "Stay Ahead of Competitors", 
                description: "Don't let your competitors get the advantage. Automate real-time updates and always be one step ahead of the latest trends.",
                icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              },
              { 
                title: "Improve ROI by 150%", 
                description: "Let SEOFlow do the heavy lifting, so your efforts bring in the highest returns.",
                icon: <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              },
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  {benefit.icon}
                  <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <GradientBackground>
        <Container maxWidth="lg" sx={{ py: 8 }} id="join">
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, color: 'white' }}>
            Your Competitors Are Already Automating – Don't Fall Behind
          </Typography>
          <Typography variant="h5" align="center" paragraph sx={{ mb: 4, fontWeight: 300, fontSize: { xs: '1.1rem', md: '1.3rem' }, color: 'white' }}>
            Every day you delay is another day your competitors gain an edge. SEOFlow is your opportunity to level up, automate the hard work, and outperform the competition. Join the waitlist now, because once spots are gone, you'll be left doing it all manually while others thrive.
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Email"
              type="email"
              name="email"
              required
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                flexGrow: 1,
                maxWidth: { xs: '100%', sm: '300px' }
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              size="large" 
              fullWidth
              disabled={isSubmitting}
              sx={{ 
                bgcolor: 'secondary.main',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'secondary.light',
                },
                py: 1.5,
                maxWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              {isSubmitting ? 'Submitting...' : "Join the Waitlist – Don't Miss Out!"}
            </Button>
          </Box>
          {submitMessage && (
            <Typography variant="body2" align="center" sx={{ mt: 2, color: 'secondary.main' }}>
              {submitMessage}
            </Typography>
          )}
        </Container>
      </GradientBackground>

      {/* What Our Users Are Saying Section */}
      <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            What Our Users Are Saying
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <TestimonialCard
                name="Ida"
                title="Social Media Manager"
                content="As a social media manager, I've always spent way too much time repurposing content. I've tried many different tools, but ContentCast is the first one that actually does the job. It's really great at generating engaging posts and saves me a lot of time, allowing me to focus on what I enjoy doing."
                avatar="/path-to-ida-avatar.jpg"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TestimonialCard
                name="Anjali"
                title="X Content Strategy Coach"
                content="ContentCast has completely transformed the way I approach content creation. As someone who is always juggling multiple tasks, it provided the perfect structure to streamline my workflow. The platform is intuitive, and the tools are designed to boost productivity without feeling overwhelming. I especially loved how easy it was to repurpose content across platforms. Thanks to ContentCast, I've saved countless hours while improving the quality and reach of my posts. Highly recommended for anyone serious about leveling up their content game!"
                avatar="/path-to-anjali-avatar.jpg"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TestimonialCard
                name="John"
                title="Founder"
                content="Easy to use and a huge time saver. Great tool for repurposing newsletters into social media posts."
                avatar="/path-to-john-avatar.jpg"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TestimonialCard
                name="Nico"
                title="Founder & Newsletter Owner"
                content="This will be super helpful for my long form content! Looking forward to trying it out 👋."
                avatar="/path-to-nico-avatar.jpg"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TestimonialCard
                name="Yuma Ueno"
                title="Founder & Content Creator"
                content="It's a great tool for content creators! It's helpful to convert my long articles to short content for social media platforms."
                avatar="/path-to-yuma-avatar.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <PricingTable />

      <Box sx={{ py: 8, bgcolor: '#f8f9fa' }} id="faq">
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GradientText variant="h3" sx={{ mb: 4, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              Frequently Asked Questions
            </GradientText>
          </Box>
          {[
            { q: "How does SEOFlow work?", a: "SEOFlow uses AI to analyze your website, competitors, and industry trends. It then provides actionable insights and automates repetitive tasks to improve your SEO performance." },
            { q: "Is SEOFlow suitable for my business size?", a: "Yes! SEOFlow is designed to scale with your business, whether you're a small startup or a large enterprise." },
            { q: "How much time can I save using SEOFlow?", a: "On average, our users report saving 70% of their time on SEO tasks. This allows them to focus on strategy and content creation instead of repetitive analysis." },
            { q: "Do I need technical SEO knowledge to use SEOFlow?", a: "While SEO knowledge is helpful, our tool is designed to be user-friendly for beginners and experts alike. We provide guidance and explanations throughout the process." },
            { q: "How often is SEOFlow updated?", a: "We continuously update SEOFlow to keep up with the latest search engine algorithms and industry best practices. You'll always have access to cutting-edge SEO strategies." },
            { q: "Can I integrate SEOFlow with other tools I use?", a: "Yes, SEOFlow offers seamless integration with popular SEO tools, analytics platforms, and content management systems. We're constantly expanding our integration options." },
            { q: "What kind of support do you offer?", a: "We provide comprehensive documentation, video tutorials, and regular webinars to ensure you get the most out of SEOFlow. For personalized support, please contact our team." },
            { q: "How can I get early bird access to SEOFlow?", a: "We're currently offering early bird access to a limited number of users. To inquire about early bird access, please email us at support@aiseoflow.com." },
          ].map((faq, index) => (
            <Accordion key={index} sx={{ mt: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: 'primary.main', 
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                <Typography variant="h6">{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: '#f8f9fa', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: support@aiseoflow.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton aria-label="LinkedIn" color="primary" href="https://www.linkedin.com/in/nafisfaysal/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" color="primary" href="https://x.com/dotnafis" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <Link href="#features" color="inherit" display="block">Features</Link>
              <Link href="#how-it-works" color="inherit" display="block">How It Works</Link>
              <Link href="#benefits" color="inherit" display="block">Benefits</Link>
              <Link href="#faq" color="inherit" display="block">FAQ</Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Legal
              </Typography>
              <Link href="/privacy" color="inherit" display="block">Privacy Policy</Link>
              <Link href="/terms" color="inherit" display="block">Terms of Service</Link>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} SEOFlow. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;