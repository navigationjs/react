import React from 'react';
export default ({ children, style = {} }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);
