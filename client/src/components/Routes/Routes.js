const Routes = () => {
    return [
      {
        path: '/recipe/add',
        text: 'Add a Recipe',
        className: 'menu__item',
        showWhenLoggedOut: false,
        showWhenLoggedIn: true,
      },
      {
        path: '/',
        text: 'View Recipes',
        className: 'menu__item',
        showWhenLoggedOut: true,
        showWhenLoggedIn: true,
      },
      {
        path: '/login',
        text: 'Login',
        className: 'menu__item',
        showWhenLoggedOut: true,
        showWhenLoggedIn: false,
      }
    ];
  };
  
  export default Routes();
  