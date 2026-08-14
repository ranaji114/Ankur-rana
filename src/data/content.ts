export type SocialLink = {
  label: string;
  href: string;
  platform: "instagram" | "facebook" | "github" | "linkedin";
};

export const author = {
  name: "Ankur Rana",
  role: "AI-Assisted Developer · Programmer · Author · Independent Researcher",
  roleShort: "Developer · Author · Researcher",
  email: "ranaankur442@gmail.com",
  githubUrl: "https://github.com/ranaji114",
  linkedinUrl: "https://www.linkedin.com/in/ankur-rana-45b522312/",
  amazonAuthorUrl: "https://www.amazon.in/s?k=Ankur+Rana&i=digital-text&ref=nb_sb_noss",
  portrait: "/assets/author/author-photo.jpeg",
  location: "India",
  tagline: "Building software, exploring ideas, and turning curiosity into working products.",
  shortBio:
    "I build software, author books, and conduct independent research. I use AI as an intellectual development partner while continuously mastering systems engineering and computer science fundamentals.",
  longBio:
    "I work across software systems, books, and independent conceptual research. As a programmer, I build real-world tools like Ezra (a scripting language compiler & VM in Rust) and production web platforms, using AI as a collaborative pairing partner while deeply owning the architecture and first principles. As an author of seven published titles, my writing moves between cosmological questions and human depth — time, reality, attention, relationships, Hindi poetry, and Awadhi heritage. As an independent researcher, I explore the fundamental nature of time and quantum entanglement.",
  devBio:
    "I use AI as a development partner, not a replacement for thinking. Every project starts with my own requirements, architecture decisions, and product direction. AI helps with implementation, debugging, and iteration — but I remain responsible for understanding, testing, and owning the final result.",
  philosophy:
    "My work is built on a simple conviction: serious ideas should be readable, emotionally honest, and genuinely useful to real people. Software should solve real problems with uncompromising elegance. A book or research paper can clarify a difficult concept, preserve a living culture, examine a relationship, or give shape to a question that deserves more careful attention.",
  quote:
    "Understanding begins when we stop treating the mind, time, love, and language as separate mysteries.",
  devQuote:
    "AI is part of my development workflow, not a substitute for thinking.",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ankur-rana-45b522312/",
      platform: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/ranaji114",
      platform: "github",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/its_my_dark_world/",
      platform: "instagram",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/ankurkumar.kumar.39982",
      platform: "facebook",
    },
  ] satisfies SocialLink[],
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  category: string;
  difficulty: string;
  hook: string;
  description: string;
  themes: string[];
  whyRead: string[];
  amazonUrl: string;
  previewUrl: string;
  related: string[];
  isLatest?: boolean;
  publishDate?: string;
  pages?: number;
  language?: string;
};

export type ResearchPaper = {
  id: string;
  title: string;
  summary: string;
  publication: string;
  type: string;
  url: string;
};

export type ResearchTopic = {
  title: string;
  description: string;
};

export const books: Book[] = [
  {
    id: "unknowable-reality",
    title: "The Unknowable Reality",
    subtitle: "The Evolution of Intelligence, Knowledge, and the Limits of Understanding",
    cover: "/assets/books/unknowable-reality.jpeg",
    category: "Science and Philosophy",
    difficulty: "Deep read",
    hook: "A rigorous and wide-ranging inquiry into why intelligence — human or artificial — may never fully grasp the reality it inhabits.",
    description:
      "This book examines the co-evolution of intelligence and knowledge across biology, science, philosophy, and artificial intelligence. It argues that the limits of understanding are not temporary problems to be solved — they may be structural features of any mind attempting to model a reality larger than itself.",
    themes: ["Intelligence", "Knowledge", "Epistemology", "Philosophy of Mind"],
    whyRead: [
      "For readers who want to understand why intelligence has boundaries, not just capabilities.",
      "Connects cognitive science, philosophy of science, and AI into a single readable inquiry.",
      "Challenges the assumption that more information automatically leads to deeper understanding.",
    ],
    amazonUrl: "https://amzn.in/d/06YNVlNC",
    previewUrl: "https://amzn.in/d/06YNVlNC",
    related: ["architecture-of-existence", "world-through-our-mind", "attention-asset"],
    isLatest: true,
    publishDate: "30 July 2026",
    pages: 169,
    language: "English",
  },
  {
    id: "architecture-of-existence",
    title: "The Architecture of Existence",
    subtitle: "The Biography of Time",
    cover: "/assets/books/architecture-of-existence.jpg",
    category: "Science and Philosophy",
    difficulty: "Deep read",
    hook: "A sweeping, mind-expanding journey through humanity's greatest question: what is time?",
    description:
      "From ancient shadow clocks and sacred calendars to Einstein, black holes, quantum mechanics, multiverses, and loop quantum gravity, this book presents time as both a scientific mystery and a philosophical biography. It turns complex physics into an immersive exploration of memory, causality, entropy, relativity, and the possibility that time may be real, but not fundamental.",
    themes: ["Time", "Physics", "Cosmology", "Metaphysics"],
    whyRead: [
      "A flagship title for readers who want the author's most ambitious intellectual work.",
      "Explains the history and science of time without depending on heavy mathematics.",
      "Connects ancient civilizations, modern physics, paradoxes, and quantum theories into one readable arc.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0H3CD8QZ6",
    previewUrl: "https://www.amazon.in/dp/B0H3CD8QZ6",
    related: ["The World Through Our Mind", "The Attention Asset", "Learn Awadhi"],
  },
  {
    id: "attention-asset",
    title: "The Attention Asset",
    subtitle: "Protect Your Focus, Reclaim Your Time, and Win Back Your Mind",
    cover: "/assets/books/attention-asset.jpg",
    category: "Self-Growth and Focus",
    difficulty: "Accessible",
    hook: "A practical manifesto for anyone whose mind has been quietly colonized by distraction.",
    description:
      "This clear, compassionate guide helps readers reclaim attention in a world engineered to fragment it. Instead of anti-technology absolutism, it offers durable principles: environmental design, digital reset rituals, low-distraction workspaces, screen-free rest, social boundaries, and relapse recovery.",
    themes: ["Attention", "Focus", "Digital Minimalism", "Self-Discipline"],
    whyRead: [
      "Ideal for students, professionals, creators, and anyone overwhelmed by notifications.",
      "Offers a practical reset system without relying on device-specific tricks.",
      "Frames attention as a life asset, not merely a productivity habit.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0GX2XL7BN",
    previewUrl: "https://www.amazon.in/dp/B0GX2XL7BN",
    related: ["The World Through Our Mind", "The Architecture of Existence", "Long Distance Love Blueprint"],
  },
  {
    id: "learn-awadhi",
    title: "Learn Awadhi",
    subtitle: "A Complete Guide: Hindi/English → Awadhi (Basic to Advanced)",
    cover: "/assets/books/learn-awadhi.jpg",
    category: "Language and Culture",
    difficulty: "Structured learning",
    hook: "A complete bridge into Awadhi language, culture, expression, and living speech.",
    description:
      "Written by native Awadhi speaker Ankur Rana, this guide is designed to preserve and modernize Awadhi learning for Hindi and English speakers. It moves from pronunciation and grammar to daily conversation, idioms, storytelling, exercises, quizzes, speaking challenges, and a 2000+ word Hindi-Awadhi-English dictionary.",
    themes: ["Awadhi", "Language Learning", "Culture", "Heritage"],
    whyRead: [
      "A rare complete guide for learners who want real conversational Awadhi.",
      "Combines grammar, vocabulary, cultural expression, exercises, and speaking practice.",
      "Strengthens the author's identity as both a writer and cultural preservationist.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0DKNGWBCN",
    previewUrl: "https://www.amazon.in/dp/B0DKNGWBCN",
    related: ["The Architecture of Existence", "Tumhare Baad....", "The World Through Our Mind"],
  },
  {
    id: "world-through-our-mind",
    title: "The World Through Our Mind",
    subtitle: "How Our Mind Shapes the Reality We Live In",
    cover: "/assets/books/world-through-our-mind.jpg",
    category: "Mind and Consciousness",
    difficulty: "Accessible deep read",
    hook: "A lucid exploration of the invisible machinery that turns reality into personal experience.",
    description:
      "This book examines how perception, memory, belief, morality, consciousness, identity, free will, and meaning are shaped by the mind. Across structured chapters, it asks why we never see reality directly and how the brain edits the world into a private version of truth.",
    themes: ["Mind", "Perception", "Consciousness", "Reality"],
    whyRead: [
      "A natural entry point for readers interested in psychology, philosophy, and self-understanding.",
      "Turns abstract questions about reality into clear and emotionally relevant insight.",
      "Pairs naturally with the author's work on time, attention, and human behavior.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0G3CLWDHC",
    previewUrl: "https://www.amazon.in/dp/B0G3CLWDHC",
    related: ["The Architecture of Existence", "The Attention Asset", "Long Distance Love Blueprint"],
  },
  {
    id: "long-distance-love-blueprint",
    title: "Long Distance Love Blueprint",
    subtitle: "How to Stay Connected, Build Trust, Overcome Overthinking, and Make Your Relationship Last",
    cover: "/assets/books/long-distance-love-blueprint.jpg",
    category: "Relationships",
    difficulty: "Accessible",
    hook: "A practical emotional guide for couples trying to make love survive distance, doubt, and overthinking.",
    description:
      "This book reframes long-distance love as a skill rather than a problem. With direct guidance, it covers emotional connection, communication, trust, jealousy, anxiety, overthinking, keeping the spark alive, planning a future, and closing the distance.",
    themes: ["Long-Distance Love", "Trust", "Communication", "Emotional Clarity"],
    whyRead: [
      "Built for couples caught between love, uncertainty, and emotional exhaustion.",
      "Explains overthinking, trust, jealousy, and communication in immediately usable language.",
      "Connects relationship advice with the author's broader interest in psychology and modern emotional life.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0GZJQLR51",
    previewUrl: "https://www.amazon.in/dp/B0GZJQLR51",
    related: ["Tumhare Baad....", "The Attention Asset", "The World Through Our Mind"],
  },
  {
    id: "tumhare-baad",
    title: "Tumhare Baad....",
    subtitle: "एक अधूरी मोहब्बत की कविताएँ",
    cover: "/assets/books/tumhare-baad.jpg",
    category: "Hindi Poetry",
    difficulty: "Emotional read",
    hook: "A tender Hindi poetry collection for anyone still carrying the silence someone left behind.",
    description:
      "This collection gives voice to unfinished love, loneliness, waiting, broken dreams, unanswered questions, and the slow journey back to oneself. Written for readers who have loved deeply and lost quietly, the poems turn heartbreak into recognition.",
    themes: ["Heartbreak", "Hindi Poetry", "Unfinished Love", "Healing"],
    whyRead: [
      "For readers who connect with love, loss, memory, and late-night silence.",
      "Expands the author's range into emotionally honest literary expression.",
      "Pairs naturally with the relationship titles by showing the poetic interior of absence and recovery.",
    ],
    amazonUrl: "https://www.amazon.in/dp/B0H395X6R7",
    previewUrl: "https://www.amazon.in/dp/B0H395X6R7",
    related: ["Long Distance Love Blueprint", "The World Through Our Mind", "Learn Awadhi"],
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: "unified-connectivity-hypothesis",
    title: "A Unified Connectivity Hypothesis for the Origin of Quantum Entanglement",
    url: "https://zenodo.org/records/16827645",
    summary:
      "This paper proposes that entangled particles may not be fundamentally separate entities. Instead, they may represent different manifestations of a single underlying quantum object, with spatial separation emerging only at higher layers of reality.",
    publication: "Zenodo",
    type: "Conceptual Physics Hypothesis",
  },
  {
    id: "temporal-layers",
    title: "Temporal Layers: Exploring the Divergence Between Human Perception and Physical Time",
    url: "https://zenodo.org/records/17274810",
    summary:
      "This paper explores the possibility that human consciousness experiences time differently from physical reality, proposing that subjective and objective temporal layers may coexist while operating according to different principles.",
    publication: "Zenodo",
    type: "Interdisciplinary Conceptual Research",
  },
];

export const featuredBookIds = [
  "unknowable-reality",
  "architecture-of-existence",
  "world-through-our-mind",
];

export const categories = [
  "Science and Philosophy",
  "Mind and Consciousness",
  "Self-Growth and Focus",
  "Relationships",
  "Hindi Poetry",
  "Language and Culture",
];

export const readingPaths = {
  curiousMinds: ["architecture-of-existence", "world-through-our-mind", "attention-asset"],
  selfGrowth: ["attention-asset", "world-through-our-mind", "long-distance-love-blueprint"],
  relationships: ["long-distance-love-blueprint", "tumhare-baad", "world-through-our-mind"],
  cultureAndLanguage: ["learn-awadhi", "tumhare-baad", "architecture-of-existence"],
};

export const recommendationGraph = {
  "architecture-of-existence": ["world-through-our-mind", "attention-asset", "learn-awadhi"],
  "attention-asset": ["world-through-our-mind", "architecture-of-existence", "long-distance-love-blueprint"],
  "learn-awadhi": ["tumhare-baad", "architecture-of-existence", "world-through-our-mind"],
  "world-through-our-mind": ["architecture-of-existence", "attention-asset", "long-distance-love-blueprint"],
  "long-distance-love-blueprint": ["tumhare-baad", "attention-asset", "world-through-our-mind"],
  "tumhare-baad": ["long-distance-love-blueprint", "world-through-our-mind", "learn-awadhi"],
};

export const researchTopics: ResearchTopic[] = [
  {
    title: "Time",
    description:
      "Time as physical structure, subjective experience, historical measurement, and conceptual mystery.",
  },
  {
    title: "Reality",
    description:
      "Reality as something approached through models, assumptions, perception, and layers of interpretation.",
  },
  {
    title: "Consciousness",
    description:
      "The role of awareness in experience, interpretation, memory, and the felt passage of time.",
  },
  {
    title: "Human Perception",
    description:
      "The filters that shape what people notice, ignore, remember, and mistake for objective truth.",
  },
  {
    title: "Psychology",
    description:
      "Attention, overthinking, emotional patterns, relationship behavior, and the pressures of modern life.",
  },
  {
    title: "Philosophy",
    description:
      "Readable inquiry into meaning, identity, love, discipline, culture, and the questions that shape human life.",
  },
  {
    title: "Language",
    description:
      "Language as memory, cultural continuity, and living identity, especially through the preservation and teaching of Awadhi.",
  },
];

export const publicationTimeline = [
  {
    year: "2025",
    title: "Learn Awadhi",
    note: "A language and cultural preservation guide for Hindi and English speakers.",
  },
  {
    year: "2025",
    title: "The World Through Our Mind",
    note: "A clear study of perception, consciousness, belief, meaning, and reality.",
  },
  {
    year: "2026",
    title: "The Attention Asset",
    note: "A practical framework for reclaiming focus in a distracted world.",
  },
  {
    year: "2026",
    title: "Long Distance Love Blueprint",
    note: "A direct guide to connection, trust, overthinking, and emotional stability.",
  },
  {
    year: "2026",
    title: "The Architecture of Existence",
    note: "A large-scale inquiry into time across history, physics, and philosophy.",
  },
  {
    year: "2026",
    title: "Tumhare Baad....",
    note: "A Hindi poetry collection about unfinished love, heartbreak, and return to self.",
  },
  {
    year: "2026",
    title: "The Unknowable Reality",
    note: "An inquiry into intelligence, knowledge, and the structural limits of understanding.",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = "live" | "archived" | "in-progress";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectSection = {
  id: string;
  label: string;
  content: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl: string;
  stack: string[];
  highlights: string[];
  features: ProjectFeature[];
  sections: ProjectSection[];
  architecture?: string[];
  challenges: string[];
  learned: string[];
};

export const projects: Project[] = [
  {
    id: "ezra",
    slug: "ezra",
    number: "01",
    title: "Ezra",
    tagline: "A readable scripting language and developer ecosystem built with Rust.",
    description:
      "Ezra is a programming language designed with readability and developer experience as first-class concerns. Built in Rust, it features its own lexer, parser, AST, compiler, bytecode VM, CLI, and standard library — forming a complete language ecosystem from source code to execution.",
    status: "live",
    liveUrl: "https://ezra-programming-lang.vercel.app/",
    githubUrl: "https://github.com/ranaji114/Ezra-programming-lang",
    stack: ["Rust", "TypeScript", "Next.js", "Vercel"],
    highlights: [
      "Complete language pipeline: lexer → parser → AST → compiler → bytecode → VM",
      "Custom CLI tooling for running, formatting, and linting Ezra programs",
      "VS Code extension with syntax highlighting and LSP support",
      "Dedicated documentation website",
    ],
    features: [
      {
        title: "Lexer",
        description:
          "Tokenizes Ezra source code into a stream of meaningful tokens — identifiers, keywords, literals, operators, and punctuation.",
      },
      {
        title: "Parser",
        description:
          "Transforms the token stream into a structured parse tree, validating syntax and grammar rules.",
      },
      {
        title: "Abstract Syntax Tree",
        description:
          "The AST represents the program structure in a form that can be analysed, transformed, and compiled.",
      },
      {
        title: "Compiler",
        description:
          "Walks the AST and emits bytecode instructions that can be executed by the Ezra virtual machine.",
      },
      {
        title: "Bytecode VM",
        description:
          "A stack-based virtual machine that executes compiled Ezra bytecode efficiently.",
      },
      {
        title: "CLI",
        description:
          "A command-line interface for running, compiling, formatting, and linting Ezra programs.",
      },
      {
        title: "Standard Library",
        description:
          "A growing set of built-in functions and modules for common programming tasks.",
      },
      {
        title: "VS Code Extension",
        description:
          "Syntax highlighting, error detection, and LSP integration for Ezra development in VS Code.",
      },
      {
        title: "Formatter",
        description:
          "An opinionated code formatter that enforces consistent style across Ezra source files.",
      },
      {
        title: "Linter",
        description:
          "Static analysis tooling that identifies potential issues and style violations in Ezra code.",
      },
    ],
    architecture: [
      "Source Code",
      "Lexer",
      "Parser",
      "Abstract Syntax Tree",
      "Compiler",
      "Bytecode",
      "Virtual Machine",
      "Output",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Ezra is a scripting language built to be readable first. The language design prioritises clear syntax and a smooth developer experience over performance at the expense of clarity. It is implemented entirely in Rust and ships as a single binary.",
      },
      {
        id: "why",
        label: "Why I Built It",
        content:
          "Building a programming language from scratch is one of the most complete learning experiences in computer science. Ezra was built to understand every layer of how languages work — from scanning raw text to executing instructions — and to produce something genuinely usable.",
      },
      {
        id: "philosophy",
        label: "Language Philosophy",
        content:
          "Ezra is designed around the idea that code should read like a clear description of its intent. Syntax choices prioritise human readability. The toolchain is opinionated so developers spend time on logic rather than configuration.",
      },
      {
        id: "toolchain",
        label: "Toolchain",
        content:
          "The Ezra toolchain includes a CLI for running and compiling programs, a formatter for consistent style, a linter for static analysis, and a VS Code extension for syntax highlighting and LSP support. The documentation site lives at ezra-programming-lang.vercel.app.",
      },
    ],
    challenges: [
      "Designing a grammar that is both expressive and unambiguous to parse.",
      "Implementing a correct and efficient bytecode compiler from scratch.",
      "Building a stack-based VM that handles control flow, functions, and closures correctly.",
      "Creating VS Code tooling and LSP integration for a custom language.",
    ],
    learned: [
      "Deep understanding of how programming languages work end-to-end.",
      "Practical experience with Rust's type system, ownership, and performance characteristics.",
      "How compiler design decisions cascade through the entire toolchain.",
      "The discipline required to ship developer tooling that others can actually use.",
    ],
  },
  {
    id: "shri-krishna",
    slug: "shri-krishna-coaching-center",
    number: "02",
    title: "Shri Krishna Coaching Center",
    tagline: "A Modern, Full-Stack Production Educational Platform & Management Portal",
    description:
      "A complete full-stack web application built for Shri Krishna Coaching Center (Est. 2021, Kadipur, Sultanpur, UP). The platform features an editorial public portal showcasing specialized curriculum for Classes 6th–12th (Physics, Chemistry, Math, Biology, English), faculty spotlights (Krishna Sir & Priyanshu Singh Sir), interactive Google Maps coordinate embed, a multi-step digital admission application form, and a double-field authenticated management portal (/admin) backed by Supabase Cloud Database.",
    status: "live",
    liveUrl: "https://shri-krishna-coaching-center.vercel.app/",
    githubUrl: "https://github.com/ranaji114/Shri-Krishna-coaching-center",
    stack: ["Next.js 16.2", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Vercel"],
    highlights: [
      "Full-stack Next.js App Router with Supabase cloud database & storage",
      "Multi-step digital admission form capturing student & parent details",
      "Secure double-field admin portal (/admin) with SHA-256 Web Crypto encryption",
      "Interactive Google Maps coordinates embed, notice board & faculty spotlight",
    ],
    features: [
      {
        title: "Public Editorial Platform",
        description:
          "Premium gold (#C48A2A) & dark obsidian (#18181B) theme showcasing structured curriculum for Classes 6th-10th & 11th-12th.",
      },
      {
        title: "Faculty Spotlight",
        description:
          "Dedicated profiles highlighting lead educators Krishna Sir (B.Com, LL.B.) and Priyanshu Singh Sir.",
      },
      {
        title: "Digital Admission Workflow",
        description:
          "Multi-step student application form with parent information, target class, subject selection, and previous school records.",
      },
      {
        title: "Secure Admin Portal (/admin)",
        description:
          "Double-field authentication dashboard (User ID & Password) with SHA-256 Web Crypto encryption for managing admissions and student inquiries.",
      },
      {
        title: "Interactive Coordinates & Notice Board",
        description:
          "Accurate Google Maps coordinate embed (26.1793424, 82.4637253) and real-time announcements board.",
      },
      {
        title: "Direct WhatsApp Inquiry",
        description:
          "Instant one-click WhatsApp chat routing for quick prospective student and parent consultations.",
      },
    ],
    architecture: [
      "Public Next.js 16 Client Portal",
      "Multi-step Admission Form Validation",
      "Supabase Cloud Database & Storage API",
      "Double-Field Admin Auth (SHA-256 Web Crypto)",
      "Centralized Admin Management Dashboard (/admin)",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Shri Krishna Coaching Center (Established 2021, Kadipur, Mudila Bazar, Sultanpur, UP) needed a modern, production-grade digital platform to manage student admissions, public presence, faculty profiles, and announcements.",
      },
      {
        id: "why",
        label: "Problem & Architecture",
        content:
          "Traditional institutes struggle with offline admissions and manual communication. This platform provides an automated digital pipeline: parents can apply online, check course curriculums, and administrators can manage records from a secure portal.",
      },
      {
        id: "technical",
        label: "Technical Implementation",
        content:
          "Built on Next.js 16.2 App Router, React 19, TypeScript, Tailwind CSS v4, and Supabase Cloud Database. State management combines client stores with direct cloud database syncing and SHA-256 Web Crypto authentication.",
      },
    ],
    challenges: [
      "Building a secure client-side and cloud-authenticated admin system without third-party bloat.",
      "Ensuring seamless form submission and fast image loading on mobile devices across 4G/3G networks.",
      "Integrating interactive Google Maps coordinate navigation and direct messaging.",
    ],
    learned: [
      "End-to-end full-stack Next.js 16 and Supabase integration in a production client environment.",
      "The value of intuitive admin dashboard ergonomics for non-technical educators.",
      "Designing high-converting educational interfaces with clear typography and color accents.",
    ],
  },
  {
    id: "maa-sarswati-digital-library",
    slug: "maa-sarswati-digital-library",
    number: "03",
    title: "Maa Sarswati Digital Library",
    tagline: "Full-Stack Digital Study Library Management Platform & Admin Portal",
    description:
      "A production-ready full-stack web application built for a modern study library in MudilaDeeh, Kadipur, Sultanpur, UP. The platform features an editorial public presence (facilities showcase, membership pricing plans, instant student reviews, live notices board, photo gallery), an online student admission system with photo & Aadhaar multipart upload, and a dedicated role-based JWT administrative dashboard backed by Express 5, Supabase PostgreSQL, and Cloudinary.",
    status: "live",
    liveUrl: "https://ma-sarswati-digital-library-fronten.vercel.app",
    githubUrl: "https://github.com/ranaji114/Ma-Sarswati-Digital-Library",
    stack: ["React 19", "Vite 7", "Express 5", "Node.js", "Supabase", "Tailwind CSS 3", "Render", "Vercel"],
    highlights: [
      "Full-stack production deployment: Vercel (Frontend), Render (Express REST API), Supabase (PostgreSQL)",
      "Digital student admission system with Multer photo & Aadhaar multipart document upload",
      "Interactive student reviews system with immediate public publishing and admin moderation",
      "Secure JWT admin dashboard with rate-limited brute-force protection, admissions manager & notices CRUD",
    ],
    features: [
      {
        title: "Public Facility & Membership Portal",
        description:
          "Hero showcase, study amenities, membership pricing plans, photo gallery, and live notice board.",
      },
      {
        title: "Digital Admission with Document Upload",
        description:
          "Online registration form supporting photo and Aadhaar card upload via Multer with validation.",
      },
      {
        title: "Live Student Reviews Engine",
        description:
          "Public rating and review system where students submit real-time feedback with instant rendering.",
      },
      {
        title: "Admin Dashboard & Applications Manager",
        description:
          "Secure JWT management portal with brute-force rate limiting to approve/reject admissions and manage enrolled students.",
      },
      {
        title: "Announcements & Gallery CRUD",
        description:
          "Real-time administrative interfaces to publish instant exam alerts and manage library gallery albums.",
      },
      {
        title: "Production REST API & PostgreSQL",
        description:
          "Express 5 backend deployed on Render edge with Zod payload validation, Helmet security headers, and Supabase database.",
      },
    ],
    architecture: [
      "React 19 + Vite 7 Frontend Client (Vercel)",
      "Express 5 ESM REST API (Render)",
      "JWT Authentication & bcrypt Password Hashing",
      "Supabase PostgreSQL Cloud Database",
      "Multer Multipart Document Processing",
      "Admin Control Panel (/admin/login)",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Maa Sarswati Digital Library (located in MudilaDeeh, Kadipur, Sultanpur, UP) is a dedicated modern digital study library. The goal was to build an end-to-end full-stack platform managing student admissions, membership tiers, reviews, announcements, and an owner administrative control center.",
      },
      {
        id: "architecture",
        label: "Architecture & Stack",
        content:
          "The platform uses a decoupled full-stack architecture: a React 19 + Vite 7 SPA hosted on Vercel communicating via Axios with an Express 5 REST API on Render. Data persistence is handled by Supabase PostgreSQL with service-role security and Zod schema validation.",
      },
      {
        id: "admin-system",
        label: "Administrative Control",
        content:
          "The owner can log in at /admin/login via secure JWT auth to approve or reject student admissions, review uploaded Aadhaar cards, post urgent library notices, moderate student reviews, and view contact enquiries.",
      },
    ],
    challenges: [
      "Handling multipart form uploads (Aadhaar & student photo) reliably across mobile networks.",
      "Configuring cross-origin communication, edge trust proxy, and rate-limiting between Vercel and Render.",
      "Optimizing mobile viewport ergonomics and eliminating iOS input zoom delays.",
    ],
    learned: [
      "Full-stack microservices deployment bridging Vercel SPA and Render Node.js backend.",
      "Building robust multipart upload workflows with Multer and cloud storage.",
      "Implementing resilient Zod schema validation and JWT authentication guards.",
    ],
  },
  {
    id: "vani",
    slug: "vani",
    number: "04",
    title: "Vani",
    tagline: "A Medium-like publishing platform for writing professionals.",
    description:
      "Vani was a full-stack publishing platform built for writers and writing professionals. It featured authentication, author profiles, a rich writing editor, a publishing workflow, and a content architecture designed around long-form writing. The project is currently archived and offline.",
    status: "archived",
    githubUrl: "https://github.com/ranaji114/Vani-is-for-the-writing-professionals",
    stack: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    highlights: [
      "Full authentication system with author profiles",
      "Rich text editor for long-form writing",
      "Complete publish/draft/edit workflow",
      "Reader-facing article pages with clean typography",
    ],
    features: [
      {
        title: "Authentication",
        description:
          "User registration and login with secure session management. Each user has a dedicated author profile.",
      },
      {
        title: "Author Profiles",
        description:
          "Public-facing author profile pages showing published articles and author information.",
      },
      {
        title: "Writing Editor",
        description:
          "A focused writing environment for composing long-form articles with formatting support.",
      },
      {
        title: "Publishing Workflow",
        description:
          "Draft, preview, edit, and publish states allowing writers to manage their work.",
      },
      {
        title: "Content Architecture",
        description:
          "A MongoDB-backed content model designed to support articles, authors, drafts, and tags.",
      },
      {
        title: "Reader Experience",
        description:
          "Clean, typographically focused reading pages for published articles.",
      },
    ],
    architecture: [
      "React Frontend",
      "Express.js REST API",
      "JWT Authentication Middleware",
      "MongoDB Article & Author Store",
      "Article Reader View",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Vani was designed as a dedicated writing and publishing platform. It aimed to give writers a clean, distraction-free environment for composing and sharing long-form work.",
      },
      {
        id: "technical",
        label: "Architecture",
        content:
          "Built using the MERN stack with a RESTful API architecture. The frontend was built with React, the backend with Express and Node.js, and MongoDB was used for persistent storage.",
      },
    ],
    challenges: [
      "Designing a content architecture that could scale beyond a prototype.",
      "Managing the complexity of authentication, sessions, and user-owned content.",
    ],
    learned: [
      "Full-stack product development from concept to working application.",
      "How authentication and user-owned content requires careful architectural thinking.",
    ],
  },
  {
    id: "alfarooq",
    slug: "alfarooq",
    number: "05",
    title: "Al-Farooq",
    tagline: "Digital Presence. Institutional Identity. Centralized Management.",
    description:
      "A modern educational institution platform built with React, TypeScript, and Vite. Features a comprehensive 11-page public portal (Home, About, Academics, Admissions, Gallery, Infrastructure, Staff, Notices, Contact, SMC, Mandatory Disclosure) seamlessly integrated with a dedicated administrative management system (Dashboard, Admissions Manager, Gallery Manager, Hero Manager, Notices Manager, and Staff Manager).",
    status: "archived",
    githubUrl: "https://github.com/ranaji114/alfarooq",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI"],
    highlights: [
      "Dual-layer architecture: 11-page public institutional website + dedicated admin system",
      "Centralized admin dashboard with Admissions, Gallery, Notices, Staff & Hero managers",
      "Reusable UI component system (dialogs, sheets, tooltips, toasts, sidebars)",
      "Polished UX with scroll reveal animations, toast notifications, and mobile-aware layouts",
    ],
    features: [
      {
        title: "11-Page Public Experience",
        description:
          "Dedicated pages for Home, About, Academics, Admissions, Gallery, Infrastructure, Staff, Notices, Contact, SMC, and Mandatory Disclosure.",
      },
      {
        title: "Centralized Admin Dashboard",
        description:
          "Administrative area with separate layout and routing to manage website content without touching code.",
      },
      {
        title: "Admissions & Notices Manager",
        description:
          "Dedicated admin modules to review admissions, update academic criteria, and publish real-time institutional notices.",
      },
      {
        title: "Gallery & Hero Content Manager",
        description:
          "Interface for administrators to update school gallery albums and primary landing hero banners on the fly.",
      },
      {
        title: "Staff & Faculty Manager",
        description:
          "Centralized roster interface to maintain teacher profiles, qualifications, and department allocations.",
      },
      {
        title: "Reusable Design System",
        description:
          "Modular UI library covering buttons, dialogs, forms, inputs, tables, tabs, sheets, toasts, and tooltips.",
      },
    ],
    architecture: [
      "Public React 19 + Vite Experience",
      "Component Design System & UI Layer",
      "Administrative Management Core & Layout",
      "Modular Admin Interfaces (Admissions, Notices, Gallery, Staff)",
      "Centralized Dashboard & Auth Guard",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Al Farooq is a modern educational digital platform designed to solve a fundamental problem: school websites become stale when every minor notice or gallery update requires a developer. Al Farooq solves this by pairing an 11-page public portal with a dedicated centralized admin management dashboard.",
      },
      {
        id: "architecture",
        label: "Dual Architecture",
        content:
          "The platform is cleanly split into two distinct experiences: what visitors see (Admissions, Academics, Staff, Infrastructure, SMC) and what administrators manage (Admissions Manager, Notices Manager, Gallery Manager, Staff Manager).",
      },
      {
        id: "design-system",
        label: "Design System",
        content:
          "Built around a reusable UI component library using React, TypeScript, Vite, Tailwind CSS, and Radix primitives — ensuring rock-solid accessibility, consistent visual hierarchy, and sub-second load times.",
      },
    ],
    challenges: [
      "Architecting a clean separation between public routing and administrative management interfaces.",
      "Building a lightweight, intuitive admin UX that school staff can operate without technical friction.",
      "Structuring 11 comprehensive institutional pages while maintaining sub-second performance.",
    ],
    learned: [
      "How to design full-scale educational management systems with role-separated UI layers.",
      "Building scalable component libraries with Radix UI and Tailwind CSS.",
      "Creating maintainable CMS architectures for non-technical organizations.",
    ],
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillCategory = {
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "Rust", "Java", "HTML", "CSS"],
  },
  {
    label: "Web & Frameworks",
    skills: ["React", "Next.js"],
  },
  {
    label: "Backend & Data",
    skills: ["Node.js", "MongoDB", "Firebase", "Supabase"],
  },
  {
    label: "Deployment",
    skills: ["Vercel", "Render"],
  },
  {
    label: "Workflow",
    skills: ["Git", "GitHub", "AI-Assisted Development"],
  },
];

export const aiWorkflowSteps = [
  { step: "01", label: "Idea", description: "Define the problem and what success looks like." },
  { step: "02", label: "Requirements", description: "Break down the idea into clear, testable requirements." },
  { step: "03", label: "Research", description: "Understand existing solutions, constraints, and approaches." },
  { step: "04", label: "Architecture", description: "Design the system structure — my responsibility, my decisions." },
  { step: "05", label: "AI-Assisted Implementation", description: "Use AI as a coding partner for implementation, suggestions, and iteration." },
  { step: "06", label: "Testing", description: "Verify the implementation actually works as intended." },
  { step: "07", label: "Debugging", description: "Diagnose and fix issues, always understanding the root cause." },
  { step: "08", label: "Iteration", description: "Improve the product based on real use and honest feedback." },
  { step: "09", label: "Deployment", description: "Ship and maintain. Take responsibility for the live product." },
];
