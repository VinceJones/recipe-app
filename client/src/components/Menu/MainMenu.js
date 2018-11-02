import React from 'react';
import MenuItem from './MenuItem';
import Routes from '../../Routes';
import userServiceSingleton from '../UserService';

import './MainMenu.css';
import Button from '../Button/Button';

const MainMenu = () => {
  let routes = Routes;

  if (userServiceSingleton.isUserAdmin) {
    routes = routes.filter((route, index) => {
      return route.showWhenLoggedIn;
    });
  } else {
    routes = routes.filter((route, index) => {
      return route.showWhenLoggedOut;
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
      {userServiceSingleton.isUserAdmin && (
        <Button
          text="Logout"
          link="#"
          className="btn btn_secondary"
          isBtn={true}
          onClick={() => userServiceSingleton.logout()}
        />
      )}
    </div>
  );
};

export default MainMenu;
