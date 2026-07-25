import React from 'react';

const ComicPanel = ({ children, className = '', dark = false, onClick }) => {
  return (
    <div className={`comic-panel ${dark ? 'dark' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default ComicPanel;
