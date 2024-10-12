import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function EditContent() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (location.state && location.state.content) {
      const contentBlock = htmlToDraft(location.state.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
      setTitle(location.state.title || '');
    }
  }, [location.state]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // Here you would typically save the content to your backend
    console.log('Saving content:', { title, content: htmlContent });
    // For now, we'll just navigate back to the workflow builder
    navigate('/analysis');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit AI-Generated Content
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={handleTitleChange}
        margin="normal"
        variant="outlined"
      />
      <Box sx={{ border: 1, borderColor: 'grey.300', mb: 2, mt: 2 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}

export default EditContent;
