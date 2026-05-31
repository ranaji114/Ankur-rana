export type SocialLink = {
  label: string;
  href: string;
  platform: "instagram" | "facebook";
};

export const author = {
  name: "Ankur Rana",
  role: "Author • Independent Researcher • Thinker",
  email: "ranaankur442@gmail.com",
  amazonAuthorUrl: "https://www.amazon.in/s?k=Ankur+Rana&i=digital-text&ref=nb_sb_noss",
  portrait: "/assets/author/author-photo.jpeg",
  location: "India",
  shortBio:
    "Ankur Rana is an author, independent researcher, and thinker whose work explores time, reality, psychology, relationships, poetry, language, and human understanding.",
  longBio:
    "Ankur Rana works across books, independent research papers, conceptual hypotheses, and thought experiments. His writing moves between large questions and intimate human concerns: what time is, how reality may be understood, how perception shapes experience, how attention is protected, how distance changes love, and how language preserves culture. His work is research-driven, guided by intellectual curiosity, clear language, and a persistent interest in the foundations of understanding.",
  philosophy:
    "The work is built on a simple belief: serious ideas should be readable, emotionally honest, and useful to real people. A book or research paper can clarify a concept, preserve a culture, examine a relationship, or give shape to a question that deserves more careful attention.",
  quote:
    "Understanding begins when we stop treating the mind, time, love, and language as separate mysteries.",
  socialLinks: [
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
  "architecture-of-existence",
  "world-through-our-mind",
  "attention-asset",
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
];
