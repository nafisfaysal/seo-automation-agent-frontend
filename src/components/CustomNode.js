import React from 'react';
import { Handle } from 'reactflow';
import { Typography, Paper, Box, IconButton, Input, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function CustomNode({ id, data, isConnectable }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (data.label === 'Generate AI Content' && data.content) {
      navigate(`/edit-content/${id}`, { state: { content: data.content } });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 200 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" component="div">
          {data.icon} {data.label}
        </Typography>
        <Box>
          {data.label === 'Generate AI Content' && (
            <IconButton size="small" onClick={handleEdit} sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => data.onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {data.description}
      </Typography>
      {data.showInput && (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Enter niche/business type"
          value={data.inputText || ''}
          onChange={(e) => data.onInputChange(id, e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
      )}
      {data.canUploadFile && (
        <Box sx={{ mt: 2 }}>
          <Input
            type="file"
            onChange={(event) => data.onFileUpload(event, id)}
            style={{ display: 'none' }}
            id={`file-upload-${id}`}
          />
          <label htmlFor={`file-upload-${id}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              size="small"
              fullWidth
            >
              Upload File
            </Button>
          </label>
          {data.uploadedFile && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Uploaded: {data.uploadedFile}
            </Typography>
          )}
        </Box>
      )}
      <Handle type="target" position="top" style={{ background: '#555' }} isConnectable={isConnectable} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} isConnectable={isConnectable} />
    </Paper>
  );
}

export default CustomNode;
