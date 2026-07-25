import React from 'react';
import ComicPanel from './ui/ComicPanel';

const OriginStory = () => {
  return (
    <section id="origin" style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="comic-title" style={{ textAlign: 'center', marginBottom: '40px' }}>ISSUE #001 — THE ORIGIN STORY</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px', // Increased gap to prevent offset hover borders from overlapping
        padding: '0 20px'
      }}>
        
        {/* PANEL 1: EXECUTIVE PROFILE */}
        <ComicPanel className="comic-parallelogram" style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div> {/* Wrapper to apply internal counter-skew successfully */}
            <div style={{ background: 'var(--pitch-black)', color: 'var(--off-white)', padding: '5px 10px', fontFamily: 'var(--font-comic)', alignSelf: 'flex-start', display: 'inline-block',fontSize:'150%' , transform: 'rotate(-2deg)' }}>
              CHAPTER 1: THE EXECUTIVE PROFILE
            </div>
            <p style={{ marginTop: '20px', fontSize: '1.1rem', lineHeight: '1.6', fontFamily: 'var(--font-comic)', color: 'var(--pitch-black)' }}>
              Computer Science undergraduate by day, full-stack developer by night—building across modern web technologies, backend systems, databases, and AI-powered applications. Experience ranges from shipping end-to-end products to surviving the occasional production bug, all while learning that great software is built one iteration at a time.
            </p>
          </div>
        </ComicPanel>

        {/* PANEL 2: THE ACADEMY ARC */}
        <ComicPanel dark={true} className="comic-parallelogram dark" style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div>
            <div style={{ background: 'var(--off-white)', color: 'var(--pitch-black)', padding: '5px 10px', fontFamily: 'var(--font-comic)', alignSelf: 'flex-start', display: 'inline-block',fontSize:'150%' , transform: 'rotate(2deg)' }}>
              CHAPTER 2: THE ACADEMY ARC
            </div>
            <p style={{ marginTop: '20px', fontSize: '1.15rem', lineHeight: '1.8', fontFamily: 'var(--font-tech)', color: 'var(--off-white)' }}>
              Currently pursuing a B.Tech in Computer Science and Engineering at <strong style={{ color: 'var(--comic-yellow)', fontFamily: 'var(--font-comic)', fontSize: '1.4rem', textShadow: '2px 2px 0px black', letterSpacing: '1px' }}>VIT Bhopal</strong>, maintaining a <strong style={{ color: 'var(--comic-yellow)', fontFamily: 'var(--font-comic)', fontSize: '1.4rem', textShadow: '2px 2px 0px black', letterSpacing: '1px' }}>CGPA of 8.26/10</strong>. Side quests include mastering <strong style={{ color: 'var(--electric-cyan)', borderBottom: '2px dashed var(--electric-cyan)' }}>Data Structures and Algorithms</strong>, navigating <strong style={{ color: 'var(--electric-cyan)', borderBottom: '2px dashed var(--electric-cyan)' }}>Database Management Systems</strong>, building for the <strong style={{ color: 'var(--electric-cyan)', borderBottom: '2px dashed var(--electric-cyan)' }}>web</strong> and <strong style={{ color: 'var(--electric-cyan)', borderBottom: '2px dashed var(--electric-cyan)' }}>Android</strong>, and exploring <strong style={{ color: 'var(--electric-cyan)', borderBottom: '2px dashed var(--electric-cyan)' }}>Technology Entrepreneurship</strong>—along with discovering that debugging at 2 A.M. counts as both education and character development.
            </p>
          </div>
        </ComicPanel>

        {/* PANEL 3: ORIGIN STORY */}
        <ComicPanel className="comic-parallelogram" style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div>
            <div style={{ background: 'var(--pitch-black)', color: 'var(--off-white)', padding: '5px 10px', fontFamily: 'var(--font-comic)', alignSelf: 'flex-start', display: 'inline-block',fontSize:'150%' , transform: 'rotate(-1deg)' }}>
              CHAPTER 3: THE CALLING
            </div>
            <p style={{ marginTop: '20px', fontSize: '1.05rem', lineHeight: '1.5', fontFamily: 'var(--font-comic)', color: 'var(--pitch-black)', marginBottom: '20px' }}>
              It started with a simple question: "How does a website actually work?" What began as casually inspecting web pages soon turned into an obsession with reshaping interfaces, experimenting with layouts, and realizing that code isn't just about changing appearances—it's about giving life to ideas.
            </p>
            <div className="narration-box" style={{ background: 'var(--comic-yellow)', color: 'var(--pitch-black)', border: '3px solid #000', marginTop: '10px' }}>
              <strong>CURRENT MISSION:</strong> Seeking a full-time Software Development role to apply model and service deployment skills to production-scale problems—because with great code comes great technical debt. 😄
            </div>
          </div>
        </ComicPanel>

      </div>
    </section>
  );
};

export default OriginStory;
