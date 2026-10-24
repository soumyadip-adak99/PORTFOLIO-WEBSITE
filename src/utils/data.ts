import {
    Code2,
    GraduationCap,
    Briefcase,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";

import { SECURE_ASSETS } from "./secureAssets";

import {
    SkillCategory,
    StatItem,
    Project,
    JourneyStep,
    Passion,
    SocialLink,
    ContactInfo,
} from "../types";

export const SKILLS_CATEGORY: SkillCategory[] = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills: [
            { name: "React", level: 85, color: "bg-gradient-to-r from-orange-500 to-amber-400" },
            { name: "Tailwind CSS", level: 90, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
            { name: "TypeScript", level: 65, color: "bg-gradient-to-r from-orange-600 to-amber-400" },
            { name: "JavaScript / ES6+", level: 90, color: "bg-gradient-to-r from-amber-400 to-orange-500" },
        ],
    },

    {
        title: "Backend",
        icon: Server,
        description: "Building robust, scalable server-side solutions",
        skills: [
            { name: "Spring Boot", level: 90, color: "bg-gradient-to-r from-orange-500 to-amber-500" },
            { name: "REST APIs", level: 92, color: "bg-gradient-to-r from-amber-500 to-orange-400" },
            { name: "Node.js & Express", level: 75, color: "bg-gradient-to-r from-orange-600 to-amber-500" },
        ],
    },

    {
        title: "Database",
        icon: Database,
        description: "Designing high-performance data architectures",
        skills: [
            { name: "MongoDB", level: 85, color: "bg-gradient-to-r from-orange-500 to-amber-400" },
            { name: "MySQL", level: 75, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
            { name: "PostgreSQL", level: 70, color: "bg-gradient-to-r from-orange-600 to-amber-400" },
        ],
    },

    {
        title: "DevOps & Tools",
        icon: Cloud,
        description: "Streamlining deployment and version workflows",
        skills: [
            { name: "AWS Cloud", level: 80, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
            { name: "Docker", level: 80, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
            { name: "Git & GitHub", level: 95, color: "bg-gradient-to-r from-orange-500 to-amber-400" },
            { name: "Vercel & Cloudflare", level: 85, color: "bg-gradient-to-r from-orange-600 to-amber-500" },
        ],
    },
];

export const TECH_STACK: string[] = [
    "Java",
    "Python",
    "JavaScript",
    "Spring Boot",
    "NodeJS",
    "Express",
    "React",
    "HTML5",
    "CSS3",
    "MySQL",
    "MongoDB",
    "Redis",
    "AWS",
    "Docker",
    "RAG",
];

export const STATS: StatItem[] = [
    { number: "8+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
    { number: "100%", label: "Project Solution" },
];

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "CodeMind AI",
        subtitle: "AI-Ready Knowledge Base & RAG Engine for GitHub Repositories",
        description:
            "Architected a semantic codebase intelligence platform with Spring Boot 4, Spring AI, and PostgreSQL pgvector. Authenticates via GitHub OAuth2, crawls and chunks repository source code, computes high-dimensional vector embeddings, and enables natural-language RAG retrieval.",
        image: SECURE_ASSETS.BANNER_PROJECT,
        featured: true,
        category: "Full Stack",
        stackCategory: "Spring Boot & AI",
        techDetails: {
            backend: "Spring Boot 4.1, Java 21, Spring AI 2.0, Spring Security (OAuth2)",
            frontend: "Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4",
            database: "PostgreSQL 16 + pgvector (HNSW Indexing, Cosine Distance)",
            architecture: "OAuth2 Flow, TokenTextSplitter, Async ThreadPool, Vector Embeddings",
        },
        tags: ["Spring Boot", "Spring AI", "pgvector", "RAG", "Next.js", "Docker", "PostgreSQL", "GitHub API"],
        highlights: [
            "GitHub OAuth2 & Repository Sync Pipeline",
            "AST Code Chunker & Vector Embeddings",
            "pgvector Semantic Search with HNSW Cosine Indexing",
        ],
        flagshipMetrics: [
            "Spring Boot 4 & Spring AI",
            "PostgreSQL 16 & pgvector",
            "Next.js 16 & React 19 UI",
        ],
        liveUrl: "https://codemindai.vercel.app/",
        githubUrl: "https://github.com/soumyadip-adak99/CodeMind",
        status: "Production Live",
    },
    {
        id: 2,
        title: "CodeScribe AI",
        subtitle: "Full-Stack Publishing Platform with AI Quality Inspection",
        description:
            "Architected a scalable content platform with Spring Boot RESTful microservices and MongoDB persistence, paired with a reactive React frontend and automated AI analysis pipelines.",
        image: SECURE_ASSETS.PROJECT_1,
        featured: true,
        category: "Full Stack",
        stackCategory: "Java & Spring Boot",
        techDetails: {
            backend: "Spring Boot, Java 21, Spring Data",
            frontend: "React 19, Tailwind CSS, Vite",
            database: "MongoDB Atlas",
            architecture: "RESTful Microservices, JWT Auth, AI Analysis & RAG",
        },
        tags: ["Spring Boot", "React", "MongoDB", "AI Scanner", "RAG", "REST APIs"],
        highlights: ["Microservice Architecture", "Real-Time AI Inspection", "Document Persistence"],
        flagshipMetrics: [
            "Spring Boot Microservices",
            "MongoDB Atlas Document Store",
            "React 19 Reactive UI",
        ],
        liveUrl: "https://codescribeai.pages.dev",
        githubUrl: "https://github.com/soumyadip-adak99/codescribe-ai/",
        status: "Production Live",
    },
    {
        id: 3,
        title: "Background Remover Engine",
        subtitle: "Automated Image Segmentation & Blob Processing Service",
        description:
            "Engineered an image processing microservice in Java and Spring Boot with asynchronous image memory buffers, PostgreSQL relational tracking, and a fluid client interface.",
        image: SECURE_ASSETS.PROJECT_2,
        featured: true,
        category: "Full Stack",
        stackCategory: "Java & Spring Boot",
        techDetails: {
            backend: "Java, Spring Boot, Spring Security",
            frontend: "React, Tailwind CSS",
            database: "PostgreSQL",
            architecture: "Image Segmentation, Async Processing, Blob Handling",
        },
        tags: ["Java", "Spring Boot", "PostgreSQL", "Image Processing"],
        highlights: ["Relational Schema Design", "Async Processing", "High-Fidelity Output"],
        liveUrl: "",
        githubUrl: "https://github.com/soumyadip-adak99/Remove-image-background-spring-boot-project/",
        status: "Open Source",
    },
    {
        id: 4,
        title: "Nexus Commerce Platform",
        subtitle: "Full-Featured MERN Multi-Tier E-Commerce System",
        description:
            "Architected an e-commerce infrastructure with Express.js routing, MongoDB document models, JWT session authentication, and transactional shopping cart state management.",
        image: SECURE_ASSETS.PROJECT_6,
        featured: false,
        category: "Web App",
        stackCategory: "MERN Stack",
        techDetails: {
            backend: "Node.js, Express.js",
            frontend: "React, Tailwind CSS",
            database: "MongoDB",
            architecture: "Cart State Management, REST APIs, Token Authentication",
        },
        tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
        highlights: ["JWT Authentication", "Product Catalog", "Cart & Order Flow"],
        liveUrl: "",
        githubUrl: "https://github.com/soumyadip-adak99/mern-ecommerce-app",
        status: "Open Source",
    },
    {
        id: 5,
        title: "Medical AI Recommendation",
        subtitle: "Disease Triage & Doctor Recommendation Model",
        description:
            "Machine learning-assisted medical diagnosis and doctor recommendation system integrating Python Flask prediction endpoints with responsive clinical triage interfaces.",
        image: SECURE_ASSETS.PROJECT_3,
        featured: false,
        category: "AI & ML",
        stackCategory: "Python & AI",
        techDetails: {
            backend: "Python, Flask",
            frontend: "HTML5, CSS3, JavaScript",
            database: "Medical Knowledge Graph",
            architecture: "ML Classification Model, RESTful Inference API",
        },
        tags: ["Python", "Flask", "Machine Learning", "Healthcare AI"],
        highlights: ["Predictive ML Models", "Symptom Analysis", "Doctor Matching"],
        liveUrl: "",
        githubUrl: "https://github.com/MrPal28/medical-ai-recommendation?tab=readme-ov-file",
        status: "Research Model",
    },
    {
        id: 6,
        title: "FinanceFlow Wealth Engine",
        subtitle: "Real-Time Personal Analytics & Wealth Dashboard",
        description:
            "High-performance personal financial analytics web application featuring dynamic budget tracking, visual expenditure charts, and zero-latency reactive calculation engines.",
        image: SECURE_ASSETS.PROJECT_5,
        featured: false,
        category: "Web App",
        stackCategory: "React & Analytics",
        techDetails: {
            backend: "Client Analytics Engine",
            frontend: "React, JavaScript, Tailwind CSS",
            database: "Indexed Local Storage",
            architecture: "Reactive Compute, Metric Visualization",
        },
        tags: ["React", "Analytics", "JavaScript", "Tailwind CSS"],
        highlights: ["Real-Time Metrics", "Budget Forecasting", "Zero-Latency UI"],
        liveUrl: "https://financeflow-ebon.vercel.app/",
        githubUrl: "https://github.com/soumyadip-adak99/PERSONAL_EXPENSE_TRACKER",
        status: "Production Live",
    },
];

export const JOURNEY_STEPS: JourneyStep[] = [
    {
        year: "2023",
        title: "Started Coding Journey",
        company: "Self-taught & Foundations",
        description:
            "Started programming with Java, explored algorithms and problem solving, and began mastering modern web development with HTML, CSS, and JavaScript.",
        icon: Code2,
        color: "bg-gradient-to-br from-orange-500 to-amber-600",
    },
    {
        year: "2025",
        title: "First Internship",
        company: "SPARK IIT",
        description:
            "Joined as a Full Stack Developer intern, architecting solutions with React, Node.js, Express, and learning enterprise development best practices.",
        icon: Briefcase,
        color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
        year: "2026",
        title: "Bachelor of Computer Application Degree",
        company: "Institute of Engineering and Management",
        description:
            "Graduated with honors, specializing in scalable software engineering and cloud systems. Spearheaded multiple high-impact web initiatives.",
        icon: GraduationCap,
        color: "bg-gradient-to-br from-orange-600 to-amber-700",
    },
    {
        year: "Present",
        title: "Innovation & Full Stack Engineering",
        company: "Independent Projects & Open Source",
        description:
            "Architecting full-stack applications with Spring Boot, React, and AI integrations, pushing boundaries with clean UI/UX and high-performance backends.",
        icon: Zap,
        color: "bg-gradient-to-br from-amber-400 to-orange-500",
    },
];

export const PASSIONS: Passion[] = [
    {
        icon: Heart,
        title: "User Experience",
        description: "Crafting intuitive, silky smooth interfaces that users fall in love with",
    },
    {
        icon: Coffee,
        title: "Problem Solving",
        description: "Turning complex architectural challenges into elegant, maintainable solutions",
    },
    {
        icon: BookOpen,
        title: "Continuous Innovation",
        description: "Constantly exploring new tech stacks, performance patterns, and modern design",
    },
];

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/soumyadip-adak99",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
    {
        name: "Twitter",
        icon: FiTwitter,
        url: "https://twitter.com",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:work.soumyadipadak@gmail.com",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
    {
        name: "Facebook",
        icon: FiFacebook,
        url: "https://www.facebook.com/soumyadip.adak.99",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
    {
        name: "Instagram",
        icon: FiInstagram,
        url: "https://www.instagram.com/soumyadip_adak8888/",
        color: "hover:text-orange-400",
        bgColor: "hover:bg-orange-500/10",
    },
];

export const CONTACT_INFO: ContactInfo[] = [
    {
        icon: MapPin,
        label: "Location",
        value: "West Bengal, India",
    },
    {
        icon: Mail,
        label: "Email",
        value: "work.soumyadipadak@gmail.com",
    },
];
