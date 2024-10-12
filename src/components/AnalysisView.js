import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, Stepper, Step, StepLabel, CircularProgress, LinearProgress,
  Grid, Card, CardContent, List, ListItem, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails,
  Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemIcon, Tabs, Tab
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

const steps = [
  { label: 'Enter Niche/Business Type', message: 'Analyzing your niche and business type.' },
  { label: 'Analyze Initial SEO Request', message: 'Analyzing the initial SEO request.' }, // New step
  { label: 'SEMRush Keyword Research', message: 'Conducting keyword research using SEMRush.' },
  { label: 'Identify Main Keywords', message: 'Identifying the most important keywords for your niche.' },
  { label: 'Group Similar Keywords', message: 'Grouping related keywords together.' },
  { label: 'Competitor Keyword Analysis', message: 'Analyzing competitor keywords.' },
  { label: 'Competitor Content Analysis', message: 'Analyzing competitor content strategies.' },
  { label: 'Generate Content Strategy', message: 'Creating a tailored content strategy.' },
  { label: 'Generate Article Ideas', message: 'Generating article ideas based on the analysis.' },
  { label: 'Generate AI Content', message: 'Creating AI-generated content based on the strategy.' },
  { label: 'Export to Excel', message: 'Exporting results to Excel format.' }
];

const mockData = {
  understanding: {
    summary: "Optimize an e-commerce site for handmade jewelry to compete with larger retailers and capture the growing market of eco-conscious consumers seeking unique, sustainable accessories.",
    details: {
      audience_characteristics: "Eco-conscious consumers, aged 25-40, primarily urban professionals with disposable income, interested in unique and sustainable fashion",
      main_topic: "Handmade jewelry e-commerce SEO optimization",
      seo_objectives: "Increase organic visibility by 50%, focus on long-tail keywords related to sustainable and artisanal jewelry, enhance user engagement with interactive content",
      content_opportunities: "Blog posts on sustainable materials, video tutorials on jewelry care, artisan spotlights, user-generated content campaigns",
      potential_gaps: "In-depth education on sustainable jewelry practices, transparency in sourcing and production, virtual try-on experiences"
    }
  },
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
  competitorAnalysis: {
    competitors: [
      {
        name: "Brilliant Earth",
        website: "www.brilliantearth.com",
        strengths: [
          "Strong focus on ethically sourced diamonds and sustainable materials",
          "Customization options with a broad selection of engagement rings",
          "Strong educational content on sourcing and ethical practices"
        ],
        weaknesses: [
          "Higher price point compared to traditional jewelers",
          "Limited variety of non-diamond jewelry",
          "Occasional delays in shipping due to customization"
        ]
      },
      {
        name: "Ana Luisa",
        website: "www.analuisa.com",
        strengths: [
          "Affordable pricing for sustainable jewelry",
          "Stylish and trendy designs appealing to a younger demographic",
          "Carbon-neutral certified operations"
        ],
        weaknesses: [
          "Limited fine jewelry collection",
          "Focus mainly on gold-plated jewelry rather than solid gold",
          "Limited customization options for customers"
        ]
      },
      {
        name: "Soko",
        website: "www.shopsoko.com",
        strengths: [
          "Unique handcrafted pieces made by artisans in Kenya",
          "Strong emphasis on ethical production and empowering local communities",
          "Modern, minimalist designs that appeal to a wide audience"
        ],
        weaknesses: [
          "Limited high-end luxury pieces",
          "Smaller collection compared to larger brands",
          "Longer shipping times for international orders due to artisan production"
        ]
      }
    ]
  },
  contentStrategy: {
    content_strategy: `
1. Blog Content:
   - Sustainable Jewelry Series: Monthly posts exploring different eco-friendly materials and practices.
   - Artisan Spotlights: Bi-weekly features on individual jewelry makers, their techniques, and inspirations.
   - Jewelry Care Guides: Quarterly in-depth guides on maintaining and caring for handmade jewelry.
   - Trend Reports: Seasonal posts on upcoming jewelry trends with a focus on sustainable and ethical options.

2. Video Content:
   - "From Raw to Refined" Series: Monthly videos showcasing the journey of materials from source to final product.
   - Tutorial Tuesdays: Weekly short-form videos on DIY jewelry care, styling tips, and basic craft techniques.
   - Virtual Studio Tours: Quarterly long-form videos exploring different artisan workshops and production methods.

3. Social Media Strategy:
   - Instagram: Daily posts alternating between product showcases, behind-the-scenes content, and customer features. Use Stories for real-time craft demonstrations and Q&A sessions.
   - Pinterest: Create boards for different jewelry styles, sustainable materials, and DIY projects. Pin all blog content and expand reach through infographics.
   - Facebook: Share blog posts, video content, and create events for virtual trunk shows or artisan meet-and-greets.

4. Email Marketing:
   - Welcome Series: 4-part email series introducing new subscribers to the brand ethos, sustainable practices, and product range.
   - Monthly Newsletter: Curated content including latest blog posts, featured products, and exclusive subscriber discounts.
   - Seasonal Campaigns: Targeted emails for major gifting seasons (Valentine's Day, Mother's Day, Christmas) focusing on sustainable gift options.

5. Interactive Content:
   - Sustainability Quiz: Help customers understand their impact and find products that align with their values.
   - Virtual Try-On Feature: Implement AR technology allowing customers to visualize jewelry pieces.
   - Design Your Own: Interactive tool for customers to experiment with custom designs.

6. User-Generated Content:
   - #WearYourValues Campaign: Encourage customers to share photos wearing their sustainable jewelry, explaining what it means to them.
   - Customer Story Highlights: Regular features on the website and social media showcasing real customer experiences and their jewelry's significance.

7. Partnerships and Collaborations:
   - Influencer Partnerships: Collaborate with eco-conscious influencers for authentic product showcases and education on sustainable jewelry.
   - Artisan Takeovers: Allow featured artisans to take over social media accounts for a day, sharing their process and answering customer questions.

8. Educational Content:
   - Gemstone Encyclopedia: Comprehensive guide to gemstones, their properties, and ethical sourcing practices.
   - Sustainability Glossary: Detailed explanations of terms related to ethical and sustainable jewelry production.
   - Jewelry History Series: Blog posts exploring the cultural significance of jewelry across different civilizations, linking to current sustainable practices.

9. SEO Optimization:
   - Optimize all content for identified key terms, especially long-tail keywords related to sustainable and handmade jewelry.
   - Create pillar pages for main topics like "Sustainable Jewelry Materials" and "Custom Jewelry Design Process".
   - Implement schema markup for products, reviews, and FAQs to enhance search appearance.

10. Measurement and Optimization:
    - Set up tracking for all content performance, including engagement rates, conversion rates, and SEO rankings.
    - Conduct quarterly content audits to identify top-performing pieces and areas for improvement.
    - Use A/B testing for email subject lines, social media post formats, and blog titles to continually refine strategy.
    `
  },
  articleIdeas: {
    article_ideas: [
      {
        "Title": "10 Sustainable Materials Revolutionizing Handmade Jewelry",
        "Target Audience": "Eco-conscious shoppers, jewelry enthusiasts",
        "Content Format": "Long-form Blog Post with Infographic",
        "Estimated Engagement Metrics": {
          "Pageviews": "5000-7000",
          "Average Time on Page": "4:30 minutes",
          "Social Shares": "500-700"
        },
        "Outline": [
          "Introduction: The rise of sustainable jewelry",
          "1. Recycled Metals: Giving new life to gold and silver",
          "2. Fairmined Gold: Supporting ethical mining practices",
          "3. Lab-Created Gemstones: Ethical alternatives to mined stones",
          "4. Reclaimed Wood: Upcycling for unique accents",
          "5. Vegan Leather: Plant-based alternatives for jewelry components",
          "6. Tagua Nut: The 'vegetable ivory' revolution",
          "7. Recycled Glass: From bottles to beautiful beads",
          "8. Bamboo: Sustainable and versatile",
          "9. Eco-Resin: Plant-based alternatives to traditional resins",
          "10. Upcycled Fabrics: Transforming textile waste into wearable art",
          "Conclusion: Embracing sustainability in jewelry choices"
        ]
      },
      {
        "Title": "The Art of Custom Jewelry Design: From Concept to Creation",
        "Target Audience": "Custom jewelry seekers, design enthusiasts",
        "Content Format": "Video Series (5 episodes) + Accompanying Blog Posts",
        "Estimated Engagement Metrics": {
          "Video Views": "10000-15000 per episode",
          "Blog Pageviews": "3000-5000 per post",
          "Comments": "50-75 per post"
        },
        "Outline": [
          "Episode 1: The Initial Consultation - Bringing your vision to life",
          "Episode 2: Material Selection - Choosing the perfect elements for your piece",
          "Episode 3: The Design Process - From sketches to 3D modeling",
          "Episode 4: Crafting the Piece - A behind-the-scenes look at the jewelry-making process",
          "Episode 5: The Final Reveal - Presenting the finished custom piece"
        ]
      },
      {
        "Title": "Ethical Jewelry: How to Ensure Your Accessories Have a Positive Impact",
        "Target Audience": "Ethical consumers, socially conscious shoppers",
        "Content Format": "Interactive Infographic + In-depth Blog Post",
        "Estimated Engagement Metrics": {
          "Pageviews": "4000-6000",
          "Average Time on Page": "5:00 minutes",
          "Social Shares": "400-600"
        },
        "Outline": [
          "Introduction: The importance of ethical jewelry",
          "1. Understanding Ethical Jewelry: Key principles and practices",
          "2. Tracing the Supply Chain: From mine to market",
          "3. Certifications to Look For: Fairtrade, RJC, B Corp explained",
          "4. The Human Impact: Supporting artisans and communities",
          "5. Environmental Considerations: Minimizing ecological footprint",
          "6. Transparency in the Industry: How brands are embracing openness",
          "7. Making Informed Choices: A consumer's guide to buying ethical jewelry",
          "Conclusion: The future of ethical jewelry"
        ]
      },
      {
        "Title": "Handmade vs. Mass-Produced Jewelry: Understanding the Value Difference",
        "Target Audience": "General jewelry buyers, quality-conscious consumers",
        "Content Format": "Comparative Blog Post with Visual Aids",
        "Estimated Engagement Metrics": {
          "Pageviews": "6000-8000",
          "Average Time on Page": "3:30 minutes",
          "Social Shares": "600-800"
        },
        "Outline": [
          "Introduction: The resurgence of handmade jewelry in a mass-produced world",
          "1. Craftsmanship and Quality: The human touch vs. machine precision",
          "2. Materials and Sourcing: Small-batch vs. large-scale procurement",
          "3. Design and Uniqueness: One-of-a-kind pieces vs. replicated designs",
          "4. Production Processes: Artisanal techniques vs. industrial manufacturing",
          "5. Environmental Impact: Comparing ecological footprints",
          "6. Price Points: Understanding the cost factors",
          "7. Emotional Value: The story behind handmade pieces",
          "8. Longevity and Durability: Comparing wear and tear",
          "Conclusion: Making an informed choice for your jewelry purchase"
        ]
      },
      {
        "Title": "The Global Journey of a Handmade Necklace: From Artisan's Hands to Your Jewelry Box",
        "Target Audience": "Conscious consumers, travel enthusiasts, jewelry lovers",
        "Content Format": "Interactive Storytelling Piece with Maps and Videos",
        "Estimated Engagement Metrics": {
          "Pageviews": "8000-10000",
          "Average Time on Page": "6:00 minutes",
          "Social Shares": "800-1000"
        },
        "Outline": [
          "Introduction: Meet the artisan - A silversmith in Bali",
          "1. Sourcing Raw Materials: The story of ethical silver mining",
          "2. Design Inspiration: How local culture influences jewelry design",
          "3. The Crafting Process: Traditional techniques in the modern world",
          "4. Quality Control: Ensuring excellence in every piece",
          "5. The Journey Begins: From workshop to global markets",
          "6. Ethical Transportation: Minimizing carbon footprint in shipping",
          "7. Reaching the Customer: The role of e-commerce in artisan jewelry",
          "8. The Unboxing Experience: Sustainable packaging and presentation",
          "Conclusion: The global impact of choosing handmade"
        ]
      }
    ]
  },
  aiGeneratedContent: [
    {
      title: "The Renaissance of Handmade Jewelry in the Digital Age",
      content: `Introduction: In an era dominated by mass production and fast fashion, the world of handmade jewelry is experiencing a remarkable renaissance. This resurgence is not just a nostalgic return to traditional craftsmanship; it's a movement powered by conscious consumerism, technological advancements, and a growing appreciation for unique, sustainable luxury.

Outline:

I. The Uniqueness of Handmade Jewelry
II. Sustainability and Ethical Sourcing
III. The Role of Technology in Promoting Craftsmanship
IV. Personalization and Emotional Connection
V. Storytelling and Transparency
VI. Supporting Local Artisans and Communities
VII. Looking Ahead: The Future of Handmade Jewelry

I. The Uniqueness of Handmade Jewelry: The appeal of handmade jewelry lies in its inherent uniqueness. In a world where individuality is increasingly valued, wearing a piece of jewelry crafted by human hands offers a sense of distinction that mass-produced items simply cannot match. Each handmade piece tells a story – of the artisan's skill, the origin of materials, and the cultural heritage often embedded in design motifs.

II. Sustainability and Ethical Sourcing: Sustainability is another driving force behind the handmade jewelry comeback. As consumers become more environmentally conscious, they are turning to artisanal jewelers who often use ethically sourced, recycled, or upcycled materials. This shift not only reduces the environmental impact but also adds an extra layer of meaning to each piece.

III. The Role of Technology in Promoting Craftsmanship: The digital revolution, far from hindering traditional craftsmanship, has actually propelled it forward. Online marketplaces and social media platforms have given independent jewelers unprecedented access to global audiences. Platforms like Etsy, Instagram, and Pinterest have become virtual galleries where artisans can showcase their work, share their processes, and connect directly with customers who value their craft.

Moreover, technology has enhanced the creation process itself. While traditional techniques remain at the core, many artisans are incorporating modern tools like 3D printing for prototyping or laser cutting for precision work. This fusion of old-world craftsmanship with new-world technology is resulting in innovative designs that push the boundaries of what's possible in handmade jewelry.

IV. Personalization and Emotional Connection: The personalization trend has further boosted the appeal of handmade jewelry. Many artisans offer custom-made pieces, allowing customers to be part of the creative process. This level of involvement creates a deeper emotional connection to the jewelry, making it more than just an accessory, but a cherished keepsake.

V. Storytelling and Transparency: Education plays a crucial role in this renaissance. Artisans are not just selling products; they're sharing knowledge about their craft, the materials they use, and the cultural significance of their designs. This transparency and storytelling add value to handmade pieces, justifying higher price points compared to mass-produced alternatives.

VI. Supporting Local Artisans and Communities: The handmade jewelry movement also aligns with the growing interest in supporting small businesses and local economies. Purchasing from independent jewelers often means supporting families and communities, creating a positive social impact that resonates with socially conscious consumers.

VII. Looking Ahead: The Future of Handmade Jewelry: Looking ahead, the future of handmade jewelry seems bright. As consumers continue to seek out unique, sustainable, and meaningful products, artisanal jewelers are well-positioned to meet this demand. The challenge will be in scaling their businesses while maintaining the essence of handcrafted quality.

Conclusion: In conclusion, the renaissance of handmade jewelry in the digital age represents a harmonious blend of tradition and innovation. It's a testament to the enduring appeal of human craftsmanship and the power of conscious consumerism. As we move forward, handmade jewelry stands not just as a category of accessories, but as a movement that celebrates individuality, sustainability, and the timeless art of creating beauty by hand.`
    },
    {
      title: "Sustainable Luxury: The Future of Ethical Jewelry",
      content: `
The concept of luxury is undergoing a profound transformation in the jewelry industry. No longer solely defined by rarity and craftsmanship, true luxury now encompasses ethical sourcing, sustainable practices, and transparent supply chains. This shift towards "sustainable luxury" is reshaping the future of jewelry, driven by a new generation of conscious consumers who demand both exquisite craftsmanship and ethical integrity.

Outline:

I. Redefining Luxury: Beyond Rarity and Craftsmanship
II. Ethical Sourcing: Lab-Grown Diamonds and Recycled Metals
III. Transparency and Blockchain Technology in the Supply Chain
IV. Innovations in Eco-Friendly Jewelry Design
V. Customization, Waste Reduction, and Circular Economy Models
VI. The Role of Education and Consumer Awareness
VII. Challenges and the Future of Sustainable Luxury

I. Redefining Luxury: Beyond Rarity and Craftsmanship: At the heart of this movement is a reimagining of what makes jewelry valuable. While traditional factors like rarity and craftsmanship still play a role, the story behind each piece – its origin, impact, and purpose – has become equally important. Consumers are increasingly seeking jewelry that not only adorns but also aligns with their values and contributes positively to the world.

II. Ethical Sourcing: Lab-Grown Diamonds and Recycled Metals: One of the most significant developments in ethical jewelry is the sourcing of materials. Mining, particularly for diamonds and gold, has long been associated with environmental degradation and human rights abuses. In response, jewelers are turning to alternative sources. Lab-grown diamonds, for instance, offer a sustainable alternative to mined stones, with the added benefit of being chemically and visually identical to natural diamonds. Similarly, recycled gold and silver are becoming staples in ethical jewelry collections, reducing the demand for newly mined metals.

Gemstone sourcing is also evolving. Ethical jewelers are establishing direct relationships with small-scale miners, ensuring fair wages and safe working conditions. Some are even going a step further by investing in the communities where these gems are sourced, supporting education, healthcare, and local infrastructure projects.

III. Transparency and Blockchain Technology in the Supply Chain: Transparency has become a key differentiator in the luxury jewelry market. Brands are leveraging technology like blockchain to provide customers with comprehensive information about their jewelry's journey from source to store. This level of transparency not only builds trust but also educates consumers about the complexities and value of truly ethical jewelry.

IV. Innovations in Eco-Friendly Jewelry Design: The rise of sustainable luxury has also sparked innovation in jewelry design. Designers are experimenting with unconventional, eco-friendly materials like recycled plastics, sustainable wood, and even agricultural byproducts. These materials are being transformed into stunning pieces that challenge traditional notions of what constitutes "precious" in jewelry.

V. Customization, Waste Reduction, and Circular Economy Models: Customization and made-to-order models are gaining traction in ethical jewelry. This approach not only allows for personalization but also reduces waste by eliminating excess inventory. Some brands are even exploring rental and buyback programs, embracing the circular economy model and extending the lifecycle of luxury pieces.

VI. The Role of Education and Consumer Awareness: Education plays a crucial role in the sustainable luxury movement. Ethical jewelers are not just selling products; they're sharing knowledge about responsible sourcing, traditional craftsmanship, and the cultural significance of jewelry. This educational approach transforms the purchase of a piece of jewelry into an enlightening experience, adding depth to the concept of luxury.

VII. Challenges and the Future of Sustainable Luxury: The shift towards sustainable luxury is also influencing larger, established jewelry houses. Many are reevaluating their practices and introducing ethical lines, recognizing that sustainability is not just a trend but a fundamental change in consumer expectations.

However, challenges remain. Ensuring the authenticity of ethical claims, scaling sustainable practices, and balancing higher production costs with market expectations are ongoing issues. The industry is also grappling with how to make ethical jewelry more accessible without compromising on quality or fair labor practices.

Conclusion: Looking to the future, the trajectory of ethical jewelry seems clear. As consumers become more informed and conscientious, the demand for sustainable luxury will only grow. This shift is not just changing what we wear; it's redefining the very essence of luxury in the modern world.

In conclusion, sustainable luxury in jewelry represents a harmonious blend of ethics, aesthetics, and innovation. It's a movement that honors the earth's resources, respects human dignity, and celebrates the artistry of jewelry making. As this sector continues to evolve, it promises to bring forth a new era where luxury is defined not by exclusivity and expense alone, but by responsibility, transparency, and positive impact.`
    },
    {
      title: "The Art of Storytelling in Jewelry: Crafting Narratives Through Design",
      content: `Introduction: In the world of jewelry, each piece has the potential to be more than just an accessory – it can be a story, a memory, or a statement. The art of storytelling through jewelry design is an ancient practice that has found new relevance in today's market, where consumers are increasingly seeking products with meaning and personal significance. This approach to jewelry creation goes beyond aesthetics, infusing each piece with narrative elements that resonate on a deeper, emotional level.

Outline:

I. The Historical Roots of Storytelling in Jewelry
II. Symbolism and Meaning: Beyond Aesthetics
III. Customization: A Personal Narrative
IV. Cultural Heritage and Jewelry Design
V. Emotional Connection: Jewelry as a Keepsake
VI. Modern-Day Storytelling through Design
VII. The Role of Technology in Crafting Narratives

I. The Historical Roots of Storytelling in Jewelry: Historically, jewelry has always been imbued with meaning. From ancient Egyptian amulets to Victorian mourning jewelry, pieces have long been created to commemorate events, symbolize beliefs, or communicate status. Each culture has used jewelry to tell its own unique stories, and today's designers continue to draw inspiration from these rich traditions.

II. Symbolism and Meaning: Beyond Aesthetics: In contemporary jewelry, the importance of symbolism has grown significantly. Designers are crafting pieces that go beyond mere ornamentation, embedding them with layers of meaning. Whether it's a ring symbolizing commitment, a necklace representing protection, or a bracelet marking a milestone, each piece of jewelry can carry a powerful narrative that resonates with its wearer.

III. Customization: A Personal Narrative: One of the most prominent trends in jewelry today is customization. By allowing customers to participate in the design process, jewelers are able to create pieces that reflect personal stories, milestones, and emotions. This level of customization transforms jewelry into a deeply personal narrative that customers can carry with them for a lifetime.

IV. Cultural Heritage and Jewelry Design: Many modern-day artisans are drawing on their cultural heritage to infuse their designs with traditional motifs and stories. Whether it's incorporating ancient symbols, materials, or techniques, these designers are using jewelry as a way to preserve and celebrate their cultural identity. This blend of the old and the new allows consumers to wear pieces that are not only beautiful but also deeply meaningful.

V. Emotional Connection: Jewelry as a Keepsake: Jewelry has long been associated with memory and sentimentality. Whether it's a locket containing a loved one's photo or a charm bracelet commemorating life's milestones, these pieces often hold significant emotional value. Designers are increasingly recognizing the importance of this emotional connection and are creating jewelry that is meant to be cherished and passed down through generations.

VI. Modern-Day Storytelling through Design: In the modern jewelry landscape, storytelling has become an essential part of the design process. Jewelers are crafting pieces that reflect contemporary themes such as love, empowerment, and social justice. These narratives not only resonate with consumers on a personal level but also make powerful statements about the world we live in.

VII. The Role of Technology in Crafting Narratives: Technology has also played a key role in expanding the possibilities of storytelling in jewelry design. Techniques like 3D printing and laser engraving allow for intricate details and personalization that were once impossible. Digital platforms have enabled jewelers to share the stories behind their creations more easily, reaching a global audience and creating deeper connections with consumers.

Conclusion: In conclusion, the art of storytelling in jewelry has evolved to meet the needs of today's consumers, who are seeking pieces that go beyond beauty and functionality. Jewelry has become a medium for expressing personal narratives, cultural identity, and emotional connections. As artisans continue to blend tradition with innovation, the future of jewelry design will likely see even more creative and meaningful expressions of storytelling through this timeless art form.`
    }
  ]
};

function AnalysisView() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [articleIdeas, setArticleIdeas] = useState(mockData.articleIdeas.article_ideas);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const simulateAnalysis = () => {
    setActiveStep(0);
    setProgress(0);
    setCompletedSteps([]);

    // Set a random total time between 120000ms (2 minutes) and 180000ms (3 minutes)
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

    // Topic Understanding
    if (data.understanding && data.understanding.details) {
      const understandingWS = XLSX.utils.json_to_sheet([
        { ...data.understanding.details, summary: data.understanding.summary }
      ]);
      XLSX.utils.book_append_sheet(workbook, understandingWS, "Topic Understanding");
    }

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
                <Typography variant="h6" gutterBottom>{content.title}</Typography>
                <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-wrap' }}>
                  {content.content}
                </Typography>
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

  const handleEditContent = (index, content) => {
    // Navigate to the EditContent page with the content data
    navigate(`/edit-content/${index}`, { state: { content: content.content, title: content.title } });
  };

  const renderResultContent = (result) => {
    if (!result) return null;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Topic Understanding" />
            <Tab label="Keyword Analysis" />
            <Tab label="Grouped Keywords" />
            <Tab label="Main Keywords" />
            <Tab label="Competitor Analysis" />
            <Tab label="Content Strategy" />
            <Tab label="Article Ideas" />
            <Tab label="AI-Generated Content" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tabValue === 0 && renderTopicUnderstanding(result.understanding)}
          {tabValue === 1 && renderKeywordAnalysis(result.keywords.keywords)}
          {tabValue === 2 && renderGroupedKeywords(result.groupedKeywords)}
          {tabValue === 3 && renderMainKeywords(result.mainKeywords?.main_keywords)}
          {tabValue === 4 && renderCompetitorAnalysis(result.competitorAnalysis?.competitors)}
          {tabValue === 5 && renderContentStrategy(result.contentStrategy?.content_strategy)}
          {tabValue === 6 && renderArticleIdeas(articleIdeas, handleDeleteArticleIdea)}
          {tabValue === 7 && renderAIGeneratedContent(result.aiGeneratedContent)}
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

export default AnalysisView;