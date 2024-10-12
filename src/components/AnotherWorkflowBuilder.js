import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Typography, Button, Grid, Paper, IconButton, Tooltip, Divider, TextField } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CustomNode from './CustomNode';
import { useNavigate } from 'react-router-dom';

const nodeTypes = {
  custom: CustomNode,
};

const nodeOptions = [
  { id: 'enterNiche', label: 'Enter Niche/Business Type', icon: '🏢', description: 'Specify your niche or business type to start the SEO analysis.' },
  { id: 'analyze', label: 'Analyze SEO Request', icon: '🔍', description: 'Analyze the initial SEO request.' },
  { id: 'extractSEMRush', label: 'SEMRush Keyword Research', icon: '🔍', description: 'Extract keywords using SEMRush API.' },
  { id: 'extractAhrefs', label: 'Ahrefs Keyword Research', icon: '🔎', description: 'Extract keywords using Ahrefs API.' },
  { id: 'identifyLongTail', label: 'Identify Long-Tail Keywords', icon: '🐍', description: 'Identify and analyze long-tail keywords.' },
  { id: 'identifyShortTail', label: 'Identify Short-Tail Keywords', icon: '🦎', description: 'Identify and analyze short-tail keywords.' },
  { id: 'group', label: 'Group Similar Keywords', icon: '🗂️', description: 'Group similar keywords together.' },
  { id: 'identify', label: 'Identify Main Keywords', icon: '🎯', description: 'Identify the most important keywords.' },
  { id: 'competitorsContent', label: 'Competitor Content Analysis', icon: '📄', description: 'Analyze competitors\' content strategy.' },
  { id: 'competitorsKeywords', label: 'Competitor Keyword Analysis', icon: '🔤', description: 'Analyze competitors\' keyword strategy.' },
  { id: 'strategy', label: 'Generate Content Strategy', icon: '📝', description: 'Generate a comprehensive content strategy.' },
  { id: 'ideas', label: 'Generate Article Ideas', icon: '💡', description: 'Generate article ideas based on keyword analysis.' },
  { id: 'saveExcel', label: 'Export to Excel', icon: '📊', description: 'Save analysis results to an Excel file.' },
  { id: 'excelContentManager', label: 'Excel Content Manager', icon: '📋', description: 'Manage content data in Word and metadata in Excel.' },
  { id: 'autoPublishScheduler', label: 'Auto Publish Scheduler', icon: '🗓️', description: 'Automatically publish content to the site from Excel.' },
  { id: 'dailySEOHealthCheck', label: 'Daily SEO Health Check', icon: '🩺', description: 'Schedule a daily task to monitor SEO metrics.' },
  { id: 'seoInsightsAnalyzer', label: 'SEO Insights Analyzer', icon: '📊', description: 'Analyze indexed pages, visitor statistics, and keyword performance.' },
  { id: 'manualOptimizationAssistant', label: 'Manual Optimization Assistant', icon: '✏️', description: 'Suggest manual changes for each page based on performance.' },
  { id: 'internalLinkingGenerator', label: 'Internal Linking Generator', icon: '🔗', description: 'Suggest relevant internal links and phrases for interlinking.' },
  { id: '404ErrorMonitor', label: '404 Error Monitor', icon: '🚫', description: 'Track and fix 404 errors reported by search engines.' },
  { id: 'postEditCooldownScheduler', label: 'Post Edit Cooldown Scheduler', icon: '⏳', description: 'Ensure no re-optimization for 7 days after a page edit.' },
  { id: 'trendOptimizationNotifier', label: 'Trend Optimization Notifier', icon: '📈', description: 'Notify about upcoming opportunities for page optimization based on trends.' },
  { id: 'outboundLinkManager', label: 'Outbound Link Manager', icon: '🔗', description: 'Manually manage outbound links and monitor 404 errors.' },
  { id: 'pageSpeedMonitor', label: 'Page Speed Monitor', icon: '', description: 'Calculate page speed scores using PageSpeed API.' },
  { id: 'searchConsoleErrorHandler', label: 'Search Console Error Handler', icon: '🛠️', description: 'Fix Search Console errors before they are reported.' },
  { id: 'imageOptimizationHelper', label: 'Image Optimization Helper', icon: '🖼️', description: 'Optimize image titles and alt tags using a script.' },
  { id: 'duplicateContentFinder', label: 'Duplicate Content Finder', icon: '🔍', description: 'Identify duplicate posts using a similarity detection script.' },
  { id: 'headingMetaValidator', label: 'Heading & Meta Length Validator', icon: '📏', description: 'Check the length of headings, meta tags, and keyword changes.' },
  { id: 'highTrafficKeywordChecker', label: 'High Traffic Keyword Checker', icon: '🔑', description: 'Ensure high-traffic keywords are present in the title.' },
  { id: 'newKeywordIntegrator', label: 'New Keyword Integrator', icon: '➕', description: 'Verify and integrate new keywords from Search Console.' },
  { 
    id: 'generateAIContent', 
    label: 'Generate AI Content', 
    icon: '🤖', 
    description: 'Use AI to generate content based on the analysis results.'
  },
];

const NodeCard = ({ option, onClick, onDragStart }) => (
  <Tooltip title={option.description} placement="bottom">
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
        width: 120,
        height: 120,
      }}
      onClick={() => onClick(option)}
      draggable
      onDragStart={onDragStart}
    >
      <Typography variant="h6" component="div">
        {option.icon}
      </Typography>
      <Typography 
        variant="caption" 
        align="center" 
        sx={{ 
          mt: 1, 
          fontSize: '0.7rem',
          lineHeight: 1.2,
          maxHeight: '2.4em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {option.label}
      </Typography>
      <Typography 
        variant="caption" 
        align="center" 
        sx={{ 
          mt: 0.5, 
          fontSize: '0.6rem',
          color: 'text.secondary',
          maxHeight: '3.6em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {option.description}
      </Typography>
    </Paper>
  </Tooltip>
);

function WorkflowBuilderContent() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);
  const navigate = useNavigate();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const option = nodeOptions.find(opt => opt.id === type);

      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the current viewport center
      const { x: viewportX, y: viewportY, zoom } = reactFlowInstance.getViewport();
      const centerX = viewportX + reactFlowWrapper.current.offsetWidth / 2 / zoom;
      const centerY = viewportY + reactFlowWrapper.current.offsetHeight / 2 / zoom;

      const position = reactFlowInstance.project({
        x: centerX,
        y: centerY,
      });

      const newNode = createNode(type, position);
      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode);
        setTimeout(() => centerOnNode(newNode.id), 100);
        return updatedNodes;
      });
    },
    [reactFlowInstance]
  );

  const handleInputChange = useCallback((nodeId, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            inputText: value,
            step: { ...node.data.step, content: { ...node.data.step.content, inputText: value } },
          };
        }
        return node;
      })
    );
  }, []);

  const createNode = useCallback((type, position) => {
    const option = nodeOptions.find(opt => opt.id === type);
    return {
      id: `${type}-${nodes.length + 1}`,
      type: 'custom',
      position,
      data: { 
        label: option.label, 
        icon: option.icon, 
        description: option.description,
        step: { title: option.label, content: {} },
        onInputChange: handleInputChange,
        canUploadFile: option.canUploadFile,
        onFileUpload: handleFileUpload,
        uploadedFile: null,
        onDelete: handleDeleteNode,
        content: option.id === 'generateAIContent' ? '<p>This is the <strong>AI-generated</strong> content.</p>' : null,
        inputText: option.id === 'enterNiche' ? '' : undefined,
        showInput: option.id === 'enterNiche',
      },
    };
  }, [nodes.length, handleInputChange, handleFileUpload, handleDeleteNode]);

  const handleNodeClick = useCallback((option) => {
    const existingNode = nodes.find(node => node.id.startsWith(option.id));
    if (existingNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === existingNode.id
            ? { ...node, style: { ...node.style, border: '2px solid #ff0000' } }
            : { ...node, style: { ...node.style, border: undefined } }
        )
      );
      centerOnNode(existingNode.id);
    }
  }, [nodes]);

  const centerOnNode = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      reactFlowInstance.setCenter(node.position.x, node.position.y, { zoom: 1.5, duration: 1000 });
    }
  };

  const handleZoomToFit = useCallback(() => {
    reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
  }, [reactFlowInstance]);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (reactFlowWrapper.current.requestFullscreen) {
        reactFlowWrapper.current.requestFullscreen();
      } else if (reactFlowWrapper.current.webkitRequestFullscreen) {
        reactFlowWrapper.current.webkitRequestFullscreen();
      } else if (reactFlowWrapper.current.msRequestFullscreen) {
        reactFlowWrapper.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  const handleRunWorkflow = () => {
    // Simply navigate to the AnalysisView page
    navigate('/analysis');
  };

  const handleSidebarResize = useCallback((e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const doDrag = (e) => {
      const newWidth = startWidth + e.clientX - startX;
      setSidebarWidth(Math.max(200, Math.min(newWidth, window.innerWidth - 400)));
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  }, [sidebarWidth]);

  const renderWorkflowArray = () => {
    const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {sortedNodes.map((node) => (
          <Paper 
            key={node.id}
            elevation={2} 
            sx={{ 
              p: 1, 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#f0f0f0',
              borderRadius: '20px',
            }}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>{node.data.icon}</Typography>
            <Typography variant="body2">{node.data.label}</Typography>
          </Paper>
        ))}
      </Paper>
    );
  };

  const renderAvailableNodes = () => (
    <Box sx={{ overflowY: 'auto', height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        Available Nodes
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {nodeOptions.map((option) => (
          <Grid item key={option.id} xs={6} sm={4} md={3} lg={2}>
            <NodeCard
              option={option}
              onClick={handleNodeClick}
              onDragStart={(event) => {
                event.dataTransfer.setData('application/reactflow', option.id);
                event.dataTransfer.effectAllowed = 'move';
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {!isFullscreen && (
        <Box
          ref={sidebarRef}
          sx={{
            width: `${sidebarWidth}px`,
            borderRight: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h4" gutterBottom color="primary">
               SEO Automation Canvas
            </Typography>
            {renderWorkflowArray()}
          </Box>
          {renderAvailableNodes()}
        </Box>
      )}
      <Divider
        ref={resizerRef}
        orientation="vertical"
        sx={{
          width: '10px',
          cursor: 'col-resize',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseDown={handleSidebarResize}
      >
        <DragIndicatorIcon />
      </Divider>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          ref={reactFlowWrapper}
          sx={{
            flexGrow: 1,
            '& .react-flow__node': {
              width: 'auto',
              height: 'auto',
            },
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background color="#aaa" gap={16} />
            <Panel position="top-right">
              <IconButton onClick={toggleFullscreen} size="small" sx={{ bgcolor: 'white', mr: 1 }}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
              <IconButton onClick={handleZoomToFit} size="small" sx={{ bgcolor: 'white' }}>
                <ZoomOutMapIcon />
              </IconButton>
            </Panel>
          </ReactFlow>
        </Box>
        {!isFullscreen && (
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRunWorkflow} 
              disabled={nodes.length === 0}
            >
              Run Workflow
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderContent />
    </ReactFlowProvider>
  );
}

export default WorkflowBuilder;