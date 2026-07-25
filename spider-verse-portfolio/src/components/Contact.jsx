import React, { useState } from 'react';
import ComicPanel from './ui/ComicPanel';
import { Mail, User, Code, FileText, Phone } from 'lucide-react';

const Contact = () => {
  const [clicked, setClicked] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      setIsFormOpen(true);
    }, 400);
  };

  return (
    <section id="contact" style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 className="comic-title" style={{ marginBottom: '20px' }}>Signal the Hero</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>Need a developer for your next mission? Send a signal.</p>

      <ComicPanel dark style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', background: 'var(--pitch-black)', borderColor: 'var(--primary-red)' }}>
        
        {/* Animated Mail Beacon Button */}
        <div 
          className="spider-sense" 
          style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'var(--primary-red)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: clicked ? 'scale(1.3) rotate(15deg)' : 'scale(1)'
          }} 
          onClick={handleClick}
        >
          <Mail size={40} color="var(--off-white)" />
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="mailto:manojit.education2021@gmail.com" className="comic-btn" style={{ fontSize: '1rem', textTransform: 'lowercase' }}>
            <Mail size={20} /> Email
          </a>
          <a href="tel:+919691630344" className="comic-btn" style={{ fontSize: '1rem' }}>
            <Phone size={20} /> Phone NO.
          </a>
          <a href="https://www.linkedin.com/in/manojit-maitra/" target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem' }}>
            <User size={20} /> LinkedIn
          </a>
          <a href="https://github.com/manuelonthekey" target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ fontSize: '1rem' }}>
            <Code size={20} /> GitHub
          </a>
        </div>
      </ComicPanel>

      {/* Web3Forms Signal Modal */}
      {isFormOpen && (
        <div className="modal-backdrop-animate" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(11, 11, 11, 0.85)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setIsFormOpen(false)}>
          <ComicPanel 
            className="comic-parallelogram dark feastforecast-modal modal-content-animate"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Close Button */}
              <button 
                onClick={() => setIsFormOpen(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-comic)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--comic-yellow)',
                  zIndex: 10
                }}
              >
                X
              </button>
              
              <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', fontFamily: 'var(--font-comic)', textAlign: 'left', letterSpacing: '1px' }}>
                SEND A SIGNAL
              </h3>
              
              <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="hidden" name="access_key" value="3aa27395-3b95-47c9-a773-4eb840c4f272" />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                  <label style={{ fontFamily: 'var(--font-comic)', fontSize: '1.2rem', letterSpacing: '1px' }}>YOUR NAME</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    style={{
                      padding: '10px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '1.1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                  <label style={{ fontFamily: 'var(--font-comic)', fontSize: '1.2rem', letterSpacing: '1px' }}>YOUR EMAIL</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    style={{
                      padding: '10px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '1.1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                  <label style={{ fontFamily: 'var(--font-comic)', fontSize: '1.2rem', letterSpacing: '1px' }}>MESSAGE</label>
                  <textarea 
                    name="message" 
                    required 
                    rows="4"
                    style={{
                      padding: '10px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '1.1rem',
                      resize: 'none'
                    }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="comic-btn" 
                  style={{ 
                    fontSize: '1.3rem', 
                    padding: '12px', 
                    width: '100%', 
                    justifyContent: 'center',
                    marginTop: '10px',
                    cursor: 'pointer'
                  }}
                >
                  SUBMIT SIGNAL
                </button>
              </form>
            </div>
          </ComicPanel>
        </div>
      )}

      <footer style={{ marginTop: '60px', fontFamily: 'var(--font-handwritten)', color: 'var(--primary-red)', fontSize: '1.2rem' }}>
        Designed with great power and great responsibility by Manojit Maitra © 2026
      </footer>
    </section>
  );
};

export default Contact;
