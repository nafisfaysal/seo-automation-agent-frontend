import React, { useState } from 'react';
import { Paper, Typography, Box, IconButton, Collapse, TextField, Switch, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function WorkflowStep({ step, onConfigChange }) {
  const [expanded, setExpanded] = useState(false);
  const [config, setConfig] = useState(step.content);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange(step.id, newConfig);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{step.title}</Typography>
        <IconButton onClick={toggleExpand}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Custom Input"
            variant="outlined"
            value={config.customInput || ''}
            onChange={(e) => handleConfigChange('customInput', e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={config.isEnabled ?? true}
                onChange={(e) => handleConfigChange('isEnabled', e.target.checked)}
              />
            }
            label="Enable Step"
          />
        </Box>
      </Collapse>
    </Paper>
  );
}

export default WorkflowStep;
