export type SocialLink = {
  label: string;
  href: string;
  platform: "instagram" | "facebook" | "github";
};

export const author = {
  name: "Ankur Rana",
  role: "AI-Assisted Developer · Programmer · Author · Independent Researcher",
  roleShort: "Developer · Author · Researcher",
  email: "ranaankur442@gmail.com",
  githubUrl: "https://github.com/ranaji114",
  amazonAuthorUrl: "https://www.amazon.in/s?k=Ankur+Rana&i=digital-text&ref=nb_sb_noss",
  portrait: "/assets/author/author-photo.jpeg",
  location: "India",
  tagline: "Building software, exploring ideas, and turning curiosity into working products.",
  shortBio:
    "Ankur Rana builds software, writes books, and conducts independent research. He uses AI as a development partner while continuously deepening his own programming and computer science fundamentals.",
  longBio:
    "Ankur Rana works across software, books, and independent research. As a programmer, he builds real-world applications using AI as a collaborative tool while continuously improving his own understanding of computer science fundamentals. As an author, his writing moves between large questions and intimate human concerns — time, reality, attention, relationships, language, and poetry. As an independent researcher, he explores conceptual questions about the nature of time, consciousness, and perception.",
  devBio:
    "I use AI as a development partner, not a replacement for thinking. Every project starts with my own requirements, architecture decisions, and product direction. AI helps with implementation, debugging, and iteration — but I remain responsible for understanding, testing, and owning the final result.",
  philosophy:
    "The work is built on a simple belief: serious ideas should be readable, emotionally honest, and useful to real people. Software should solve real problems. A book or research paper can clarify a concept, preserve a culture, examine a relationship, or give shape to a question that deserves more careful attention.",
  quote:
    "Understanding begins when we stop treating the mind, time, love, and language as separate mysteries.",
  devQuote:
    "AI is part of my development workflow, not a substitute for thinking.",
  socialLinks: [
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
    tagline: "A full-stack educational platform for a real-world coaching institute.",
    description:
      "A complete web application built for Shri Krishna Coaching Center — a real educational institution. The platform includes a public website, course listings, faculty profiles, admission workflow, notices, gallery, contact and enquiry functionality, and administrative features backed by a database.",
    status: "live",
    liveUrl: "https://shri-krishna-coaching-center.vercel.app/",
    githubUrl: "https://github.com/ranaji114/Shri-Krishna-coaching-center",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    highlights: [
      "Real-world client project deployed and accessible publicly",
      "Complete admission and enquiry workflow",
      "Database-backed faculty and course management",
      "Fully responsive across all device sizes",
    ],
    features: [
      {
        title: "Public Website",
        description:
          "A polished, professional-facing website presenting the coaching center's identity, mission, and offerings.",
      },
      {
        title: "Courses",
        description:
          "Structured course listings with details about subjects, levels, schedule, and fees.",
      },
      {
        title: "Faculty Profiles",
        description:
          "Dedicated faculty section with profiles, qualifications, and subject expertise.",
      },
      {
        title: "Admission Workflow",
        description:
          "A guided admission process allowing prospective students to submit enquiries and applications.",
      },
      {
        title: "Notices",
        description:
          "A notice board for announcements, exam schedules, holidays, and important updates.",
      },
      {
        title: "Gallery",
        description:
          "A visual gallery showcasing institute events, activities, and environment.",
      },
      {
        title: "Contact & Enquiry",
        description:
          "A contact system where visitors can submit enquiries that are stored and accessible to administration.",
      },
      {
        title: "Responsive Design",
        description:
          "The platform is fully responsive across desktop, tablet, and mobile screen sizes.",
      },
    ],
    architecture: [
      "Admission / Enquiry Form",
      "React Context Store (useStore hook)",
      "Supabase Insert (if configured)",
      "localStorage Fallback (offline-safe)",
      "Admin Dashboard — /admin/admissions & /admin/messages",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Shri Krishna Coaching Center is a real-world educational institution. This platform was built to give them a professional online presence with working functionality — not a static brochure website.",
      },
      {
        id: "why",
        label: "Why I Built It",
        content:
          "This project came from a real need: a coaching center with no digital presence, losing prospective students to competitors who had websites. The goal was to build something functional, maintainable, and actually useful.",
      },
      {
        id: "technical",
        label: "Technical Approach",
        content:
          "The application is built with Next.js and TypeScript on the frontend, Supabase for the database and backend, and deployed on Vercel. The architecture allows content to be managed without touching code.",
      },
    ],
    challenges: [
      "Designing a system that non-technical administrators could actually use.",
      "Building a reliable admission and enquiry workflow that works on slow connections.",
      "Handling image uploads and gallery management without excessive complexity.",
    ],
    learned: [
      "How to translate real-world institutional requirements into technical specifications.",
      "The importance of admin UX — backend systems that users can manage independently.",
      "Supabase as a rapid full-stack backend for Next.js projects.",
    ],
  },
  {
    id: "vani",
    slug: "vani",
    number: "03",
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
          "Articles move through draft → review → published states with clear controls.",
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
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Vani was conceived as a publishing platform specifically designed for writing professionals — a space where serious writers could publish, manage, and share long-form work with a clean reading experience.",
      },
      {
        id: "why",
        label: "Why I Built It",
        content:
          "The project came from an interest in building a product that matched the user's intent. Most publishing platforms are built for general audiences. Vani was designed specifically for people who take writing seriously.",
      },
      {
        id: "status",
        label: "Current Status",
        content:
          "Vani is currently archived and offline. The project served as a significant learning exercise in full-stack product development, authentication systems, content architecture, and editor UX. The repository is available on GitHub.",
      },
    ],
    challenges: [
      "Building a writing editor that felt good to use — simple, focused, and reliable.",
      "Designing a content architecture that could scale beyond a prototype.",
      "Managing the complexity of authentication, sessions, and user-owned content.",
    ],
    learned: [
      "Full-stack product development from concept to working application.",
      "How authentication and user-owned content requires careful architectural thinking.",
      "The difficulty of editor UX — making a writing tool feel lightweight and trustworthy.",
      "When to archive a project rather than accumulate technical debt.",
    ],
  },
  {
    id: "alfarooq",
    slug: "alfarooq",
    number: "04",
    title: "Al-Farooq",
    tagline: "A clean, responsive website for a school institution.",
    description:
      "Al-Farooq is a school website project built to provide an institution with a professional digital presence. The project focused on clean design, responsive layout, and clear information architecture for prospective students and parents.",
    status: "live",
    githubUrl: "https://github.com/ranaji114/alfarooq",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Clean institutional design with clear visual hierarchy",
      "Fully responsive across desktop and mobile",
      "Structured information architecture for a school audience",
    ],
    features: [
      {
        title: "Home / Landing",
        description: "A welcoming landing page communicating the school's identity and values.",
      },
      {
        title: "About Section",
        description: "Information about the institution's history, mission, and approach.",
      },
      {
        title: "Responsive Interface",
        description: "The layout adapts cleanly to all screen sizes without breaking.",
      },
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Al-Farooq is a school website project. The goal was to give the institution a clean, professional web presence with clearly organised information for students, parents, and visitors.",
      },
      {
        id: "approach",
        label: "Design Approach",
        content:
          "The design focused on clarity and institutional credibility. A school website needs to communicate trust immediately. Typography, spacing, and colour were chosen to feel professional and approachable.",
      },
    ],
    challenges: [
      "Communicating institutional credibility through design alone.",
      "Keeping the layout responsive and readable across very different screen sizes.",
    ],
    learned: [
      "How institutional websites differ from product or portfolio websites in their communication goals.",
      "The importance of typographic hierarchy in information-heavy pages.",
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
