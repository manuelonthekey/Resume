import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OriginStory from './components/OriginStory';
import InternshipArcs from './components/InternshipArcs';
import Superpowers from './components/Superpowers';
import Missions from './components/Missions';
import Contact from './components/Contact';
import QuoteCard from './components/ui/QuoteCard';
import Timeline from './components/Timeline';
import SideQuests from './components/SideQuests';
import { hasSideQuests } from './services/github';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return (window.location.hash === '#side-quests' && hasSideQuests()) ? 'side-quests' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#side-quests' && hasSideQuests()) {
        setCurrentView('side-quests');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Basic easter egg logic for "Green Goblin" broken links or spider sense
    const handleBrokenLinks = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
        alert("Looks like Green Goblin sabotaged this link!");
      }
    };
    document.addEventListener('click', handleBrokenLinks);
    return () => document.removeEventListener('click', handleBrokenLinks);
  }, []);

  return (
    <div className="spider-verse-app" style={{ position: 'relative' }}>
      <div className="halftone-bg"></div>
      
      <Navigation
        onNavigateHome={() => setCurrentView('home')}
        currentView={currentView}
      />
      
      <main>
        {currentView === 'side-quests' ? (
          <SideQuests onNavigateHome={() => setCurrentView('home')} />
        ) : (
          <>
            <Hero />
            
            <QuoteCard quote="Anyone can write code. The hard part is owning the bugs." />
            
            <OriginStory />
            
            <QuoteCard quote="My MM-tingle? It usually activates five minutes before production crashes." />
            
            <InternshipArcs />

            <QuoteCard quote="Heroes save cities. Developers save production." />

            <Timeline />
            
            <Superpowers />

            <QuoteCard quote="The real villains aren't monsters. They're undocumented APIs." />
            
            <Missions onNavigateToSideQuests={() => setCurrentView('side-quests')} />
            
            <QuoteCard quote="Every deploy is a leap of faith." />
            
            <Contact />

            <QuoteCard quote="With great power comes great responsibility." />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
