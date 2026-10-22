// GitHub API service for fetching repos and README content with caching and live URL parsing
import projectConfig from '../config/projects';

const GITHUB_USERNAME = 'manuelonthekey';
const API_BASE = 'https://api.github.com';
const CACHE_KEY_REPOS = `mm_gh_repos_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export const PANEL_COLORS = [
  'var(--primary-red)',
  'var(--electric-cyan)',
  'var(--comic-yellow)',
  'var(--glowing-green)',
  'var(--neon-purple)',
  'var(--deep-blue)',
];

// Common deployment platform URL patterns
const LIVE_URL_PATTERNS = [
  /https?:\/\/[\w.-]+\.netlify\.app[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.vercel\.app[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.github\.io\/[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.onrender\.com[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.render\.com[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.herokuapp\.com[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.surge\.sh[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.web\.app[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.firebaseapp\.com[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.railway\.app[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.fly\.dev[^\s)\]>"']*/i,
  /https?:\/\/[\w.-]+\.pages\.dev[^\s)\]>"']*/i,
  /https?:\/\/stackblitz\.com\/[^\s)\]>"']*/i,
];

// Helper to safely get from sessionStorage with TTL
function getSessionCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// Helper to set sessionStorage cache
function setSessionCache(key, data) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // sessionStorage might be full or disabled
  }
}

/**
 * Fetch all public repos for the configured GitHub user.
 */
export async function fetchRepos() {
  const cached = getSessionCache(CACHE_KEY_REPOS);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();
    const processed = repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description || '',
        htmlUrl: r.html_url,
        language: r.language || 'Code',
        stars: r.stargazers_count || 0,
        topics: r.topics || [],
        updatedAt: r.updated_at,
        homepage: r.homepage ? r.homepage.trim() : null,
      }));

    setSessionCache(CACHE_KEY_REPOS, processed);
    return processed;
  } catch (err) {
    console.warn('Failed to fetch repos from GitHub API:', err);
    return [];
  }
}

/**
 * Fetch the raw README content for a given repo.
 */
export async function fetchReadme(repoName) {
  const cacheKey = `mm_gh_readme_${repoName}`;
  const cached = getSessionCache(cacheKey);
  if (cached !== null && cached !== undefined) return cached;

  try {
    const res = await fetch(
      `${API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      { headers: { Accept: 'application/vnd.github.v3.raw' } }
    );
    if (!res.ok) {
      setSessionCache(cacheKey, '');
      return '';
    }
    const text = await res.text();
    setSessionCache(cacheKey, text);
    return text;
  } catch {
    return '';
  }
}

/**
 * Cleans extracted URLs by stripping trailing markdown / punctuation chars.
 */
function cleanUrl(url) {
  if (!url) return null;
  return url
    .trim()
    .replace(/[.,;:)\]>"']+$/, '')
    .trim();
}

/**
 * Parse README markdown and repo metadata to find a live demo URL.
 * Strictly adheres to finding a live deployed link.
 */
export function extractLiveUrl(readmeContent, homepage) {
  // 1. Check repo homepage field first (GitHub "About" website)
  if (homepage && typeof homepage === 'string' && homepage.startsWith('http')) {
    const clean = cleanUrl(homepage);
    // Ignore if it just points to the GitHub repo itself
    if (!clean.includes(`github.com/${GITHUB_USERNAME}`)) {
      return clean;
    }
  }

  if (!readmeContent || typeof readmeContent !== 'string') return null;

  // 2. Check for markdown links with Live / Demo / Website / App text:
  // e.g. [Live Demo](https://my-app.netlify.app) or [View App](https://...)
  const markdownLinkRegex = /\[(?:live(?:\s*demo|\s*link|\s*site|\s*app)?|demo|view\s*app|preview|website)[^\]]*\]\((https?:\/\/[^\s)]+)\)/i;
  const mdMatch = readmeContent.match(markdownLinkRegex);
  if (mdMatch && mdMatch[1]) {
    const link = cleanUrl(mdMatch[1]);
    // Ignore github repo links or badge image links
    if (!link.includes('github.com') && !link.includes('shields.io')) {
      return link;
    }
  }

  // 3. Check for labeled text: e.g. "Live Demo: https://..." or "Live Link: https://..."
  const textLabelRegex = /(?:live\s*(?:demo|link|url|app|site|preview)|demo\s*url|website)\s*[:=-]\s*<?(https?:\/\/[^\s>\)\]]+)/i;
  const textMatch = readmeContent.match(textLabelRegex);
  if (textMatch && textMatch[1]) {
    const link = cleanUrl(textMatch[1]);
    if (!link.includes('github.com') && !link.includes('shields.io')) {
      return link;
    }
  }

  // 4. Scan for known deployment platform domains
  for (const pattern of LIVE_URL_PATTERNS) {
    pattern.lastIndex = 0;
    const match = readmeContent.match(pattern);
    if (match && match[0]) {
      const link = cleanUrl(match[0]);
      // Avoid matching GitHub Pages of another user or raw assets
      if (!link.includes('raw.githubusercontent.com')) {
        return link;
      }
    }
  }

  return null;
}

/**
 * Format a raw repository name into a clean, display-ready comic title.
 */
export function formatRepoTitle(repoName) {
  return repoName
    .replace(/---/g, ': ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detect the primary tech stack from repo language + topics.
 */
export function detectTechStack(repo) {
  const techs = [];
  if (repo.language && repo.language !== 'Code') techs.push(repo.language);

  const topicMap = {
    react: 'React',
    nextjs: 'Next.js',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    nodejs: 'Node.js',
    express: 'Express',
    postgresql: 'PostgreSQL',
    postgres: 'PostgreSQL',
    prisma: 'Prisma',
    tailwindcss: 'Tailwind CSS',
    tailwind: 'Tailwind CSS',
    django: 'Django',
    python: 'Python',
    vite: 'Vite',
    mongodb: 'MongoDB',
    firebase: 'Firebase',
    html: 'HTML5',
    css: 'CSS3',
    pdfmake: 'pdfmake',
    api: 'REST API',
    llm: 'LLM APIs',
  };

  if (Array.isArray(repo.topics)) {
    for (const topic of repo.topics) {
      const mapped = topicMap[topic.toLowerCase()];
      if (mapped && !techs.includes(mapped)) techs.push(mapped);
    }
  }

  return techs.length > 0 ? techs.join(', ') : (repo.language || 'Full-Stack');
}

/**
 * Enrich a single repo with its README, live URL, and configuration overrides.
 */
export async function enrichRepo(repo, idx = 0) {
  const readme = await fetchReadme(repo.name);
  const detectedLiveUrl = extractLiveUrl(readme, repo.homepage);
  const overrides = projectConfig.overrides[repo.name] || {};

  // Live demo is present if found in README/homepage, or fallback override if explicitly provided
  const demoUrl = detectedLiveUrl || overrides.demo || null;

  return {
    id: repo.name,
    rawName: repo.name,
    title: overrides.title || formatRepoTitle(repo.name),
    tagline: overrides.tagline || repo.description || 'Full-Stack Software Architecture & Engineering Quest',
    description: overrides.description || repo.description || 'Interactive repository engineered with clean architecture, modern frontend frameworks, and robust API endpoints.',
    tech: overrides.tech || detectTechStack(repo),
    github: repo.htmlUrl,
    demo: demoUrl,
    stars: repo.stars || 0,
    language: repo.language,
    updatedAt: repo.updatedAt,
    color: PANEL_COLORS[idx % PANEL_COLORS.length],
  };
}

/**
 * Fetch and enrich the 3 chosen projects for the main page.
 */
export async function getShowcasedProjects(fallbackProjects = []) {
  try {
    const repos = await fetchRepos();
    if (!repos.length) return fallbackProjects;

    const hiddenSet = new Set((projectConfig.hidden || []).map((h) => h.toLowerCase()));
    const visibleRepos = repos.filter((r) => !hiddenSet.has(r.name.toLowerCase()));

    // Find the chosen showcased repos in the order configured
    const showcasedNames = (projectConfig.showcased || []).map((s) => s.toLowerCase());
    let selected = [];

    if (showcasedNames.length > 0) {
      for (const name of showcasedNames) {
        const found = visibleRepos.find((r) => r.name.toLowerCase() === name);
        if (found && !selected.some((s) => s.name === found.name)) {
          selected.push(found);
        }
      }
    }

    // If fewer than 3 were matched from showcased list, fill from the latest repos
    if (selected.length < 3) {
      for (const repo of visibleRepos) {
        if (!selected.some((s) => s.name === repo.name)) {
          selected.push(repo);
        }
        if (selected.length === 3) break;
      }
    }

    // Limit strictly to 3 on the main page
    selected = selected.slice(0, 3);

    return await Promise.all(selected.map((repo, idx) => enrichRepo(repo, idx)));
  } catch (err) {
    console.error('Failed to get showcased projects:', err);
    return fallbackProjects;
  }
}

/**
 * Check whether the user has chosen any side quests to showcase.
 */
export function hasSideQuests() {
  return Array.isArray(projectConfig.sideQuests) && projectConfig.sideQuests.length > 0;
}

/**
 * Fetch and enrich side quests for the "Other Missions and Side Quests" vault.
 * - Does NOT show the main 3 showcased repos.
 * - Only shows projects explicitly chosen in projectConfig.sideQuests.
 */
export async function getAllProjects(fallbackProjects = []) {
  if (!hasSideQuests()) {
    return [];
  }

  try {
    const repos = await fetchRepos();
    if (!repos.length) return fallbackProjects;

    const hiddenSet = new Set((projectConfig.hidden || []).map((h) => h.toLowerCase()));
    const showcasedSet = new Set((projectConfig.showcased || []).map((s) => s.toLowerCase()));
    
    // Available repos: not hidden and not already featured in the main 3
    const availableRepos = repos.filter(
      (r) => !hiddenSet.has(r.name.toLowerCase()) && !showcasedSet.has(r.name.toLowerCase())
    );

    const sideQuestNames = (projectConfig.sideQuests || []).map((s) => s.toLowerCase());
    let selected = [];

    for (const name of sideQuestNames) {
      const found = availableRepos.find((r) => r.name.toLowerCase() === name);
      if (found && !selected.some((s) => s.name === found.name)) {
        selected.push(found);
      }
    }

    return await Promise.all(selected.map((repo, idx) => enrichRepo(repo, idx)));
  } catch (err) {
    console.error('Failed to get side quests:', err);
    return fallbackProjects;
  }
}
