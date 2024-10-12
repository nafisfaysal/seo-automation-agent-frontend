import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Switch, 
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  Link
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';

const workflowNodes = [
  'Enter Niche/Business Type',
  'Analyze SEO Request',
  'SEMRush Keyword Research',
  'Ahrefs Keyword Research',
  'Identify Long-Tail Keywords',
  'Identify Short-Tail Keywords',
  'Group Similar Keywords',
  'Identify Main Keywords',
  'Competitor Content Analysis',
  'Competitor Keyword Analysis',
  'Generate Content Strategy',
  'Generate Article Ideas',
  'Export to Excel',
  'Excel Content Manager',
  'Auto Publish Scheduler',
  'Daily SEO Health Check',
  'SEO Insights Analyzer',
  'Manual Optimization Assistant',
  'Internal Linking Generator',
  '404 Error Monitor',
  'Post Edit Cooldown Scheduler',
  'Trend Optimization Notifier',
  'Outbound Link Manager',
  'Page Speed Monitor',
  'Search Console Error Handler',
  'Image Optimization Helper',
  'Duplicate Content Finder',
  'Heading & Meta Length Validator',
  'High Traffic Keyword Checker',
  'New Keyword Integrator',
  'Generate AI Content'
];

const WorkflowNodesDisplay = ({ nodes, availableNodes }) => (
  <Box sx={{ mt: 2, maxHeight: 400, overflowY: 'auto' }}>
    <Grid container spacing={1}>
      {workflowNodes.map((node) => (
        <Grid item xs={12} key={node}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              borderRadius: 1,
              bgcolor: availableNodes.includes(node) ? 'success.light' : 'error.light',
              color: 'white',
            }}
          >
            {availableNodes.includes(node) ? (
              <CheckIcon fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <CloseIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {node}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const plans = [
  {
    name: 'BASIC',
    description: 'For small business owners and freelancers',
    monthlyPrice: 99,
    yearlyPrice: 1069,
    features: [
      { 
        name: 'Workflow Nodes', 
        value: '8 basic nodes', 
        nodes: [
          'Enter Niche/Business Type',
          'Analyze SEO Request',
          'Identify Long-Tail Keywords',
          'Identify Short-Tail Keywords',
          'Group Similar Keywords',
          'Generate Article Ideas',
          'Generate Content Strategy',
          'Generate AI Content'
        ]
      },
      { name: 'Projects', value: '5 projects' },
      { name: 'AI-generated words', value: '50k words/month', additional: '$5 per additional 1k words' },
      { name: 'Keyword research', value: '2,000 keywords/month', additional: 'Basic keyword research tools only' },
      { name: 'Content Editor', value: '30 articles/month', additional: '$5 per additional article' },
      { name: 'Topic Explorer', value: '100 searches/day' },
      { name: 'Content Audit', value: 'Track 100 pages/site'},
      { name: 'Node access', value: '5 basic nodes' },
      { name: 'User seats', value: '2 seats' },
      { name: 'On-page SEO optimization', value: 'Basic suggestions' },
      { name: 'Daily SEO health checks', included: true },
      { name: 'Reporting', value: 'Basic reporting' },
      { name: 'Excel data export', included: false },
      { name: 'API integrations', value: 'Limited (Google Search Console, Google Analytics)' },
    ]
  },
  {
    name: 'PRO',
    description: 'For growing businesses and marketing teams',
    monthlyPrice: 249,
    yearlyPrice: 2689,
    features: [
      { 
        name: 'Workflow Nodes', 
        value: '15 nodes', 
        nodes: [
          'Enter Niche/Business Type',
          'Analyze SEO Request',
          'SEMRush Keyword Research',
          'Identify Long-Tail Keywords',
          'Identify Short-Tail Keywords',
          'Group Similar Keywords',
          'Identify Main Keywords',
          'Competitor Content Analysis',
          'Competitor Keyword Analysis',
          'Generate Content Strategy',
          'Generate Article Ideas',
          'Export to Excel',
          'Excel Content Manager',
          'Daily SEO Health Check',
          'SEO Insights Analyzer'
        ]
      },
      { name: 'Projects', value: '15 projects' },
      { name: 'AI-generated words', value: '100k words/month', additional: '$4 per additional 1k words' },
      { name: 'Keyword research', value: '10,000 keywords/month', additional: 'Includes SEMrush integration' },
      { name: 'Content Editor', value: '100 articles/month', additional: '$3 per additional article' },
      { name: 'AI Articles', value: '0 AI articles/month', additional: '$19 per additional article' },
      { name: 'Topic Explorer', value: '100 searches/day', isNew: true },
      { name: 'Content Audit', value: 'Track 200 pages/site', isNew: true },
      { name: 'Node access', value: '15 nodes' },
      { name: 'User seats', value: '10 seats' },
      { name: 'On-page SEO optimization', value: 'Advanced suggestions' },
      { name: 'Daily SEO health checks', included: true },
      { name: 'Reporting', value: 'Advanced reporting' },
      { name: 'Excel data export', included: true },
      { name: 'API integrations', value: 'Extended (Google Search Console, Google Analytics, SEMrush, Ahrefs)' },
      { name: 'Content optimization assistant', included: true },
      { name: 'Internal linking generator', included: true },
      { name: 'Automated publishing scheduler', included: true },
      { name: '404 error monitoring and fixing', included: true },
      { name: 'Page speed monitoring', included: true },
    ]
  },
  {
    name: 'BUSINESS',
    description: 'For agencies and large marketing teams',
    monthlyPrice: 499,
    yearlyPrice: 5389,
    features: [
      { 
        name: 'Workflow Nodes', 
        value: 'All available nodes', 
        nodes: workflowNodes
      },
      { name: 'Projects', value: '30 projects' },
      { name: 'AI-generated words', value: '200k words/month', additional: '$3 per additional 1k words' },
      { name: 'Keyword research', value: 'Unlimited', additional: 'Includes SEMrush and Ahrefs integrations' },
      { name: 'Content Editor', value: '100 articles/month', additional: '$1 per additional article' },
      { name: 'Topic Explorer', value: '100 searches/day' },
      { name: 'Content Audit', value: 'Track 200 pages/site'},
      { name: 'Node access', value: 'All available nodes' },
      { name: 'User seats', value: '20 seats' },
      { name: 'On-page SEO optimization', value: 'Advanced AI-powered suggestions' },
      { name: 'Daily SEO health checks', included: true },
      { name: 'Reporting', value: 'White-label reporting' },
      { name: 'Excel data export', included: true },
      { name: 'API integrations', value: 'Full access (All Pro integrations + Google PageSpeed Insights, Custom API)' },
      { name: 'Content optimization assistant', included: true },
      { name: 'Internal linking generator', included: true },
      { name: 'Automated publishing scheduler', included: true },
      { name: '404 error monitoring and fixing', included: true },
      { name: 'Page speed monitoring', included: true },
      { name: 'Custom workflow builder', included: true },
      { name: 'Trend optimization notifier', included: true },
      { name: 'Priority support', included: true },
    ]
  },
  {
    name: 'ENTERPRISE',
    description: 'Custom solutions for large-scale operations',
    price: 'Custom',
    features: [
      { 
        name: 'Workflow Nodes', 
        value: 'All available nodes + custom nodes', 
        nodes: [...workflowNodes, 'Custom nodes']
      },
      { name: 'Projects', value: 'Unlimited' },
      { name: 'AI-generated words', value: '500k+ words/month (customizable)' },
      { name: 'Keyword research', value: 'Unlimited', additional: 'Includes SEMrush, Ahrefs, and custom integrations' },
      { name: 'Content Editor', value: 'Unlimited articles' },
      { name: 'Topic Explorer', value: 'Custom searches/day' },
      { name: 'Content Audit', value: 'Custom page tracking' },
      { name: 'Node access', value: 'All nodes + custom development' },
      { name: 'User seats', value: 'Unlimited' },
      { name: 'On-page SEO optimization', value: 'Custom AI-powered suggestions' },
      { name: 'Daily SEO health checks', included: true },
      { name: 'Reporting', value: 'Custom white-label reporting' },
      { name: 'Excel data export', included: true },
      { name: 'API integrations', value: 'Full access + custom integrations' },
      { name: 'Content optimization assistant', included: true },
      { name: 'Internal linking generator', included: true },
      { name: 'Automated publishing scheduler', included: true },
      { name: '404 error monitoring and fixing', included: true },
      { name: 'Page speed monitoring', included: true },
      { name: 'Custom workflow builder', included: true },
      { name: 'Trend optimization notifier', included: true },
      { name: 'Priority support', value: 'Dedicated account manager' },
      { name: 'Custom feature development', included: true },
      { name: 'On-premise deployment options', included: true },
    ]
  }
];

const PricingTable = () => {
  const [yearlyBilling, setYearlyBilling] = useState(false);

  const handleBillingChange = () => {
    setYearlyBilling(!yearlyBilling);
  };

  const renderFeatureValue = (feature, plan) => {
    if (feature.name === 'Workflow Nodes') {
      return (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {feature.value}
          </Typography>
          <WorkflowNodesDisplay nodes={workflowNodes} availableNodes={feature.nodes} />
        </Box>
      );
    }
    
    const isIncluded = feature.included !== undefined ? feature.included : true;
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isIncluded ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <CloseIcon color="error" fontSize="small" />
        )}
        <Typography variant="body2" sx={{ mt: 1 }}>
          {feature.value || (isIncluded ? 'Included' : 'Not included')}
        </Typography>
        {feature.additional && (
          <Typography variant="caption" display="block" sx={{ mt: 0.5, textAlign: 'center' }}>
            {feature.additional}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }} id="pricing">
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          Pricing Plans
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <FormControlLabel
            control={<Switch checked={yearlyBilling} onChange={handleBillingChange} />}
            label={yearlyBilling ? "Yearly billing" : "Monthly billing"}
          />
          {yearlyBilling && <Typography variant="body2" sx={{ ml: 2 }}>Save up to 10%</Typography>}
        </Box>
        
        {/* Banner for Stripe payment method */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: 2, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">
            We use Stripe for secure and easy payments
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="pricing table">
            <TableHead>
              <TableRow>
                <TableCell>Features</TableCell>
                {plans.map((plan) => (
                  <TableCell key={plan.name} align="center">
                    <Typography variant="h6">{plan.name}</Typography>
                    <Typography variant="body2">{plan.description}</Typography>
                    <Typography variant="h4">
                      {plan.price ? plan.price : yearlyBilling ? `$${plan.yearlyPrice}` : `$${plan.monthlyPrice}`}
                    </Typography>
                    {plan.price && <Typography variant="caption">/year</Typography>}
                    {!plan.price && <Typography variant="caption">/{yearlyBilling ? 'year' : 'month'}</Typography>}
                    <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                      To get started with the {plan.name} plan, please email us at:
                    </Typography>
                    <Link href="mailto:support@aiseoflow.com" variant="body2" sx={{ fontWeight: 'bold' }}>
                      support@aiseoflow.com
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {plans[0].features.map((feature, index) => (
                <TableRow key={feature.name}>
                  <TableCell component="th" scope="row">
                    {feature.name}
                    {feature.isNew && <Chip label="NEW" color="secondary" size="small" sx={{ ml: 1 }} />}
                    <Tooltip title="More info about this feature">
                      <IconButton size="small">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {plans.map((plan) => (
                    <TableCell key={`${plan.name}-${feature.name}`} align="center">
                      {renderFeatureValue(plan.features[index], plan)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body1">
            Have questions about our pricing or need a custom plan?
          </Typography>
          <Typography variant="body1">
            Contact us at{' '}
            <Link href="mailto:support@aiseoflow.com">
              support@aiseoflow.com
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingTable;