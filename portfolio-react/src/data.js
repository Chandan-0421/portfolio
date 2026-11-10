// =====================================================================
// All portfolio content lives here. Edit this file to update the site.
// (Tailwind class strings are written out in full on purpose — Tailwind
//  only keeps classes it can find as complete strings in the source.)
// =====================================================================

export const PROFILE = {
  name: 'Chandan Singh',
  tagline: 'Building the Future',
  linkedin: 'https://www.linkedin.com/in/chandan-singh-729300249/',
  github: 'https://github.com/Chandan-0421',
  email: 'chandansingh212805@gmail.com',
  resume: '/Chandan_Resume.pdf', // put the PDF in /public
  resumeDownloadName: 'Chandan_Singh_Resume.pdf',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// ---------- About ----------
export const ABOUT_TEXT =
  'B.Tech CSE graduate (2026) from G.H. Raisoni University, Amravati — passionate about building things that matter. I sit at the intersection of web development and machine learning, constantly exploring how AI can make the web smarter and more secure.';

export const SKILL_GROUPS = [
  {
    title: 'Web Development',
    valueCls: 'text-indigo-600 dark:text-indigo-400',
    barCls: 'from-indigo-500 to-cyan-400',
    items: [
      { name: 'Node.js / Express', value: 90 },
      { name: 'HTML / CSS / JS', value: 92 },
      { name: 'MongoDB / REST APIs', value: 85 },
    ],
  },
  {
    title: 'Machine Learning',
    valueCls: 'text-cyan-600 dark:text-cyan-400',
    barCls: 'from-cyan-400 to-emerald-400',
    items: [
      { name: 'TensorFlow / PyTorch', value: 75 },
      { name: 'NLP / Hugging Face', value: 72 },
      { name: 'Scikit-learn / FastAPI', value: 78 },
    ],
  },
];

export const EDUCATION = [
  {
    period: '2022 — 2026',
    title: 'B.Tech — Computer Science',
    place: 'G.H Raisoni University, Amravati',
    badge: 'CGPA: 8.48',
    dotCls: 'bg-indigo-500',
    periodCls: 'text-indigo-600 dark:text-indigo-400',
    badgeCls: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    period: '2022',
    title: 'Class XII',
    place: 'Insight Junior College, Nagpur',
    badge: '86.67%',
    dotCls: 'bg-cyan-500',
    periodCls: 'text-cyan-600 dark:text-cyan-400',
    badgeCls: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
];

export const ACHIEVEMENTS = [
  {
    title: '50+ LeetCode Problems',
    subtitle: 'DSA & SQL Challenges',
    iconWrap: 'bg-orange-500/10 text-orange-500 dark:text-orange-400',
    hover: 'group-hover:text-orange-500 dark:group-hover:text-white',
    paths: ['M13 10V3L4 14h7v7l9-11h-7z'],
    delay: 'delay-100',
  },
  {
    title: 'AI for Beginners — HP LIFE',
    subtitle: 'Certified Online Course',
    iconWrap: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400',
    hover: 'group-hover:text-indigo-500 dark:group-hover:text-white',
    paths: [
      'M12 14l9-5-9-5-9 5 9 5z',
      'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    ],
    delay: 'delay-200',
  },
  {
    title: 'Thesis: Phishing Detection with NLP',
    subtitle: 'Final Year Research Project',
    iconWrap: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
    hover: 'group-hover:text-emerald-500 dark:group-hover:text-white',
    paths: [
      'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    ],
    delay: 'delay-300',
  },
  {
    title: 'AI & ML Workshops at VNIT',
    // TODO: "DEF Institute" looks like a placeholder — put the real organiser name.
    subtitle: 'Organized by DEF Institute',
    iconWrap: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
    hover: 'group-hover:text-zinc-500 dark:group-hover:text-white',
    paths: ['M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'],
    delay: 'delay-400',
  },
];

// ---------- Projects ----------
// Screenshots: drop images into /public/projects/ using the file names below
// (any missing image falls back to a styled mock-up automatically).
//   <slug>-desktop.png  → wide browser screenshot (16:10 works best)
//   <slug>-mobile.png   → phone screenshot (9:19 works best)
export const MORE_PROJECTS_URL = PROFILE.github;

export const PROJECTS = [
  {
    slug: 'phishguard',
    title: 'Real-Time Phishing Detection',
    accentBar: 'bg-violet-500',
    accentBg: 'from-violet-600 to-indigo-800',
    description:
      'Intelligent Chrome extension powered by an ML pipeline that extracts lexical, host-based and NLP features to classify URLs as Safe or Phishing in real time — protecting users from zero-day attacks. Final year thesis project.',
    highlights: [
      'Three detection layers: NLP heuristics, page-content analysis and an LLM check',
      '353,637+ URLs · 95.3% accuracy · 95.7% F1 score',
      'Sub-1.5s responses on a warm server, sub-10ms for cached URLs',
    ],
    stack: ['FastAPI', 'ML Pipeline', 'NLP', 'Llama 3 · Groq', 'Chrome Extension'],
    // Only a source link exists right now. Add `demo: 'https://…'` (e.g. the Edge/Chrome store page) once it is live.
    demo: null,
    code: 'https://github.com/Chandan-0421/phishguard-Frontend/tree/main/phishguard-extension-frontend',
    preview: 'detection-log', // shows the detection log when no screenshot is available
    detectionLog: [
      { url: 'phishing-login.net', safe: false },
      { url: 'github.com', safe: true },
      { url: 'secure-bank99.tk', safe: false },
      { url: 'google.com', safe: true },
      { url: 'paypal-verify.ml', safe: false },
    ],
    images: { desktop: '/projects/phishguard-desktop.png', mobile: '/projects/phishguard-mobile.png' },
  },
  {
    slug: 'devpulse',
    title: 'DevPulse',
    accentBar: 'bg-emerald-500',
    accentBg: 'from-emerald-500 to-teal-800',
    description:
      'Real-time GitHub analytics dashboard, built and deployed from scratch. Live activity is pushed to the browser over WebSockets, with Redis pub/sub keeping everything in sync.',
    highlights: [
      'Live updates through WebSockets and Redis pub/sub (Upstash)',
      'Secure sign-in with GitHub OAuth',
      'Deployed end-to-end: React frontend on Vercel, Node.js backend on Render',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'WebSockets', 'Redis', 'GitHub OAuth'],
    demo: 'https://dev-pulse-github.vercel.app',
    // TODO: add the GitHub repo link → code: 'https://github.com/Chandan-0421/<repo>',
    code: null,
    images: { desktop: '/projects/devpulse-desktop.png', mobile: '/projects/devpulse-mobile.png' },
  },
  {
    slug: 'travelgen',
    title: 'AI Tourist Guide',
    accentBar: 'bg-orange-500',
    accentBg: 'from-orange-500 to-rose-700',
    description:
      'Smart recommendation engine with real-time budget management. Uses LLMs to generate personalized travel itineraries and dynamically optimize trip expenses.',
    highlights: [
      'LLM-generated, personalized travel itineraries',
      'Real-time budget tracking with dynamic expense optimization',
    ],
    stack: ['LLMs', 'AI Agents', 'Full-Stack'],
    demo: 'https://travelgen-ai.vercel.app/',
    code: 'https://github.com/Chandan-0421/TravelGenAI',
    images: { desktop: '/projects/travelgen-desktop.png', mobile: '/projects/travelgen-mobile.png' },
  },
  {
    slug: 'wanderlust',
    title: 'WanderLust',
    accentBar: 'bg-sky-500',
    accentBg: 'from-sky-500 to-blue-800',
    description:
      'Full-stack travel platform with 200+ sign-ups, built on a RESTful MVC architecture with JWT and Passport.js authentication.',
    highlights: ['200+ user sign-ups', '40% faster image loading', '30% better API response time'],
    stack: ['Node.js', 'MongoDB', 'JWT Auth', 'Passport.js'],
    // TODO: add real links — buttons and the "visit" cursor only appear when a link is set.
    demo: null,
    code: null,
    images: { desktop: '/projects/wanderlust-desktop.png', mobile: '/projects/wanderlust-mobile.png' },
  },
];

// ---------- Hero ----------
export const HERO_STATS = [
  { value: '95.3%', label: 'Phishing detection accuracy' },
  { value: '200+', label: 'WanderLust sign-ups' },
  { value: '50+', label: 'LeetCode problems solved' },
  { value: String(PROJECTS.length), label: 'Featured projects' },
];

export const TECH_MARQUEE = [
  'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Python', 'FastAPI',
  'TensorFlow', 'PyTorch', 'Hugging Face', 'Scikit-learn', 'Redis', 'WebSockets', 'Groq API',
];
