/**
 * Portfolio Project Configuration
 * 
 * 1. `showcased`: Choose ANY 3 repositories from your GitHub to showcase on the main page!
 *    The main page will display these exact 3 in this order.
 * 
 * 2. `sideQuests`: Choose which additional projects to showcase in the "Other Missions and Side Quests" vault.
 *    - The main 3 projects are NEVER shown in Side Quests (no duplicates).
 *    - When this array is EMPTY [], the entire Side Quests feature (button & page) stays completely hidden!
 *    - To activate Side Quests, simply add any repo names here, e.g.: ['Personal-Finance-Tracker', 'ai-chatbot_JavaGPT'].
 * 
 * 3. `hidden`: Repositories that will NEVER appear anywhere in the portfolio.
 * 
 * 4. `overrides`: Custom titles, taglines, descriptions, or tech stack for specific repositories.
 */
const projectConfig = {
  // 🎯 YOUR 3 CHOSEN PROJECTS FOR THE MAIN PAGE
  showcased: [
    'ResumeAnalyzer',
    'Meal-Planning-and-Recipe-App',
    'Stumblr---Chapter-Readability-Checker',
  ],

  // 🗺️ SIDE QUESTS TO SHOWCASE (Leave EMPTY [] to hide Side Quests completely)
  // Add repository names here whenever you are ready to reveal additional side quests!
  // Example: sideQuests: ['Personal-Finance-Tracker', 'ai-chatbot_JavaGPT'],
  sideQuests: [],

  // 🙈 REPOSITORIES TO HIDE ENTIRELY
  hidden: [
    'RESUME',           // The portfolio repository itself
    'Resume',           // Redundant resume repo
    'manuelonthekey',   // GitHub profile readme repo
  ],

  // ✍️ OPTIONAL TITLE & TAGLINE CUSTOMIZATIONS
  // Customize the comic issue titles/taglines for any repository here.
  overrides: {
    'ResumeAnalyzer': {
      title: 'CVPitch',
      tagline: 'AI-Powered Resume Analyzer & Mock Interview Coach',
      description: 'Built and deployed a full-stack platform supporting resume storage and job-specific evaluation workflows. Integrated OpenRouter LLM pipelines with SSE for real-time ATS scores and feedback.',
      tech: 'React, Node.js, PostgreSQL, Prisma, OpenRouter',
      demo: 'https://cvpitch.netlify.app/',
    },
    'Meal-Planning-and-Recipe-App': {
      title: 'FeastForecast',
      tagline: 'Full-Stack Meal Planning & Pantry Management App',
      description: 'Engineered a fuzzy-matching ingredient system to reduce database redundancy. Real-time synchronization between meal plans, pantry inventory, and user preferences.',
      tech: 'React, TypeScript, Node.js, Express, PostgreSQL',
      demo: 'https://feastforecast.netlify.app/',
    },
    'Stumblr---Chapter-Readability-Checker': {
      title: 'Stmblr',
      tagline: 'Chapter Readability & Sentence Complexity Analyzer for Fiction Writers',
      description: 'Computes Flesch Reading Ease scores, breaks down complex vocabulary and passive voice, and ranks the 5 hardest sentences in any text to help writers simplify their prose.',
      tech: 'Java 21, Spring Boot, React 19, TypeScript, Tailwind CSS',
    },
    'Personal-Finance-Tracker': {
      title: 'MønieGlitçh',
      tagline: 'Frontend Web Application for Expense Tracking',
      description: 'Responsive expense-tracking application supporting full CRUD operations and real-time balance calculations. Integrated pdfmake for transaction reports.',
      tech: 'Vanilla JavaScript, CSS, pdfmake',
      demo: 'https://mnieglitch.netlify.app/',
    },
    'ai-chatbot_JavaGPT': {
      title: 'JavaGPT',
      tagline: 'Interactive AI Chatbot Built with Java & Modern APIs',
    },
    'MyDailyPlannerInterface': {
      title: 'Daily Planner UI',
      tagline: 'Productivity & Daily Task Planning Dashboard',
    },
    'Chemical-Equipment-Parameter-Visualizer': {
      title: 'EquipViz',
      tagline: 'Real-Time Chemical Equipment Parameter Visualizer',
    },
    'AI-Pushup_Trainer-main': {
      title: 'Pushup Trainer AI',
      tagline: 'Computer Vision Pose-Estimation Workout Assistant',
    },
    'college-discovery-platform': {
      title: 'CampusQuest',
      tagline: 'University Discovery, Ranking & Academic Platform',
    },
  },
};

export default projectConfig;
