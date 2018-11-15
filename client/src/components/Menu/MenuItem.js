import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MenuItem component.
 */
const MenuItem = ({ menuClass, path, text }) => {
  return <Link className={menuClass} to={path}>{text}</Link>
};

export default MenuItem;
