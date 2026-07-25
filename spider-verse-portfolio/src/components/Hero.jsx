import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

// Import images so Vite processes and hashes them correctly for deployment
import hero1 from '../assets/images/hero1.png';
import hero2 from '../assets/images/hero2.png';
import panel3 from '../assets/images/panel3.jpeg';
import panel4 from '../assets/images/panel4.jpeg';
import panel5 from '../assets/images/panel5.jpg';
import panel6 from '../assets/images/panel6.jpg';

const Hero = () => {
  const posterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.1
    });

    if (posterRef.current) {
      observer.observe(posterRef.current);
    }

    return () => {
      if (posterRef.current) {
        observer.unobserve(posterRef.current);
      }
    };
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px', position: 'relative' }}>
      
      {/* Global Section Heading */}
      <div style={{ textAlign: 'left', maxWidth: '1400px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <h1 className="comic-title" style={{ fontSize: '4rem', display: 'block' }}>MANOJIT MAITRA: THE FRIENDLY NEIGHBORHOOD DEVELOPER</h1>
        <h2 style={{ color: 'var(--comic-yellow)', marginTop: '10px', fontFamily: 'var(--font-comic)', fontSize: '2rem', textTransform: 'none', letterSpacing: '1px' }}>
          Building Apps, one line of code at a time.
        </h2>
      </div>

      <div ref={posterRef} className={`poster-container ${isVisible ? 'is-visible' : ''}`} id="poster">
        
        {/* Panel 1 (Top / Red) */}
        <div className="panel panel-1">
          <img src={hero1} alt="Varsity Jacket Intro" className="hero-img-1" />
          <div className="bubble bubble-main delay-1">
            HI, I'M MANOJIT MAITRA.<br />
            FULL-STACK DEVELOPER BY DAY.<br />
            BUG HUNTER BY NIGHT.
            <div className="tail-left"></div>
          </div>
        </div>

        {/* Panel 2 (Yellow) */}
        <div className="panel panel-2">
          <img src={hero2} alt="Thumbs up" className="hero-img-2" />
          <div className="bubble bubble-large delay-2">
            OH YEAH... <br />
            THESE ARE MY PROFILES
            <div className="tail-right"></div>
          </div>
          <div className="bubble-group-right">
            <a href="https://leetcode.com/u/manuelonthekey/" target="_blank" rel="noopener noreferrer" className="bubble bubble-small delay-3">LEETCODE
              <div className="tail-right"></div>
            </a>
            <a href="https://github.com/manuelonthekey" target="_blank" rel="noopener noreferrer" className="bubble bubble-small delay-4">
              GITHUB
              <div className="tail-right"></div>
            </a>
            <a href="https://www.linkedin.com/in/manojit-maitra/" target="_blank" rel="noopener noreferrer" className="bubble bubble-small delay-5">
              LINKEDIN
              <div className="tail-right"></div>
            </a>
          </div>
        </div>

        {/* Panel 3 (Row 3 Left) */}
        <div className="panel panel-3">
          <img src={panel3} alt="Walking to engineering" className="panel-bg" />
          <div className="caption-box delay-6">
            A FINE DAY, PROJECTS WORKING, NO BUGS
          </div>
        </div>

        {/* Panel 4 (Row 3 Right) */}
        <div className="panel panel-4">
          <img src={panel4} alt="Intense stare" className="panel-bg" />
          <div className="caption-vertical delay-7">
            SUDDENLY
          </div>
        </div>

        {/* Panel 5 (Row 4 Left) */}
        <div className="panel panel-5">
          <img src={panel5} alt="Putting on mask" className="panel-bg" />
        </div>

        {/* Panel 6 (Row 4 Right) */}
        <div className="panel panel-6">
          <img src={panel6} alt="Coding" className="panel-bg" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
