import React from 'react';
import MenuItem from './MenuItem';
import Routes from '../../Routes';

import './MainMenu.css';

const MainMenu = () => {
  return (
    <div className="MainMenu-container">
      {Routes.map((route, index) => (
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
