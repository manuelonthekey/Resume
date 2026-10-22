import React, { useEffect, useState, useMemo } from 'react';
import ComicPanel from './ui/ComicPanel';
import { getAllProjects } from '../services/github';
import { ArrowLeft, Search, Star, ExternalLink, Filter, Sparkles } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const SideQuests = ({ onNavigateHome }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    let cancelled = false;

    // Scroll to top immediately when view opens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    async function loadAll() {
      try {
        const data = await getAllProjects();
        if (!cancelled) {
          setProjects(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load all projects:', err);
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  const handleBack = (e) => {
    if (e) e.preventDefault();
    if (typeof onNavigateHome === 'function') {
      onNavigateHome();
    }
    window.location.hash = 'missions';
  };

  // Extract unique languages for filter chips
  const languages = useMemo(() => {
    const langs = new Set();
    projects.forEach((p) => {
      if (p.language && p.language !== 'Code') langs.add(p.language);
    });
    return Array.from(langs);
  }, [projects]);

  // Filtered projects based on search query and active filter
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.rawName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'WITH_DEMO') return Boolean(p.demo);
      return p.language === activeFilter;
    });
  }, [projects, searchQuery, activeFilter]);

  const liveDemosCount = useMemo(() => {
    return projects.filter((p) => Boolean(p.demo)).length;
  }, [projects]);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px 80px', maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
      
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
        <button
          onClick={handleBack}
          className="comic-btn"
          style={{
            fontSize: '1.1rem',
            padding: '10px 22px',
            background: 'var(--primary-red)',
            color: 'var(--off-white)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={20} />
          <span>BACK TO MAIN UNIVERSE</span>
        </button>

        <div style={{ fontFamily: 'var(--font-comic)', fontSize: '1.2rem', color: 'var(--comic-yellow)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} color="var(--electric-cyan)" />
          <span>GITHUB ARCHIVE: @MANUELONTHEKEY</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--comic-yellow)',
          color: 'var(--pitch-black)',
          padding: '6px 18px',
          fontFamily: 'var(--font-comic)',
          fontSize: '1.4rem',
          border: '3px solid black',
          transform: 'rotate(-2deg)',
          marginBottom: '15px',
          boxShadow: '4px 4px 0px var(--primary-red)',
        }}>
          MULTIVERSE REPOSITORY VAULT
        </div>

        <h1 className="comic-title" style={{ fontSize: '3.6rem', marginBottom: '10px', display: 'block' }}>
          OTHER MISSIONS & SIDE QUESTS
        </h1>

        <p style={{ fontFamily: 'var(--font-tech)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto 20px', color: 'var(--off-white)', lineHeight: '1.6' }}>
          Every experiment, tool, and full-stack project built across the Multiverse. Repositories with live deployment links in their README are automatically unlocked with a <strong style={{ color: 'var(--comic-yellow)' }}>Live Demo</strong> button.
        </p>

        {/* Counter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--pitch-black)', border: '2px solid var(--electric-cyan)', color: 'var(--electric-cyan)', padding: '6px 14px', borderRadius: '20px', fontFamily: 'var(--font-tech)', fontSize: '0.95rem', fontWeight: 'bold' }}>
            📦 {projects.length} Total Repositories
          </span>
          <span style={{ background: 'var(--pitch-black)', border: '2px solid var(--glowing-green)', color: 'var(--glowing-green)', padding: '6px 14px', borderRadius: '20px', fontFamily: 'var(--font-tech)', fontSize: '0.95rem', fontWeight: 'bold' }}>
            🚀 {liveDemosCount} Live Deployed Apps
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div style={{
        background: 'var(--pitch-black)',
        border: '3px solid var(--primary-red)',
        boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
        padding: '20px',
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <Search size={20} color="var(--comic-yellow)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search missions by name, keyword, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid var(--comic-yellow)',
                borderRadius: '6px',
                color: 'var(--off-white)',
                fontFamily: 'var(--font-tech)',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Clear Search if active */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="comic-btn"
              style={{ padding: '8px 14px', fontSize: '0.9rem', background: 'var(--primary-red)', color: 'var(--off-white)' }}
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-comic)', color: 'var(--comic-yellow)', fontSize: '1.1rem', marginRight: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={16} /> FILTER:
          </span>

          <button
            onClick={() => setActiveFilter('ALL')}
            className="comic-btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.9rem',
              background: activeFilter === 'ALL' ? 'var(--comic-yellow)' : 'var(--pitch-black)',
              color: activeFilter === 'ALL' ? 'var(--pitch-black)' : 'var(--off-white)',
              border: '2px solid var(--comic-yellow)',
            }}
          >
            ALL ({projects.length})
          </button>

          <button
            onClick={() => setActiveFilter('WITH_DEMO')}
            className="comic-btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.9rem',
              background: activeFilter === 'WITH_DEMO' ? 'var(--glowing-green)' : 'var(--pitch-black)',
              color: activeFilter === 'WITH_DEMO' ? 'var(--pitch-black)' : 'var(--off-white)',
              border: '2px solid var(--glowing-green)',
            }}
          >
            🚀 WITH LIVE DEMO ({liveDemosCount})
          </button>

          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveFilter(lang)}
              className="comic-btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.9rem',
                background: activeFilter === lang ? 'var(--electric-cyan)' : 'var(--pitch-black)',
                color: activeFilter === lang ? 'var(--pitch-black)' : 'var(--off-white)',
                border: '2px solid var(--electric-cyan)',
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '50px',
            height: '50px',
            border: '5px solid var(--off-white)',
            borderTopColor: 'var(--primary-red)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontFamily: 'var(--font-comic)', fontSize: '1.8rem', marginTop: '20px', color: 'var(--comic-yellow)', letterSpacing: '1px' }}>
            DECRYPTING MULTIVERSE ARCHIVES FROM GITHUB...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--pitch-black)',
          border: '3px dashed var(--primary-red)',
          margin: '20px auto',
          maxWidth: '650px',
        }}>
          <h3 style={{ fontFamily: 'var(--font-comic)', fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '10px' }}>
            NO MISSIONS DETECTED IN THIS TIMELINE!
          </h3>
          <p style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', color: 'var(--off-white)', marginBottom: '20px' }}>
            No repositories matched your current filter "{activeFilter}" or search term "{searchQuery}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('ALL'); }}
            className="comic-btn"
            style={{ padding: '10px 20px', fontSize: '1rem', background: 'var(--comic-yellow)', color: 'var(--pitch-black)' }}
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        /* Repository Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {filteredProjects.map((proj, idx) => (
            <ComicPanel key={proj.id || idx} dark={idx % 2 !== 0} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Header: Issue # and Stars / Demo status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${proj.color}`, paddingBottom: '10px', marginBottom: '15px' }}>
                <span style={{ fontFamily: 'var(--font-comic)', fontSize: '1.4rem', color: proj.color }}>
                  ARCHIVE #{String(idx + 1).padStart(3, '0')}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {proj.stars > 0 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--pitch-black)', border: '2px solid var(--comic-yellow)', color: 'var(--comic-yellow)', padding: '2px 8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      <Star size={12} fill="var(--comic-yellow)" /> {proj.stars}
                    </span>
                  )}
                  {proj.demo ? (
                    <div style={{ background: 'var(--glowing-green)', color: 'var(--pitch-black)', padding: '2px 8px', fontFamily: 'var(--font-comic)', fontWeight: 'bold', border: '2px solid black', fontSize: '0.85rem' }}>
                      LIVE DEMO
                    </div>
                  ) : (
                    <div style={{ background: 'var(--primary-red)', color: 'var(--off-white)', padding: '2px 8px', fontFamily: 'var(--font-comic)', fontWeight: 'bold', border: '2px solid black', fontSize: '0.85rem' }}>
                      SOURCE ONLY
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 style={{ fontSize: '1.9rem', marginBottom: '6px', wordBreak: 'break-word' }}>
                {proj.title}
              </h3>

              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', color: idx % 2 !== 0 ? 'var(--electric-cyan)' : 'var(--primary-red)', marginBottom: '15px', lineHeight: '1.4' }}>
                {proj.tagline}
              </h4>

              {/* Description */}
              <p style={{ flex: 1, fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '20px', color: idx % 2 !== 0 ? 'var(--off-white)' : 'var(--pitch-black)' }}>
                {proj.description}
              </p>

              {/* Tech Stack */}
              <div style={{ background: idx % 2 !== 0 ? 'var(--pitch-black)' : 'var(--off-white)', color: idx % 2 !== 0 ? 'var(--off-white)' : 'var(--pitch-black)', padding: '10px', border: '2px dashed gray', fontSize: '0.9rem', marginBottom: '18px' }}>
                <strong>Tech:</strong> {proj.tech}
              </div>

              {/* Actions: GitHub always, Live Demo conditionally */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-btn"
                  style={{
                    fontSize: '0.95rem',
                    padding: '8px 16px',
                    background: 'var(--pitch-black)',
                    color: 'var(--off-white)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <GithubIcon size={16} /> GitHub
                </a>

                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="comic-btn"
                    style={{
                      fontSize: '0.95rem',
                      padding: '8px 16px',
                      background: proj.color,
                      color: 'var(--pitch-black)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 'bold',
                    }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </ComicPanel>
          ))}
        </div>
      )}

      {/* Bottom Return Button */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <button
          onClick={handleBack}
          className="comic-btn"
          style={{
            fontSize: '1.25rem',
            padding: '14px 30px',
            background: 'var(--primary-red)',
            color: 'var(--off-white)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: '4px solid var(--pitch-black)',
            boxShadow: '6px 6px 0px var(--comic-yellow)',
          }}
        >
          <ArrowLeft size={22} />
          <span>RETURN TO MAIN UNIVERSE</span>
        </button>
      </div>
    </div>
  );
};

export default SideQuests;
