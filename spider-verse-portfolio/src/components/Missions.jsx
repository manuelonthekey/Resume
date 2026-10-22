import React, { useEffect, useState } from 'react';
import ComicPanel from './ui/ComicPanel';
import { getShowcasedProjects, hasSideQuests } from '../services/github';

// Hardcoded fallback data in case GitHub API is unreachable
const FALLBACK_PROJECTS = [
  {
    title: 'CVPitch',
    tagline: 'AI-Powered Resume Analyzer & Mock Interview Coach',
    description: 'Built and deployed a full-stack platform supporting resume storage and job-specific evaluation workflows. Integrated OpenRouter LLM pipelines with SSE for real-time ATS scores and feedback.',
    tech: 'React, Node.js, PostgreSQL, Prisma, OpenRouter',
    github: 'https://github.com/manuelonthekey/ResumeAnalyzer',
    demo: 'https://cvpitch.netlify.app/',
    color: 'var(--primary-red)',
  },
  {
    title: 'FeastForecast',
    tagline: 'Full-Stack Meal Planning & Pantry Management App',
    description: 'Engineered a fuzzy-matching ingredient system to reduce database redundancy. Real-time synchronization between meal plans, pantry inventory, and user preferences.',
    tech: 'React, TypeScript, Node.js, Express, PostgreSQL',
    github: 'https://github.com/manuelonthekey/Meal-Planning-and-Recipe-App',
    demo: 'https://feastforecast.netlify.app/',
    color: 'var(--electric-cyan)',
  },
  {
    title: 'Stmblr',
    tagline: 'Chapter Readability & Sentence Complexity Analyzer for Fiction Writers',
    description: 'Computes Flesch Reading Ease scores, breaks down complex vocabulary and passive voice, and ranks the 5 hardest sentences in any text to help writers simplify their prose.',
    tech: 'Java 21, Spring Boot, React 19, TypeScript, Tailwind CSS',
    github: 'https://github.com/manuelonthekey/Stumblr---Chapter-Readability-Checker',
    demo: null,
    color: 'var(--comic-yellow)',
  },
];

const Missions = ({ onNavigateToSideQuests }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadShowcased() {
      try {
        const data = await getShowcasedProjects(FALLBACK_PROJECTS);
        if (!cancelled) {
          setProjects(data && data.length > 0 ? data.slice(0, 3) : FALLBACK_PROJECTS);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load showcased missions:', err);
        if (!cancelled) {
          setProjects(FALLBACK_PROJECTS);
          setLoading(false);
        }
      }
    }

    loadShowcased();
    return () => { cancelled = true; };
  }, []);

  const handleSideQuestsClick = (e) => {
    e.preventDefault();
    if (typeof onNavigateToSideQuests === 'function') {
      onNavigateToSideQuests();
    }
    window.location.hash = 'side-quests';
  };

  return (
    <section id="missions" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="comic-title" style={{ textAlign: 'center', marginBottom: '15px' }}>
        Active Missions (Projects)
      </h2>
      <p style={{ textAlign: 'center', fontFamily: 'var(--font-comic)', color: 'var(--comic-yellow)', fontSize: '1.3rem', marginBottom: '40px', letterSpacing: '1px' }}>
        PRIORITY MISSIONS FROM THE CODING MULTIVERSE
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '45px',
            height: '45px',
            border: '5px solid var(--off-white)',
            borderTopColor: 'var(--primary-red)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontFamily: 'var(--font-comic)', fontSize: '1.6rem', marginTop: '20px', color: 'var(--comic-yellow)', letterSpacing: '1px' }}>
            SCANNING GITHUB FOR ACTIVE MISSIONS...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {/* Top 3 Showcased Projects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {projects.map((proj, idx) => (
              <ComicPanel key={proj.id || idx} dark={idx % 2 !== 0} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${proj.color}`, paddingBottom: '10px', marginBottom: '15px' }}>
                  <span style={{ fontFamily: 'var(--font-comic)', fontSize: '1.5rem', color: proj.color }}>
                    ISSUE #{String(idx + 1).padStart(3, '0')}
                  </span>
                  <div style={{ background: 'var(--comic-yellow)', color: 'var(--pitch-black)', padding: '2px 8px', fontFamily: 'var(--font-comic)', fontWeight: 'bold', border: '2px solid black', transform: 'rotate(5deg)' }}>
                    MISSION COMPLETED
                  </div>
                </div>

                <h3 style={{ fontSize: '2.2rem', marginBottom: '5px' }}>{proj.title}</h3>
                <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: idx % 2 !== 0 ? 'var(--electric-cyan)' : 'var(--primary-red)', marginBottom: '15px' }}>
                  {proj.tagline}
                </h4>

                <p style={{ flex: 1, fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '20px', color: idx % 2 !== 0 ? 'var(--off-white)' : 'var(--pitch-black)' }}>
                  {proj.description}
                </p>

                <div style={{ background: idx % 2 !== 0 ? 'var(--pitch-black)' : 'var(--off-white)', color: idx % 2 !== 0 ? 'var(--off-white)' : 'var(--pitch-black)', padding: '10px', border: '2px dashed gray' }}>
                  <strong>Tech Stack:</strong> {proj.tech}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem', padding: '8px 16px', background: 'var(--pitch-black)', color: 'var(--off-white)', textDecoration: 'none' }}>
                    GitHub
                  </a>
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem', padding: '8px 16px', background: proj.color, color: 'var(--pitch-black)', textDecoration: 'none' }}>
                      Live Demo
                    </a>
                  )}
                </div>
              </ComicPanel>
            ))}
          </div>

          {/* Clickable Banner to "Other Missions and Side Quests" (only if side quests are selected) */}
          {hasSideQuests() && (
            <div style={{ textAlign: 'center', marginTop: '55px' }}>
              <a
                href="#side-quests"
                onClick={handleSideQuestsClick}
                className="comic-btn"
                style={{
                  fontSize: '1.35rem',
                  padding: '16px 36px',
                  background: 'var(--comic-yellow)',
                  color: 'var(--pitch-black)',
                  border: '4px solid var(--pitch-black)',
                  boxShadow: '8px 8px 0px var(--primary-red)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  letterSpacing: '2px',
                  transform: 'rotate(-1deg)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>🕸️</span>
                <span>OTHER MISSIONS AND SIDE QUESTS</span>
                <span style={{ fontSize: '1.6rem' }}>➔</span>
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Missions;
