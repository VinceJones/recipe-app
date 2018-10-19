import React from 'react';
import MenuItem from './MenuItem';

const MainMenu = ({ menuItems }) => {
  return (
    <div className="MainMenu-container">
      {menuItems.map((menuItem, index) => (
        <MenuItem
          key={index}
          menuClass={menuItem.className}
          path={menuItem.path}
          text={menuItem.text}
        />
      ))}
    </div>
  );
};

export default MainMenu;
