import React from 'react';
export default ({ children }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);