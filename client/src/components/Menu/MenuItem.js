import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MenuItem component.
 */
const MenuItem = ({ path, text }) => {
  return <Link to={path}>{text}</Link>
};

export default MenuItem;
