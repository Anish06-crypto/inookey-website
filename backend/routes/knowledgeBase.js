import express from 'express';

const router = express.Router();

// Inookey knowledge base data
const KNOWLEDGE_BASE = {
  services: {
    "custom-software": {
      title: "Custom Software Development",
      description: "We build intelligent, scalable applications tailored to your business needs.",
      details: [
        "AI-powered applications",
        "Workflow automation systems", 
        "Scalable web and mobile apps",
        "Integration with existing systems"
      ],
      technologies: ["React", "Node.js", "Python", "AWS", "Docker"],
      timeline: "30 days",
      pricing: "Custom quotes based on scope"
    },
    "ai-integration": {
      title: "AI Integration",
      description: "Seamlessly integrate AI capabilities into your existing systems.",
      details: [
        "Machine learning implementation",
        "Natural language processing",
        "Computer vision applications",
        "Predictive analytics"
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
      timeline: "30 days",
      pricing: "Custom quotes based on scope"
    },
    "process-automation": {
      title: "Process Automation",
      description: "Optimize your business processes with intelligent automation.",
      details: [
        "Business process optimization",
        "Workflow automation",
        "Data processing pipelines",
        "Custom automation solutions"
      ],
      technologies: ["Python", "Node.js", "Zapier", "AWS Lambda"],
      timeline: "30 days",
      pricing: "Custom quotes based on scope"
    },
    "consulting": {
      title: "Consulting & Strategy",
      description: "Expert guidance for your digital transformation journey.",
      details: [
        "Technology consulting",
        "Digital transformation",
        "AI strategy development",
        "Technical architecture planning"
      ],
      technologies: ["Architecture Design", "Strategy Planning", "Technology Assessment"],
      timeline: "Ongoing",
      pricing: "Hourly rates or project-based"
    }
  },
  process: {
    steps: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "We discuss your project requirements, timeline, and budget.",
        duration: "1-2 hours"
      },
      {
        step: 2,
        title: "Project Planning",
        description: "Detailed architecture design and project roadmap creation.",
        duration: "1-2 days"
      },
      {
        step: 3,
        title: "Development",
        description: "Agile development with regular updates and feedback loops.",
        duration: "30 days"
      },
      {
        step: 4,
        title: "Testing & Deployment",
        description: "Comprehensive testing and production deployment.",
        duration: "1-2 days"
      },
      {
        step: 5,
        title: "Support & Maintenance",
        description: "Ongoing support, updates, and maintenance services.",
        duration: "Ongoing"
      }
    ],
    timeline: "30 days for most projects",
    methodology: "Agile with daily standups and weekly demos"
  },
  pricing: {
    model: "Value-based pricing",
    factors: [
      "Project complexity and scope",
      "Technology requirements",
      "Timeline and urgency",
      "Ongoing support needs"
    ],
    examples: {
      "simple-web-app": "Starting at $15,000",
      "ai-integration": "Starting at $25,000",
      "enterprise-solution": "Starting at $50,000",
      "consulting": "$150/hour"
    }
  },
  technologies: {
    frontend: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"],
    backend: ["Node.js", "Python", "Java", ".NET", "Go"],
    ai_ml: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn"],
    cloud: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"],
    devops: ["Docker", "Kubernetes", "CI/CD", "Terraform", "Ansible"]
  },
  faq: [
    {
      question: "How long does development take?",
      answer: "Most projects are delivered in 30 days. Complex enterprise solutions may take longer, but we always provide clear timelines upfront."
    },
    {
      question: "What's your development process?",
      answer: "We follow an agile methodology with daily standups, weekly demos, and continuous feedback. Our 5-step process ensures quality and transparency."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer comprehensive support and maintenance packages to ensure your application continues to perform optimally after launch."
    },
    {
      question: "Can you work with our existing tech stack?",
      answer: "Absolutely! We're technology-agnostic and can work with your existing systems. We'll recommend the best approach for your specific needs."
    },
    {
      question: "How do you ensure quality?",
      answer: "We follow industry best practices including comprehensive testing, code reviews, and continuous integration. Every project includes QA testing before delivery."
    },
    {
      question: "What if I need changes after launch?",
      answer: "We offer flexible maintenance packages and can accommodate changes and updates. We're here to support your growth and evolution."
    }
  ]
};

// Get all knowledge base data
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: KNOWLEDGE_BASE
    });
  } catch (error) {
    console.error('❌ Error fetching knowledge base:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch knowledge base'
    });
  }
});

// Get services information
router.get('/services', async (req, res) => {
  try {
    res.json({
      success: true,
      services: KNOWLEDGE_BASE.services
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// Get specific service information
router.get('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = KNOWLEDGE_BASE.services[serviceId];

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('❌ Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service'
    });
  }
});

// Get development process
router.get('/process', async (req, res) => {
  try {
    res.json({
      success: true,
      process: KNOWLEDGE_BASE.process
    });
  } catch (error) {
    console.error('❌ Error fetching process:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch process'
    });
  }
});

// Get pricing information
router.get('/pricing', async (req, res) => {
  try {
    res.json({
      success: true,
      pricing: KNOWLEDGE_BASE.pricing
    });
  } catch (error) {
    console.error('❌ Error fetching pricing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing'
    });
  }
});

// Get technologies
router.get('/technologies', async (req, res) => {
  try {
    res.json({
      success: true,
      technologies: KNOWLEDGE_BASE.technologies
    });
  } catch (error) {
    console.error('❌ Error fetching technologies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch technologies'
    });
  }
});

// Get FAQ
router.get('/faq', async (req, res) => {
  try {
    res.json({
      success: true,
      faq: KNOWLEDGE_BASE.faq
    });
  } catch (error) {
    console.error('❌ Error fetching FAQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQ'
    });
  }
});

// Search knowledge base
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const results = [];
    const searchTerm = query.toLowerCase();

    // Search in services
    Object.entries(KNOWLEDGE_BASE.services).forEach(([id, service]) => {
      if (
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.details.some(detail => detail.toLowerCase().includes(searchTerm))
      ) {
        results.push({
          type: 'service',
          id,
          title: service.title,
          description: service.description,
          match: 'service'
        });
      }
    });

    // Search in FAQ
    KNOWLEDGE_BASE.faq.forEach((item, index) => {
      if (
        item.question.toLowerCase().includes(searchTerm) ||
        item.answer.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'faq',
          id: index,
          title: item.question,
          description: item.answer,
          match: 'faq'
        });
      }
    });

    res.json({
      success: true,
      query,
      results,
      total: results.length
    });

  } catch (error) {
    console.error('❌ Error searching knowledge base:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search knowledge base'
    });
  }
});

// Get AI assistant context
router.get('/ai-context', async (req, res) => {
  try {
    const context = {
      company: {
        name: "Inookey",
        description: "We build thinking systems and intelligent software",
        tagline: "We Don't Just Build Software — We Build Thinking Systems",
        delivery: "30 days",
        focus: "AI integration, workflow automation, and scalable applications"
      },
      services: Object.values(KNOWLEDGE_BASE.services).map(service => ({
        title: service.title,
        description: service.description,
        timeline: service.timeline,
        pricing: service.pricing
      })),
      process: KNOWLEDGE_BASE.process,
      technologies: KNOWLEDGE_BASE.technologies,
      faq: KNOWLEDGE_BASE.faq
    };

    res.json({
      success: true,
      context
    });

  } catch (error) {
    console.error('❌ Error fetching AI context:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI context'
    });
  }
});

export default router; 