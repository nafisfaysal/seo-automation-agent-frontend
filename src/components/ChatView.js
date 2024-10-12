import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, CircularProgress, TextField, Button } from '@mui/material';

function ChatView({ onStartAnalysis }) {
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const initialGreeting = "Hello! I'm Zosia, your SEO Automation Agent. How can I assist you with your SEO strategy today?";
    setConversation([{ role: 'assistant', content: initialGreeting }]);
  }, []);

  const handleUserInput = async (input) => {
    setConversation(prev => [...prev, { role: 'user', content: input }]);
    setIsProcessing(true);
    
    setTimeout(() => {
      const aiResponse = "Thank you for your input. I'm ready to start the SEO analysis based on the information you've provided. Shall we begin?";
      setConversation(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsProcessing(false);
      
      // Trigger analysis after a short delay
      setTimeout(() => {
        onStartAnalysis(input);
      }, 1500);
    }, 1500);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleTextInputSubmit = () => {
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        SEO Automation Agent Zosia
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3, maxHeight: '60vh', overflowY: 'auto' }}>
        {conversation.map((message, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            paragraph 
            sx={{ 
              fontWeight: message.role === 'assistant' ? 'bold' : 'normal',
              color: message.role === 'assistant' ? 'primary.main' : 'text.primary'
            }}
          >
            {message.role === 'assistant' ? 'Zosia: ' : 'You: '}{message.content}
          </Typography>
        ))}
        {isProcessing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Type your message here..."
          variant="outlined"
          sx={{ mr: 1, flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleTextInputSubmit}
          disabled={isProcessing || !textInput.trim()}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default ChatView;