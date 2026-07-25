import React from 'react';

const timelineEvents = [
  { year: "2021", event: "Completed ICSE - 92.4%", side: "left" },
  { year: "2023", event: "Completed ISC - 88.6%", side: "right" },
  { year: "Sep 2023", event: "Started B.Tech CSE at VIT Bhopal", side: "left" },
  { year: "Mar 2024", event: "Operations Lead - The Bengali Club", side: "right" },
  { year: "Oct 2024", event: "Volunteer - NCC Tree Plantation", side: "left" },
  { year: "Feb 2025", event: "Technical Core Member - iCreate Club", side: "right" },
  { year: "Nov 2025", event: "SDE Intern - Rigzz Technologies", side: "left" }
];

const Timeline = () => {
  return (
    <section id="timeline" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      <h2 className="comic-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Earth 2005- TimeLine</h2>
      
      <div style={{ position: 'relative' }}>
        {/* Central Web Strand */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '100%', background: 'var(--primary-red)', zIndex: 0 }}></div>

        {timelineEvents.map((evt, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            justifyContent: evt.side === 'left' ? 'flex-start' : 'flex-end',
            marginBottom: '40px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Timeline Node */}
            <div style={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '20px', 
              height: '20px', 
              background: 'var(--comic-yellow)', 
              border: '4px solid var(--pitch-black)', 
              borderRadius: '50%',
              top: '15px'
            }}></div>

            <div className="comic-panel spider-sense" style={{ 
              width: '45%', 
              padding: '15px', 
              background: evt.side === 'left' ? 'var(--deep-blue)' : 'var(--off-white)',
              color: evt.side === 'left' ? 'var(--off-white)' : 'var(--pitch-black)',
              borderWidth: '4px',
              transform: `rotate(${evt.side === 'left' ? '-2deg' : '2deg'})`
            }}>
              <h4 style={{ color: evt.side === 'left' ? 'var(--electric-cyan)' : 'var(--primary-red)', fontSize: '1.2rem', marginBottom: '5px' }}>{evt.year}</h4>
              <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-tech)' }}>{evt.event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
