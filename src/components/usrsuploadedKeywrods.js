import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, Stepper, Step, StepLabel, CircularProgress, LinearProgress,
  Grid, Card, CardContent, List, ListItem, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails,
  Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemIcon, Tabs, Tab,
  Button
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import * as XLSX from 'xlsx';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const steps = [
  { label: 'SEMRush Keyword Research', message: 'Conducting keyword research using SEMRush.' },
  { label: 'Identify Main Keywords', message: 'Identifying the most important keywords for your niche.' },
  { label: 'Group Similar Keywords', message: 'Grouping related keywords together.' },
  { label: 'Competitor Keyword Analysis', message: 'Analyzing competitor keywords.' },
  { label: 'Competitor Content Analysis', message: 'Analyzing competitor content strategies.' },
  { label: 'Custom Content Outline', message: 'Processing custom content outline from uploaded file.' },
  { label: 'Generate AI Content', message: 'Creating AI-generated content based on the outline & strategy.' },
  { label: 'Export to Excel', message: 'Exporting results to Excel format.' }
];

const mockData = {
  keywords: {
    keywords: [
      {
        "Keyword": "handmade jewelry",
        "Type": "Short-tail",
        "Search Volume": "12000",
        "CPC": "$1.20",
        "Intent": "Transactional",
        "Difficulty": "Medium",
        "Competition": "Moderate",
        "Trend": "Rising"
      },
      {
        "Keyword": "artisanal jewelry online",
        "Type": "Long-tail",
        "Search Volume": "8000",
        "CPC": "$0.80",
        "Intent": "Transactional",
        "Difficulty": "Low",
        "Competition": "Low",
        "Trend": "Steady"
      },
      {
        "Keyword": "sustainable jewelry",
        "Type": "Short-tail",
        "Search Volume": "9000",
        "CPC": "$1.00",
        "Intent": "Informational",
        "Difficulty": "Medium",
        "Competition": "High",
        "Trend": "Increasing"
      },
      {
        "Keyword": "unique handcrafted necklaces",
        "Type": "Long-tail",
        "Search Volume": "3000",
        "CPC": "$0.60",
        "Intent": "Transactional",
        "Difficulty": "Low",
        "Competition": "Low",
        "Trend": "Rising"
      },
      {
        "Keyword": "ethical jewelry brands",
        "Type": "Short-tail",
        "Search Volume": "7000",
        "CPC": "$1.50",
        "Intent": "Informational",
        "Difficulty": "High",
        "Competition": "High",
        "Trend": "Steady"
      },
      {
        "Keyword": "best handmade gemstone rings",
        "Type": "Long-tail",
        "Search Volume": "2500",
        "CPC": "$0.90",
        "Intent": "Transactional",
        "Difficulty": "Low",
        "Competition": "Moderate",
        "Trend": "Rising"
      },
      {
        "Keyword": "how to care for handmade jewelry",
        "Type": "Long-tail",
        "Search Volume": "1500",
        "CPC": "$0.50",
        "Intent": "Informational",
        "Difficulty": "Low",
        "Competition": "Low",
        "Trend": "Increasing"
      },
      {
        "Keyword": "eco-friendly engagement rings",
        "Type": "Long-tail",
        "Search Volume": "4500",
        "CPC": "$2.00",
        "Intent": "Transactional",
        "Difficulty": "Medium",
        "Competition": "Moderate",
        "Trend": "Rising"
      },
      {
        "Keyword": "recycled gold jewelry",
        "Type": "Long-tail",
        "Search Volume": "3200",
        "CPC": "$0.75",
        "Intent": "Informational",
        "Difficulty": "Low",
        "Competition": "Low",
        "Trend": "Increasing"
      },
      {
        "Keyword": "custom handmade jewelry design",
        "Type": "Long-tail",
        "Search Volume": "2800",
        "CPC": "$1.10",
        "Intent": "Transactional",
        "Difficulty": "Medium",
        "Competition": "Moderate",
        "Trend": "Steady"
      }
    ]
  },
  mainKeywords: {
    main_keywords: [
      {
        keyword: "handmade jewelry",
        search_volume: 12000,
        difficulty: "Medium",
        content_suggestion: "Create a comprehensive guide on different types of handmade jewelry techniques"
      },
      {
        keyword: "sustainable jewelry",
        search_volume: 9000,
        difficulty: "Medium",
        content_suggestion: "Develop an infographic showcasing the environmental impact of sustainable jewelry practices"
      },
      {
        keyword: "artisanal jewelry online",
        search_volume: 8000,
        difficulty: "Low",
        content_suggestion: "Produce a video series featuring interviews with artisanal jewelry makers"
      },
      {
        keyword: "ethical jewelry brands",
        search_volume: 7000,
        difficulty: "High",
        content_suggestion: "Write a blog post comparing top ethical jewelry brands and their practices"
      },
      {
        keyword: "custom handmade jewelry",
        search_volume: 5500,
        difficulty: "Medium",
        content_suggestion: "Create an interactive tool for customers to design their own custom jewelry pieces"
      }
    ]
  },
  groupedKeywords: {
    clusters: [
      {
        "Search Intent": "Sustainable and Eco-Friendly Jewelry",
        "Recommended Content": "Create a comprehensive guide on sustainable jewelry materials and practices",
        "Keywords": [
          "recycled gold jewelry",
          "eco-friendly engagement rings",
          "sustainable jewelry"
        ]
      },
      {
        "Search Intent": "Handmade and Artisanal Jewelry",
        "Recommended Content": "Develop a series of artisan spotlight videos showcasing handmade jewelry techniques",
        "Keywords": [
          "handmade jewelry",
          "artisanal jewelry online",
          "unique handcrafted necklaces"
        ]
      },
      {
        "Search Intent": "Ethical Jewelry Brands",
        "Recommended Content": "Create a comparison chart of top ethical jewelry brands and their practices",
        "Keywords": [
          "ethical jewelry brands",
          "sustainable jewelry",
          "eco-friendly engagement rings"
        ]
      },
      {
        "Search Intent": "Custom and Gemstone Jewelry",
        "Recommended Content": "Develop an interactive tool for custom jewelry design and gemstone selection",
        "Keywords": [
          "custom handmade jewelry design",
          "best handmade gemstone rings"
        ]
      },
      {
        "Search Intent": "Jewelry Care and Maintenance",
        "Recommended Content": "Produce a detailed guide and video series on caring for different types of handmade jewelry",
        "Keywords": [
          "how to care for handmade jewelry"
        ]
      }
    ]
  },
  competitorKeywords: {
    // ... add competitor keyword analysis data here ...
  },
  competitorContent: {
    // ... add competitor content analysis data here ...
  },
  customContentOutline: {
    // ... add custom content outline data here ...
  },
  aiGeneratedContent: [
    {
      title: "The Renaissance of Handmade Jewelry in the Digital Age",
      content: `
In an era dominated by mass production and fast fashion, the world of handmade jewelry is experiencing a remarkable renaissance. This resurgence is not just a nostalgic return to traditional craftsmanship; it's a movement powered by conscious consumerism, technological advancements, and a growing appreciation for unique, sustainable luxury.

The appeal of handmade jewelry lies in its inherent uniqueness. In a world where individuality is increasingly valued, wearing a piece of jewelry crafted by human hands offers a sense of distinction that mass-produced items simply cannot match. Each handmade piece tells a story – of the artisan's skill, the origin of materials, and the cultural heritage often embedded in design motifs.

Sustainability is another driving force behind the handmade jewelry comeback. As consumers become more environmentally conscious, they are turning to artisanal jewelers who often use ethically sourced, recycled, or upcycled materials. This shift not only reduces the environmental impact but also adds an extra layer of meaning to each piece.

The digital revolution, far from hindering traditional craftsmanship, has actually propelled it forward. Online marketplaces and social media platforms have given independent jewelers unprecedented access to global audiences. Platforms like Etsy, Instagram, and Pinterest have become virtual galleries where artisans can showcase their work, share their processes, and connect directly with customers who value their craft.

Moreover, technology has enhanced the creation process itself. While traditional techniques remain at the core, many artisans are incorporating modern tools like 3D printing for prototyping or laser cutting for precision work. This fusion of old-world craftsmanship with new-world technology is resulting in innovative designs that push the boundaries of what's possible in handmade jewelry.

The personalization trend has further boosted the appeal of handmade jewelry. Many artisans offer custom-made pieces, allowing customers to be part of the creative process. This level of involvement creates a deeper emotional connection to the jewelry, making it more than just an accessory, but a cherished keepsake.

Education plays a crucial role in this renaissance. Artisans are not just selling products; they're sharing knowledge about their craft, the materials they use, and the cultural significance of their designs. This transparency and storytelling add value to handmade pieces, justifying higher price points compared to mass-produced alternatives.

The handmade jewelry movement also aligns with the growing interest in supporting small businesses and local economies. Purchasing from independent jewelers often means supporting families and communities, creating a positive social impact that resonates with socially conscious consumers.

Looking ahead, the future of handmade jewelry seems bright. As consumers continue to seek out unique, sustainable, and meaningful products, artisanal jewelers are well-positioned to meet this demand. The challenge will be in scaling their businesses while maintaining the essence of handcrafted quality.

In conclusion, the renaissance of handmade jewelry in the digital age represents a harmonious blend of tradition and innovation. It's a testament to the enduring appeal of human craftsmanship and the power of conscious consumerism. As we move forward, handmade jewelry stands not just as a category of accessories, but as a movement that celebrates individuality, sustainability, and the timeless art of creating beauty by hand.
      `
    },
    {
      title: "Sustainable Luxury: The Future of Ethical Jewelry",
      content: `
The concept of luxury is undergoing a profound transformation in the jewelry industry. No longer solely defined by rare gems and precious metals, true luxury now encompasses ethical sourcing, sustainable practices, and transparent supply chains. This shift towards "sustainable luxury" is reshaping the future of jewelry, driven by a new generation of conscious consumers who demand both exquisite craftsmanship and ethical integrity.

At the heart of this movement is a reimagining of what makes jewelry valuable. While traditional factors like rarity and craftsmanship still play a role, the story behind each piece – its origin, impact, and purpose – has become equally important. Consumers are increasingly seeking jewelry that not only adorns but also aligns with their values and contributes positively to the world.

One of the most significant developments in ethical jewelry is the sourcing of materials. Mining, particularly for diamonds and gold, has long been associated with environmental degradation and human rights abuses. In response, jewelers are turning to alternative sources. Lab-grown diamonds, for instance, offer a sustainable alternative to mined stones, with the added benefit of being chemically and visually identical to natural diamonds. Similarly, recycled gold and silver are becoming staples in ethical jewelry collections, reducing the demand for newly mined metals.

Gemstone sourcing is also evolving. Ethical jewelers are establishing direct relationships with small-scale miners, ensuring fair wages and safe working conditions. Some are even going a step further by investing in the communities where these gems are sourced, supporting education, healthcare, and local infrastructure projects.

Transparency has become a key differentiator in the luxury jewelry market. Brands are leveraging technology like blockchain to provide customers with comprehensive information about their jewelry's journey from source to store. This level of transparency not only builds trust but also educates consumers about the complexities and value of truly ethical jewelry.

The rise of sustainable luxury has also sparked innovation in jewelry design. Designers are experimenting with unconventional, eco-friendly materials like recycled plastics, sustainable wood, and even agricultural byproducts. These materials are being transformed into stunning pieces that challenge traditional notions of what constitutes "precious" in jewelry.

Customization and made-to-order models are gaining traction in ethical jewelry. This approach not only allows for personalization but also reduces waste by eliminating excess inventory. Some brands are even exploring rental and buyback programs, embracing the circular economy model and extending the lifecycle of luxury pieces.

Education plays a crucial role in the sustainable luxury movement. Ethical jewelers are not just selling products; they're sharing knowledge about responsible sourcing, traditional craftsmanship, and the cultural significance of jewelry. This educational approach transforms the purchase of a piece of jewelry into an enlightening experience, adding depth to the concept of luxury.

The shift towards sustainable luxury is also influencing larger, established jewelry houses. Many are reevaluating their practices and introducing ethical lines, recognizing that sustainability is not just a trend but a fundamental change in consumer expectations.

However, challenges remain. Ensuring the authenticity of ethical claims, scaling sustainable practices, and balancing higher production costs with market expectations are ongoing issues. The industry is also grappling with how to make ethical jewelry more accessible without compromising on quality or fair labor practices.

Looking to the future, the trajectory of ethical jewelry seems clear. As consumers become more informed and conscientious, the demand for sustainable luxury will only grow. This shift is not just changing what we wear; it's redefining the very essence of luxury in the modern world.

In conclusion, sustainable luxury in jewelry represents a harmonious blend of ethics, aesthetics, and innovation. It's a movement that honors the earth's resources, respects human dignity, and celebrates the artistry of jewelry making. As this sector continues to evolve, it promises to bring forth a new era where luxury is defined not by exclusivity and expense alone, but by responsibility, transparency, and positive impact.
      `
    },
    {
      title: "The Art of Storytelling in Jewelry: Crafting Narratives Through Design",
      content: `
In the world of jewelry, each piece has the potential to be more than just an accessory – it can be a story, a memory, or a statement. The art of storytelling through jewelry design is an ancient practice that has found new relevance in today's market, where consumers are increasingly seeking products with meaning and personal significance. This approach to jewelry creation goes beyond aesthetics, infusing each piece with narrative elements that resonate on a deeper, emotional level.

Historically, jewelry has always been imbued with meaning. From ancient Egyptian amulets to Victorian mourning jewelry, pieces have long been created to commemorate events, symbolize beliefs, or tell tales of love and loss. In the contemporary jewelry landscape, this tradition is being reinvented and expanded upon, with designers using innovative techniques to weave complex narratives into their creations.

One of the most powerful ways jewelers incorporate storytelling is through the use of symbols and motifs. These can be personal to the wearer, culturally significant, or universally recognizable. For instance, a necklace might feature a series of charms, each representing a different chapter in the wearer's life. Or a ring might incorporate symbols from nature, telling a story of growth and renewal. The key is that these elements are not merely decorative; they carry meaning that unfolds as the wearer engages with the piece.

Materials themselves can be powerful storytelling tools. Using reclaimed wood from a significant building, metal from a meaningful object, or stones from a special location can imbue a piece of jewelry with a rich backstory. Some jewelers are even incorporating unconventional materials like sand from a favorite beach or fibers from a cherished piece of clothing, literally weaving personal histories into their designs.

The process of creation can also be part of the story. Handcrafted jewelry, with its slight imperfections and unique characteristics, tells the tale of its making – the skill of the artisan, the time invested, and the traditions upheld. Some designers are taking this further by documenting their creative process and sharing it with customers, allowing them to connect with the journey of their piece from concept to completion.

Customization plays a crucial role in narrative jewelry. By allowing customers to participate in the design process, jewelers enable them to create pieces that tell their own stories. This might involve choosing specific stones, deciding on engravings, or even providing materials with personal significance to be incorporated into the design. The result is a truly one-of-a-kind piece that carries deep personal meaning.

Technology is opening up new avenues for storytelling in jewelry. QR codes discreetly incorporated into designs can link to digital content – photos, videos, or written stories that provide context and depth to the physical piece. Augmented reality is being explored as a way to add layers of interactive storytelling to jewelry, allowing wearers to access hidden narratives through their smartphones.

The packaging and presentation of jewelry are also being leveraged to enhance the storytelling experience. Beautifully crafted boxes, accompanying books or cards that explain the piece's significance, and even immersive unboxing experiences all contribute to the overall narrative.

Ethical and sustainable practices have become an integral part of many jewelry stories. Pieces made with responsibly sourced materials or created to support specific social causes carry powerful narratives of positive impact and conscious consumption. These stories not only add value to the jewelry but also allow wearers to express their values and contribute to causes they care about.

Collections and series of jewelry pieces offer opportunities for extended storytelling. A designer might create a line inspired by a particular theme, with each piece representing a different aspect of the story. When worn together, these pieces create a cohesive narrative, but they also stand alone as individual chapters.

The art of storytelling in jewelry design is not without its challenges. Balancing narrative elements with wearability and aesthetic appeal requires skill and creativity. There's also the risk of over-complicating designs or relying too heavily on explanation, which can detract from the intuitive emotional connection that great jewelry should evoke.

Looking to the future, the potential for storytelling in jewelry design seems boundless. As consumers continue to seek out products with meaning and personal significance, jewelers who can master the art of narrative design will find themselves at a significant advantage. The most successful will be those who can create pieces that not only tell compelling stories but also invite wearers to become part of those stories, adding their own chapters through years of wear and cherished memories.

In conclusion, the art of storytelling in jewelry design represents a powerful convergence of craft, emotion, and personal expression. It transforms jewelry from mere adornment into wearable narratives – pieces that carry histories, express identities, and create connections. In a world increasingly driven by digital experiences, these tangible, personal stories we can wear close to our hearts offer a unique and precious form of storytelling.
      `
    }
  ]
};

function UserAnalysisView() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [articleIdeas, setArticleIdeas] = useState(mockData.articleIdeas.article_ideas);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const simulateAnalysis = () => {
    setActiveStep(0);
    setProgress(0);
    setCompletedSteps([]);

    // Set a random total time between 30000ms and 40000ms
    const totalTime = Math.floor(Math.random() * (40000 - 30000 + 1) + 30000);

    const stepTime = totalTime / steps.length;

    steps.forEach((step, index) => {
      setTimeout(() => {
        setActiveStep(index);
        setProgress((prevProgress) => (index + 1) * (100 / steps.length));
        setCompletedSteps((prevCompleted) => [...prevCompleted, step.label]);

        if (index === steps.length - 1) {
          setActiveStep(-1);
          setResult(mockData);
          generateExcel(mockData);
        }
      }, stepTime * (index + 1));
    });
  };

  useEffect(() => {
    simulateAnalysis();
  }, []);

  const generateExcel = (data) => {
    const workbook = XLSX.utils.book_new();

    // Keywords
    if (data.keywords && data.keywords.keywords) {
      const keywordsWS = XLSX.utils.json_to_sheet(data.keywords.keywords);
      XLSX.utils.book_append_sheet(workbook, keywordsWS, "Keywords");
    }

    // Grouped Keywords
    if (data.groupedKeywords && data.groupedKeywords.clusters) {
      const groupedKeywordsWS = XLSX.utils.json_to_sheet(data.groupedKeywords.clusters.map(cluster => ({
        "Search Intent": cluster["Search Intent"],
        "Recommended Content": cluster["Recommended Content"],
        "Keywords": cluster.Keywords.join(", ")
      })));
      XLSX.utils.book_append_sheet(workbook, groupedKeywordsWS, "Grouped Keywords");
    }

    // Main Keywords
    if (data.mainKeywords && data.mainKeywords.main_keywords) {
      const mainKeywordsWS = XLSX.utils.json_to_sheet(data.mainKeywords.main_keywords);
      XLSX.utils.book_append_sheet(workbook, mainKeywordsWS, "Main Keywords");
    }

    // Competitor Analysis
    if (data.competitorAnalysis && data.competitorAnalysis.competitors) {
      const competitorAnalysisWS = XLSX.utils.json_to_sheet(data.competitorAnalysis.competitors);
      XLSX.utils.book_append_sheet(workbook, competitorAnalysisWS, "Competitor Analysis");
    }

    // Content Strategy
    if (data.contentStrategy && data.contentStrategy.content_strategy) {
      const contentStrategyWS = XLSX.utils.json_to_sheet([{ strategy: data.contentStrategy.content_strategy }]);
      XLSX.utils.book_append_sheet(workbook, contentStrategyWS, "Content Strategy");
    }

    // Article Ideas
    if (data.articleIdeas && data.articleIdeas.article_ideas) {
      const articleIdeasWS = XLSX.utils.json_to_sheet(data.articleIdeas.article_ideas.map(idea => ({
        ...idea,
        "Estimated Engagement Metrics": JSON.stringify(idea["Estimated Engagement Metrics"]),
        "Outline": idea.Outline ? idea.Outline.join(", ") : ""
      })));
      XLSX.utils.book_append_sheet(workbook, articleIdeasWS, "Article Ideas");
    }

    // AI Generated Content
    if (data.aiGeneratedContent) {
      const aiContentWS = XLSX.utils.json_to_sheet(data.aiGeneratedContent.map(content => ({
        Title: content.title,
        Content: content.content.trim()
      })));
      XLSX.utils.book_append_sheet(workbook, aiContentWS, "AI Generated Content");
    }

    // Generate Excel file
    XLSX.writeFile(workbook, "SEO_Analysis_Results.xlsx");
  };

  const renderTopicUnderstanding = (understanding) => (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary">Topic Understanding</Typography>
        <Typography variant="h6" gutterBottom>{understanding.summary}</Typography>
        <Grid container spacing={2}>
          {Object.entries(understanding.details).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" color="secondary">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Typography>
                  <Typography variant="body1">{value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderKeywordAnalysis = (keywords) => (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label="keyword analysis table">
        <TableHead>
          <TableRow>
            <TableCell>Keyword</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Search Volume</TableCell>
            <TableCell align="right">CPC</TableCell>
            <TableCell align="right">Intent</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right">Competition</TableCell>
            <TableCell align="right">Trend</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keywords.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{row.Keyword}</TableCell>
              <TableCell align="right">{row.Type}</TableCell>
              <TableCell align="right">{row["Search Volume"]}</TableCell>
              <TableCell align="right">{row.CPC}</TableCell>
              <TableCell align="right">{row.Intent}</TableCell>
              <TableCell align="right">{row.Difficulty}</TableCell>
              <TableCell align="right">{row.Competition}</TableCell>
              <TableCell align="right">{row.Trend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderGroupedKeywords = (groupedKeywords) => {
    if (!groupedKeywords || !groupedKeywords.clusters) {
      return <Typography>No grouped keywords data available.</Typography>;
    }
    return (
      <Grid container spacing={3}>
        {groupedKeywords.clusters.map((cluster, index) => (
          <Grid item xs={12} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary">Cluster {index + 1}</Typography>
                <Typography variant="subtitle1">Search Intent: {cluster["Search Intent"]}</Typography>
                <Typography variant="subtitle1">Recommended Content: {cluster["Recommended Content"]}</Typography>
                <Typography variant="subtitle1">Keywords:</Typography>
                <List dense>
                  {cluster.Keywords.map((keyword, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary={keyword} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderMainKeywords = (mainKeywords) => {
    if (!mainKeywords || mainKeywords.length === 0) {
      return <Typography>No main keywords data available.</Typography>;
    }
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Keyword</TableCell>
              <TableCell>Search Volume</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Content Suggestion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mainKeywords.map((keyword, index) => (
              <TableRow key={index}>
                <TableCell>{keyword.keyword}</TableCell>
                <TableCell>{keyword.search_volume}</TableCell>
                <TableCell>{keyword.difficulty}</TableCell>
                <TableCell>{keyword.content_suggestion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getContentTypeIcon = (type) => {
    if (type.toLowerCase().includes('blog') || type.toLowerCase().includes('article')) return <ArticleIcon />;
    if (type.toLowerCase().includes('video')) return <VideoLibraryIcon />;
    if (type.toLowerCase().includes('image') || type.toLowerCase().includes('infographic')) return <ImageIcon />;
    return <ListAltIcon />;
  };

  const renderCompetitorAnalysis = (competitors) => {
    if (!competitors || competitors.length === 0) {
      return <Typography>No competitor analysis data available.</Typography>;
    }
    return (
      <Grid container spacing={3}>
        {competitors.map((competitor, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{competitor.name}</Typography>
                <Typography variant="body2" color="textSecondary">{competitor.website}</Typography>
                <Typography variant="subtitle1">Strengths:</Typography>
                <List dense>
                  {competitor.strengths.map((strength, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={strength} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle1">Weaknesses:</Typography>
                <List dense>
                  {competitor.weaknesses.map((weakness, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <ErrorOutlineIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={weakness} />
                    </ListItem>
                  ))}
                </List>
                {/* Add similar lists for opportunities and threats */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderContentStrategy = (strategy) => {
    const sections = strategy.split('\n\n');
    return (
      <Grid container spacing={3}>
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormatListBulletedIcon sx={{ mr: 1 }} />
                    {title.trim()}
                  </Typography>
                  <List dense>
                    {content.map((item, idx) => {
                      const [subTitle, description] = item.split(':');
                      return (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <ArticleIcon color="secondary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={subTitle.trim()} 
                            secondary={description ? description.trim() : null}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderArticleIdeas = (ideas, onDelete) => (
    <Grid container spacing={2}>
      {ideas.map((idea, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary">{idea.Title}</Typography>
              <Typography variant="body2" color="textSecondary">Target Audience: {idea["Target Audience"]}</Typography>
              <Typography variant="body2" color="textSecondary">Content Format: {idea["Content Format"]}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton onClick={() => onDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const handleEditContent = (index, content) => {
    setCurrentEditingIndex(index);
    const contentBlock = htmlToDraft(content.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  };

  const handleSaveContent = () => {
    if (currentEditingIndex !== null && result && result.aiGeneratedContent) {
      const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const updatedContent = [...result.aiGeneratedContent];
      updatedContent[currentEditingIndex].content = htmlContent;
      setResult({
        ...result,
        aiGeneratedContent: updatedContent
      });
      setCurrentEditingIndex(null);
    }
  };

  const renderAIGeneratedContent = (aiContent) => {
    if (!aiContent || aiContent.length === 0) {
      return <Typography>No AI-generated content available.</Typography>;
    }
    return (
      <Grid container spacing={3}>
        {aiContent.map((content, index) => (
          <Grid item xs={12} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" color="primary">AI-Generated Content {index + 1}</Typography>
                  <IconButton 
                    onClick={() => handleEditContent(index, content)}
                    color="primary"
                    aria-label="edit content"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                {currentEditingIndex === index ? (
                  <>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
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
                    <Button onClick={handleSaveContent} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>{content.title}</Typography>
                    <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-wrap' }}>
                      {content.content}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const handleDeleteArticleIdea = (index) => {
    setArticleIdeas(prevIdeas => prevIdeas.filter((_, i) => i !== index));
  };

  const renderResultContent = (result) => {
    if (!result) return null;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="SEMRush Keywords" />
            <Tab label="Main Keywords" />
            <Tab label="Grouped Keywords" />
            <Tab label="Competitor Keywords" />
            <Tab label="Competitor Content" />
            <Tab label="Custom Content Outline" />
            <Tab label="AI-Generated Content" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tabValue === 0 && renderKeywordAnalysis(result.keywords.keywords)}
          {tabValue === 1 && renderMainKeywords(result.mainKeywords?.main_keywords)}
          {tabValue === 2 && renderGroupedKeywords(result.groupedKeywords)}
          {tabValue === 3 && renderCompetitorKeywords(result.competitorKeywords)}
          {tabValue === 4 && renderCompetitorContent(result.competitorContent)}
          {tabValue === 5 && renderCustomContentOutline(result.customContentOutline)}
          {tabValue === 6 && renderAIGeneratedContent(result.aiGeneratedContent)}
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          SEO Automation Workflow
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label} completed={completedSteps.includes(step.label)}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
          </Box>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 3 }}>
        {activeStep >= 0 ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" align="center">
              {steps[activeStep]?.message || "Processing..."}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          </Paper>
        ) : error ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography color="error" align="center">{error}</Typography>
          </Paper>
        ) : result ? (
          renderResultContent(result)
        ) : (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography align="center">Analysis complete. No results to display.</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default UserAnalysisView;