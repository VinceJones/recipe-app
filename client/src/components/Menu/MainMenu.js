import React from 'react';
import MenuItem from './MenuItem';

import './MainMenu.css';

const MainMenu = ({ routes }) => {
  return (
    <div className="MainMenu-container">
      {routes.map((route, index) => (
        <MenuItem
          key={index}
          menuClass={route.className}
          path={route.path}
          text={route.text}
        />
      ))}
    </div>
  );
};

export default MainMenu;
