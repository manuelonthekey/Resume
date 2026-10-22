import React from 'react';
import { Network } from 'lucide-react';

const Navigation = ({ onNavigateHome, currentView = 'home' }) => {
  const handleNavClick = (sectionId) => {
    if (typeof onNavigateHome === 'function') {
      onNavigateHome();
    }
    // Allow React state to switch view before scrolling to hash
    setTimeout(() => {
      window.location.hash = sectionId.toLowerCase();
    }, 10);
  };

  return (
    <nav className="nav-container">
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('home');
        }}
        className="spider-sense"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--off-white)', fontWeight: 'bold', textDecoration: 'none' }}
      >
        <Network color="var(--primary-red)" />
        <span style={{ fontFamily: 'var(--font-comic)', fontSize: '1.5rem', letterSpacing: '2px', color: 'var(--off-white)' }}>
          MANOJIT-SENSE
        </span>
      </a>
      
      <ul className="nav-menu">
        {['Home', 'Origin', 'Powers', 'Missions', 'Timeline', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                if (currentView === 'side-quests') {
                  e.preventDefault();
                  handleNavClick(item);
                }
              }}
              className="comic-btn"
              style={{
                padding: '8px 16px',
                fontSize: '1rem',
                background: currentView === 'home' && item === 'Home' ? 'var(--primary-red)' : undefined,
              }}
            >
              {item}
            </a>
          </li>
        ))}

        <li>
          <a
            href="https://raw.githubusercontent.com/manuelonthekey/RESUME/main/ResumeManojitMaitra.pdf"
            download="ResumeManojitMaitra"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-btn"
            style={{ padding: '8px 16px', fontSize: '1rem', background: 'var(--primary-red)', color: 'var(--off-white)' }}
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
