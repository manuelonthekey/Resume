import React from 'react';
import ComicPanel from './ui/ComicPanel';

const InternshipArcs = () => {
  return (
    <section id="internship" style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="comic-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
        ISSUE #002 — FRIENDLY NEIGHBORHOOD DEVELOPER GOES CORPORATE
      </h2>

      <ComicPanel className="comic-parallelogram" style={{ display: 'flex', flexDirection: 'column', padding: '40px' }}>
        <div>
          {/* Header block for the job title */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--pitch-black)', paddingBottom: '15px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-comic)', color: 'var(--primary-red)', margin: 0, letterSpacing: '1px' }}>
                Software Development Engineering (SDE) Intern
              </h3>
              <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-comic)', color: 'var(--deep-blue)', margin: '5px 0 0 0', letterSpacing: '1px' }}>
                Rigzz Technologies — Kolkata, West Bengal
              </h4>
            </div>
            <div style={{ background: 'var(--pitch-black)', color: 'var(--off-white)', padding: '8px 15px', fontFamily: 'var(--font-comic)', fontSize: '1.2rem', transform: 'rotate(2deg)', boxShadow: '4px 4px 0 var(--comic-yellow)' }}>
              NOV 2025 – JAN 2026
            </div>
          </div>

          {/* Professional content bullet points */}
          <div style={{ fontFamily: 'var(--font-tech)', fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--pitch-black)' }}>
            <ul style={{ paddingLeft: '20px', listStyleType: 'square' }}>
              <li style={{ marginBottom: '12px' }}>
              Contributed to production-level engineering systems under the direct mentorship of the Head of Engineering, ensuring robust code quality and architectural integrity:
            </li>
            </ul>
            <ul style={{ paddingLeft: '20px', listStyleType: 'square' }}>
              <li style={{ marginBottom: '12px' }}>
                Developed and reviewed production-ready code supporting the build and deployment of client-facing and internal software systems.
              </li>
              <li>
                Collaborated directly with cross-functional teams to translate system requirements into scalable, clean technical designs in a live engineering environment.
              </li>
            </ul>
          </div>
        </div>
      </ComicPanel>
    </section>
  );
};

export default InternshipArcs;
