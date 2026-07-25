import React from 'react';
import ComicPanel from './ComicPanel';

const QuoteCard = ({ quote, author = "PETER PARKER" }) => {
  return (
    <ComicPanel className="quote-card spider-sense" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <h3 style={{ fontSize: '2rem', margin: 0 }}>"{quote}"</h3>
    </ComicPanel>
  );
};

export default QuoteCard;
