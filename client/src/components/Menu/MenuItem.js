import React from 'react';

/**
 * MenuItem component.
 */
const MenuItem = ({path, text}) => {
  return (
    <a href={path}>
      <span>{text}</span>
    </a>
  );
};

export default MenuItem;
