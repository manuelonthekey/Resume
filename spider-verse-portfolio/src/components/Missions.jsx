import React from 'react';
import ComicPanel from './ui/ComicPanel';

const projects = [
  {
    issue: "#001",
    title: "CVPitch",
    tagline: "AI-Powered Resume Analyzer & Mock Interview Coach",
    description: "Built and deployed a full-stack platform supporting resume storage and job-specific evaluation workflows. Integrated OpenRouter LLM pipelines with SSE for real-time ATS scores and feedback.",
    tech: "React, Node.js, PostgreSQL, Prisma, OpenRouter",
    github: "https://github.com/manuelonthekey/ResumeAnalyzer",
    demo: "https://cvpitch.netlify.app/",
    color: "var(--primary-red)"
  },
  {
    issue: "#002",
    title: "FeastForecast",
    tagline: "Full-Stack Meal Planning & Pantry Management App",
    description: "Engineered a fuzzy-matching ingredient system to reduce database redundancy. Real-time synchronization between meal plans, pantry inventory, and user preferences.",
    tech: "React, TypeScript, Node.js, Express, PostgreSQL",
    github: "https://github.com/manuelonthekey/Meal-Planning-and-Recipe-App",
    demo: "https://feastforecast.netlify.app/",
    color: "var(--electric-cyan)"
  },
  {
    issue: "#003",
    title: "MønieGlitçh",
    tagline: "Frontend Web Application for Expense Tracking",
    description: "Responsive expense-tracking application supporting full CRUD operations and real-time balance calculations. Integrated pdfmake for transaction reports.",
    tech: "Vanilla JavaScript, CSS, pdfmake",
    github: "https://github.com/manuelonthekey/Personal-Finance-Tracker",
    demo: "https://mnieglitch.netlify.app/",
    color: "var(--comic-yellow)"
  }
];

const Missions = () => {
  return (
    <section id="missions" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="comic-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Active Missions (Projects)</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {projects.map((proj, idx) => (
          <ComicPanel key={idx} dark={idx % 2 !== 0} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${proj.color}`, paddingBottom: '10px', marginBottom: '15px' }}>
              <span style={{ fontFamily: 'var(--font-comic)', fontSize: '1.5rem', color: proj.color }}>ISSUE {proj.issue}</span>
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

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem', padding: '8px 16px', background: 'var(--pitch-black)', color: 'var(--off-white)', textDecoration: 'none' }}>
                GitHub
              </a>
              <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem', padding: '8px 16px', background: proj.color, color: 'var(--pitch-black)', textDecoration: 'none' }}>
                Live Demo
              </a>
            </div>
          </ComicPanel>
        ))}
      </div>
    </section>
  );
};

export default Missions;
