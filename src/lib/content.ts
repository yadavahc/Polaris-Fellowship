/* =========================================================================
   Central content model — everything the site renders lives here.
   Edit this file to update copy, links, images, and the section order.
   Source of truth: Yadava H C résumé.
   ========================================================================= */

export type SectionId =
  | "hero"
  | "about"
  | "journey"
  | "experience"
  | "projects"
  | "achievements"
  | "dsa"
  | "hackathons"
  | "community"
  | "vision";

export const site = {
  name: "Yadava H C",
  initials: "YHC",
  role: "Information Science & Engineering",
  tagline: "I build AI-first products that solve real problems.",
  college: "The Oxford College of Engineering",
  email: "yadavahc333@gmail.com",
  phone: "+91 8904030441",
  fellowship: "Polaris Fellowship Application",
  applicationLabel: "Candidate Application · Polaris Fellowship",
  cohort: "2026",
  // Optional: paste a Google Drive *preview* link to let visitors watch in-page.
  // e.g. "https://drive.google.com/file/d/FILE_ID/preview"
  // Google Drive fallback (file must be shared "Anyone with the link").
  driveVideoUrl: "https://drive.google.com/file/d/1bNK2dMNmVzSjptqA47VZQKmYgh9L9eqw/preview",
  // Web-optimized 720p build (committed). Primary source — keeps caption sync.
  localVideo: "/video/intro-web.mp4",
  socials: {
    github: "https://github.com/yadavahc",
    linkedin: "https://www.linkedin.com/in/yadava-hc-907067287",
    leetcode: "https://leetcode.com/u/uDbVJTA37J/",
    tuf: "https://takeuforward.org/profile/yadava_h_c",
    gfg: "https://www.geeksforgeeks.org/profile/yadavahc",
  },
};

export const nav: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "dsa", label: "DSA" },
  { id: "hackathons", label: "Hackathons" },
  { id: "community", label: "Community" },
  { id: "vision", label: "Vision" },
];

export const about = {
  kicker: "About Me",
  heading: "Beyond the résumé",
  paragraphs: [
    "Hi, I'm Yadava H C — pursuing my B.E. in Information Science and Engineering at The Oxford College of Engineering, Bengaluru (CGPA 8.9).",
    "Beyond my résumé, I'm someone who genuinely enjoys solving problems through technology. I love taking an idea, breaking it into smaller challenges, and turning it into a working product. That process motivates me every single day.",
    "Whenever I learn a new technology, I use it in a real project instead of just finishing a course. That's how I learn best.",
  ],
  facets: [
    { label: "Focus", value: "AI · Full-stack · Products" },
    { label: "CGPA", value: "8.9 / 10 · 2023–2027" },
    { label: "Driver", value: "Solving real-world problems" },
  ],
  photo: "/images/profile-photo.png",
  cartoon: "/images/profile-cartoon.png",
};

export const journey: {
  year: string;
  title: string;
  desc: string;
}[] = [
  {
    year: "Start",
    title: "Basic web development",
    desc: "Began with the fundamentals of the web — HTML, CSS, JavaScript and building things that run in the browser.",
  },
  {
    year: "2024",
    title: "First real-world builds",
    desc: "Interned at Kiran Foundation (Astro) and shipped OxyVerse — a VTU resource platform now used by 1,000+ students across 15+ colleges.",
  },
  {
    year: "Shift",
    title: "Curiosity towards AI & backend",
    desc: "Moved towards AI, backend engineering and complete products — RAG, OCR, vector DBs, computer vision and multilingual AI.",
  },
  {
    year: "Now",
    title: "Full-stack & AI product builder",
    desc: "Full Stack Developer at Appsetz, building AI-first products and winning hackathons across Bengaluru.",
  },
];

export const experience: {
  role: string;
  org: string;
  period: string;
  link?: string;
  points: string[];
}[] = [
  {
    role: "Full Stack Developer",
    org: "Appsetz",
    period: "Oct 2025 – Present",
    link: "https://www.appsetz.pro/",
    points: [
      "Build responsive apps with React.js, Next.js, Node.js, Express.js, MongoDB & Tailwind CSS.",
      "Shipped Vriddhi Psychological Services and Implanto 365 (a clinic management system with records, scheduling & analytics).",
      "Built an SEO-optimized site for Sunwin Power Solutions, improving visibility and lead generation.",
    ],
  },
  {
    role: "Web Developer Intern",
    org: "Kiran Foundation",
    period: "Jan 2024 – Apr 2024",
    link: "https://kiran.foundation/",
    points: [
      "Developed and optimized the org website using Astro for performance and responsiveness.",
      "Built a dynamic blog module and customized the theme from Figma designs.",
      "Improved accessibility and UI consistency alongside the dev team.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Legal Saathi",
    tagline: "AI-powered multilingual legal assistant",
    description:
      "Legal document analysis, AI chat, OCR, voice interaction and legal form generation — grounded in your documents via RAG over Qdrant with OpenAI, Tesseract.js, Sarvam AI and Vapi. Winner of the AI Agent Builders Award 2026 (Most Impactful Use Case) and a HackBLR 2026 finalist.",
    stack: ["Next.js", "TypeScript", "Firebase", "OpenAI", "Qdrant", "Sarvam AI", "RAG"],
    image: "/images/project-legal-saathi.jpeg",
    github: "https://github.com/yadavahc/Hack-Blr",
    demo: "https://hack-blr-seven.vercel.app/",
    featured: true,
  },
  {
    name: "WattWatch",
    tagline: "Smart campus energy monitoring",
    description:
      "AI platform that optimizes campus energy and classroom management — occupancy detection, appliance monitoring, room confirmation, energy analytics and AI-generated insights using TensorFlow.js and Firebase. 2nd place at OxyHack 2026.",
    stack: ["Next.js", "Firebase", "TensorFlow.js", "OpenAI", "Computer Vision"],
    image: "/images/project-wattwatch.jpeg",
    github: "https://github.com/yadavahc/wattwatch",
    demo: "https://wattwatch-lemon.vercel.app/",
    featured: true,
  },
  {
    name: "Sense-AI",
    tagline: "AI career assistant",
    description:
      "Resume generation, cover letters, interview prep and personalized career guidance — Gemini AI on a scalable frontend that automates career workflows.",
    stack: ["Next.js", "Gemini AI", "Clerk", "PostgreSQL"],
    image: "/images/project-sense-ai.jpeg",
    github: "https://github.com/yadavahc/sense-ai",
    demo: "https://sense-ai-silk.vercel.app/",
  },
  {
    name: "OxyVerse — VTU",
    tagline: "Academic platform for 1,000+ students",
    description:
      "A centralized platform with VTU notes, model papers, scholarship updates and CGPA/SGPA calculators — serving 1,000+ students across 15+ colleges.",
    stack: ["HTML", "CSS", "JavaScript", "Firebase"],
    image: "/images/project-oxyverse.png",
    demo: "https://oxyverse-vtu-notes.netlify.app/",
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  image: string;
  kind: "award" | "cert";
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "AI Agent Builders Award 2026 — Most Impactful Use Case",
    issuer: "India's First AI Agent Builders Award · Legal Saathi",
    image: "/images/ach-ai-agent-award.jpg",
    kind: "award",
  },
  {
    title: "OCI AI Foundations Associate",
    issuer: "Oracle",
    image: "/images/cert-oracle-ai.png",
    kind: "cert",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0AAC00EEBB74D2A49548CEA6A5D1A11B5758BFF1BA8E5A6DB31AF0DB7C83A308",
  },
  {
    title: "AI Agent Architect",
    issuer: "IBM",
    image: "/images/cert-ibm-agent.png",
    kind: "cert",
  },
  {
    title: "Getting Started with AI",
    issuer: "IBM",
    image: "/images/cert-ibm-ai.png",
    kind: "cert",
    link: "https://www.credly.com/badges/773f7127-3396-423b-9a04-73edb458fd0a/public_url",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    image: "/images/cert-google-genai.png",
    kind: "cert",
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    image: "/images/cert-hr-sql.png",
    kind: "cert",
    link: "https://www.hackerrank.com/certificates/d44427be88ec",
  },
  {
    title: "CSS",
    issuer: "HackerRank",
    image: "/images/cert-hr-css.png",
    kind: "cert",
    link: "https://www.hackerrank.com/certificates/4f85306f4633",
  },
];

export const dsa = {
  kicker: "DSA Journey",
  heading: "Sharpening the way I think",
  blurb:
    "For me, DSA isn't just about interviews — it's about thinking logically, analyzing trade-offs, and designing efficient solutions.",
  stats: [
    { platform: "Take U Forward", count: 125, suffix: "+", image: "/images/dsa-tuf.png", color: "#ffffff", link: "https://takeuforward.org/profile/yadava_h_c" },
    { platform: "GeeksforGeeks", count: 100, suffix: "+", image: "/images/dsa-gfg.png", color: "#cfd4df", link: "https://www.geeksforgeeks.org/profile/yadavahc" },
    { platform: "LeetCode", count: 70, suffix: "+", image: "/images/dsa-leetcode.png", color: "#9aa1b0", link: "https://leetcode.com/u/uDbVJTA37J/" },
  ],
  streak: { label: "LeetCode 50 Days Badge", image: "/images/dsa-leetcode-50.png" },
};

export type Hackathon = {
  name: string;
  result: string;
  medal: "gold" | "silver" | "bronze" | "finalist";
  note: string;
  image: string;
};

export const hackathons: Hackathon[] = [
  {
    name: "HackBLR 2026",
    result: "Finalist · Top 30",
    medal: "finalist",
    note: "National-level hackathon — ranked among the Top 30 teams out of 2,000+ participants with Legal Saathi.",
    image: "/images/project-legal-saathi.jpeg",
  },
  {
    name: "OxyHack 2026",
    result: "2nd Place",
    medal: "silver",
    note: "Built WattWatch — 2nd place competing among 150+ teams at The Oxford College of Engineering.",
    image: "/images/hack-oxyhack-win.jpeg",
  },
  {
    name: "Cypher Quest 2026",
    result: "Finalist · Top 8",
    medal: "finalist",
    note: "National-level hackathon at DSATM — Top 8 of 200+ participants from 20+ colleges.",
    image: "/images/hack-cypher-finale.jpeg",
  },
  {
    name: "Devkreeda 2026",
    result: "2nd Place",
    medal: "silver",
    note: "Game Development competition at Anokha 2026, The Oxford College of Engineering.",
    image: "/images/hack-anokha-win.jpeg",
  },
  {
    name: "CSI Web Hackathon",
    result: "3rd Place",
    medal: "bronze",
    note: "Web hackathon — secured 3rd place.",
    image: "/images/hack-csi-cert.jpg",
  },
  {
    name: "Google Gemini Arena",
    result: "Winner · Top Prompt Creator",
    medal: "gold",
    note: "Pitch Night Edition — recognized as Top Prompt Creator and selected for the national dashboard by the Google Student Ambassador Network.",
    image: "/images/cert-google-prompt.jpeg",
  },
];

export const hackStats = [
  { label: "Out of 2,000+ at HackBLR", value: "Top 30" },
  { label: "Teams beaten at OxyHack", value: "150+" },
  { label: "Also 2nd — InnovateX Ideathon 2024, BMS College", value: "Winner ×3+" },
];

export type CommunityItem = {
  title: string;
  role: string;
  desc: string;
  image: string;
};

export const community: CommunityItem[] = [
  {
    title: "Youth For Seva — CHIGURU",
    role: "Volunteer",
    desc: "Supported government school children across Karnataka — mentoring students, renovating and painting schools, and community service.",
    image: "/images/comm-chiguru.jpeg",
  },
  {
    title: "Kiran Foundation",
    role: "Scholar & Volunteer",
    desc: "Helped select and evaluate Kiran Pratibha Scholarship applicants for Karnataka, built/maintained the website, and mentored students.",
    image: "/images/comm-kiran.jpeg",
  },
  {
    title: "E-Cell IIT Bombay — TOCE Chapter",
    role: "Core Member",
    desc: "Ran social media campaigns and supported entrepreneurship events with data-driven marketing strategies.",
    image: "/images/comm-ecell.jpeg",
  },
  {
    title: "Culture Club",
    role: "VP & Event Coordinator",
    desc: "Organized cultural events, workshops and student engagement activities across campus.",
    image: "/images/comm-vp-culture.png",
  },
  {
    title: "OxyVerse",
    role: "Builder",
    desc: "Making academic resources and scholarship information easier for students to access.",
    image: "/images/project-oxyverse.png",
  },
];

export const vision = {
  kicker: "Vision — Next 10 Years",
  heading: "Build technology millions rely on",
  paragraphs: [
    "Over the next ten years, my goal is to build AI-first products that solve meaningful problems at scale.",
    "I don't just want to become a software engineer — I want to become someone who builds technology that millions of people rely on.",
    "Whether it's education, healthcare, legal tech, or developer tools, I want to create products that have real impact and stand the test of time.",
  ],
  pillars: ["Education", "Healthcare", "Legal Tech", "Developer Tools"],
  polaris:
    "That's why I'm excited about the Polaris Fellowship. The fastest way to grow is to surround yourself with ambitious builders, learn from them, and constantly push your own limits. I'm eager to contribute, learn, and build alongside that kind of community.",
};
