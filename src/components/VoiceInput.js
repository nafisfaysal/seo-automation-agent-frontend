import React, { useState, useEffect, useRef } from 'react';
import { Typography, CircularProgress } from '@mui/material';

const VoiceInput = ({ onTranscriptReceived, onResponseReceived }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError('Error in speech recognition. Please try again.');
      };
    } else {
      setError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    let timer;
    if (transcript) {
      timer = setTimeout(() => {
        sendTranscriptToBackend(transcript);
      }, 1500); // Wait for 1.5 seconds of silence before sending
    }
    return () => clearTimeout(timer);
  }, [transcript]);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    recognitionRef.current.start();
  };

  const sendTranscriptToBackend = async (text) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        onResponseReceived(data.response);
      } else {
        throw new Error(data.error || 'Error processing text');
      }
    } catch (err) {
      console.error('Error sending transcript to backend:', err);
      setError('Error processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    startListening();
  }, []); // Start listening when component mounts

  return (
    <div>
      {isProcessing && <CircularProgress size={24} sx={{ ml: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {transcript && (
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          You: {transcript}
        </Typography>
      )}
    </div>
  );
};

export default VoiceInput;
