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
import ConnectIcon from '@mui/icons-material/ConnectWithoutContact';
import TrackIcon from '@mui/icons-material/TrackChanges';
import AutomateIcon from '@mui/icons-material/Build';
import ReportIcon from '@mui/icons-material/Assessment';


const FORMSPARK_ACTION_URL = "https://submit-form.com/8f4lgXUWj";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A86FF',
      light: '#8AB4FF',
      dark: '#2E5CC5',
    },
    secondary: {
      main: '#FF006E',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
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
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, #3A86FF 0%, #FF006E 100%)',
  color: 'white',
});

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #3A86FF 0%, #FF006E 100%)',
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
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
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
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmitMessage('Thank you for joining our waitlist!');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('An error occurred. Please try again later or contact support.');
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
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 800, mb: 4 }}>
            Stop Wasting Hours on Manual SEO
          </Typography>
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 6, fontWeight: 400, fontSize: { xs: '1.25rem', md: '1.5rem' }, maxWidth: '800px', mx: 'auto' }}>
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
                color: 'white',
                '&:hover': {
                  bgcolor: 'secondary.dark',
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
              <Typography variant="body2" sx={{ color: 'secondary.white', fontWeight: 'bold', mr: 1 }}>
                565
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                joined the waitlist
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ color: 'gold', fontSize: 20 }} />
              ))}
            </Box>
          </Box>
        </Container>
      </GradientBackground>

      <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
              SEOFlow Live Demo
            </Typography>
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

      <Container maxWidth="lg" sx={{ my: 8 }} id="how-it-works">
        <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          How SEOFlow Works
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          Automate every part of your SEO process from keyword research to content creation and performance tracking all powered by AI. If you're still handling these tasks manually, you're wasting valuable time and missing out on faster results.
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
          Here's how SEOFlow makes sure you don't get left behind:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={0}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BuildIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Custom Workflows
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Build your SEO strategy with drag-and-drop ease, so you spend less time and get faster results.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={0}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AnalyticsIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    AI-Powered Analysis
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Gain smart insights tailored to your business niche and competition. Don't let others outsmart you.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={0}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InsightsIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Real-Time Reports
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Track your rankings and get actionable recommendations in real-time, ensuring your SEO strategy is always ahead of the curve.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={0}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IntegrationInstructionsIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Seamless Integration
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Connect with your favorite SEO tools effortlessly to create a complete, automated solution that others wish they had.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 12 }} id="workflow-demo">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Simplify SEO automation and reporting
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
              SEOFlow is designed from the ground up to seamlessly capture actionable SEO insights and automate your workflow.
            </Typography>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Grid container spacing={4} alignItems="stretch">
              {[
                {
                  icon: <ConnectIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                  title: "Connect",
                  description: "Connect your website and tools to automatically capture SEO data and activities."
                },
                {
                  icon: <TrackIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                  title: "Track",
                  description: "Use custom tags to categorize your SEO activities and track progress effortlessly."
                },
                {
                  icon: <AutomateIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                  title: "Automate",
                  description: "Completely automate SEO tasks and reporting with our workflow builder and AI."
                },
                {
                  icon: <ReportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                  title: "Report",
                  description: "Measure your SEO progress with dynamic dashboards or export data for custom analysis."
                }
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ bgcolor: 'background.default', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': { 
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                }
              }}
            >
              <Tab label="WORKFLOW OVERVIEW" />
              <Tab label="KEYWORD ANALYSIS" />
              <Tab label="CONTENT STRATEGY" />
              <Tab label="AI-GENERATED CONTENT" />
              <Tab label="CUSTOM DATA IMPORT" />
            </Tabs>
            <Box sx={{ p: 3 }}>
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
              {tabValue === 3 && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Our advanced AI generates high-quality content based on your inputs. You can easily edit and refine the results to perfectly match your needs, saving time while ensuring SEO-optimized and engaging content.
                  </Typography>
                  <img src="/images/ai-generated-content.png" alt="AI-Generated Content" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                </Box>
              )}
              {tabValue === 4 && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Seamlessly import your existing SEO data and custom metrics. Our tool integrates with various data sources, allowing you to leverage your historical data and unique insights for more accurate and personalized SEO strategies.
                  </Typography>
                  <img src="/images/import-custom-data.png" alt="Custom Data Import" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'background.default', py: 12 }} id="benefits">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
              Why You Can't Afford to Miss Out on SEOFlow
            </Typography>
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
                  <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
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

      <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="testimonials">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            Wall of Love
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                text: "SEOFlow's AI-powered keyword research saved me hours of manual work. I discovered high-potential keywords I would have missed otherwise. My organic traffic increased by 40% in just one week!",
                name: "Sarah",
                title: "Digital Marketing Manager"
              },
              {
                text: "The automated content optimization feature is a game-changer. It suggests improvements in real-time, ensuring my content is always SEO-friendly. I've seen a significant boost in my search rankings.",
                name: "Michael",
                title: "Content Creator"
              },
              {
                text: "SEOFlow's competitor analysis tool is incredibly insightful. It automatically tracks my competitors' strategies and suggests ways to outperform them. It's like having an SEO expert on call 24/7.",
                name: "Emily",
                title: "E-commerce Business Owner"
              },
              {
                text: "The automated reporting feature saves me hours each week. Instead of manually compiling data, I now have real-time, actionable insights at my fingertips. Client meetings have never been easier!",
                name: "David",
                title: "SEO Consultant"
              },
              {
                text: "SEOFlow's integration with my existing tools streamlined my entire workflow. What used to take days now takes hours. The time saved allows me to focus on strategy and client relationships.",
                name: "Lisa",
                title: "Agency Owner"
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: 'gold' }} />
                      ))}
                    </Box>
                    <Typography variant="body2" paragraph>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle1">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{testimonial.title}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
                color: 'white',
                '&:hover': {
                  bgcolor: 'secondary.dark',
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

      <PricingTable />

      <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="faq">
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          <Box sx={{ 
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}>
            {[
              { q: "How does SEOFlow work?", a: "SEOFlow uses AI to analyze your website, competitors, and industry trends. It then provides actionable insights and automates repetitive tasks to improve your SEO performance." },
              { q: "Is SEOFlow suitable for my business size?", a: "Yes! SEOFlow is designed to scale with your business, whether you're a small startup or a large enterprise." },
              { q: "How much time can I save using SEOFlow?", a: "On average, our users report saving 70% of their time on SEO tasks. This allows them to focus on strategy and content creation instead of repetitive analysis." },
              { q: "Do I need technical SEO knowledge to use SEOFlow?", a: "While SEO knowledge is helpful, our tool is designed to be user-friendly for beginners and experts alike. We provide guidance and explanations throughout the process." },
              { q: "How often is SEOFlow updated?", a: "We continuously update SEOFlow to keep up with the latest search engine algorithms and industry best practices. You'll always have access to cutting-edge SEO strategies." },
              { q: "Can I integrate SEOFlow with other tools I use?", a: "Yes, SEOFlow offers seamless integration with popular SEO tools, analytics platforms, and content management systems. We're constantly expanding our integration options." },
              { q: "What kind of support do you offer?", a: "We provide comprehensive documentation, video tutorials, and regular webinars to ensure you get the most out of SEOFlow. For personalized support, please contact our team." },
              { q: "How can I get early bird access to SEOFlow?", a: "We're currently offering early bird access to a limited number of users. To inquire about early bird access, please email us at support@aiseoflow.com." },
            ].map((faq, index, array) => (
              <Accordion 
                key={index} 
                sx={{ 
                  '&:before': { display: 'none' },
                  borderBottom: index < array.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    '&.Mui-expanded': {
                      minHeight: '48px',
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                      },
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
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