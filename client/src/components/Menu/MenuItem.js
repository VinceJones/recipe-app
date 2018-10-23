import React from 'react';
import Button from '../Button/Button';

/**
 * MenuItem component.
 */
const MenuItem = ({ path, text }) => {
  return <Button className="MainMenu-menuItem" link={path} text={text} />;
};

export default MenuItem;
