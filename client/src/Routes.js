const Routes = () => {
    return [
      {
        path: '/recipe/add',
        text: 'Add a Recipe',
        className: '',
        showWhenLoggedOut: false,
        showWhenLoggedIn: true,
      },
      {
        path: '/',
        text: 'View Recipes',
        className: '',
        showWhenLoggedOut: true,
        showWhenLoggedIn: true,
      },
      {
        path: '/login',
        text: 'Login',
        className: '',
        showWhenLoggedOut: true,
        showWhenLoggedIn: false,
      }
    ];
  };
  
  export default Routes();
  