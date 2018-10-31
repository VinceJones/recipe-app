import React from 'react';
import MenuItem from './MenuItem';
import Routes from '../../Routes';

import './MainMenu.css';

const MainMenu = ({ userUtility }) => {
  let routes = Routes;

  if (userUtility.isUserAdmin === false) {
    routes = routes.filter((route, index) => {
      return !route.isAdmin;
    });
  }

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
