const Routes = () => {
    return [
      {
        path: '/recipe/add',
        text: 'Add a Recipe',
        className: '',
        isAdmin: true,
      },
      {
        path: '/',
        text: 'View Recipes',
        className: '',
        isAdmin: false,
      },
      {
        path: '/login',
        text: 'Login',
        className: '',
        isAdmin: false,
      }
    ];
  };
  
  export default Routes();
  