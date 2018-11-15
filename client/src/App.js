import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import FormPage from './components/Page/FormPage/FormPage';
import ListPage from './components/Page/ListPage/ListPage';
import LoginPage from './components/Page/Login/LoginPage';
import MainMenu from './components/Menu/MainMenu';
import userServiceSingleton from './components/UserService';
import messageServiceSingleton from './components/MessageService';
import './_app.css';
import './form.css';
import './icon.css';

/**
 * App component.
 * 
 * @public
 */
class App extends Component {
  /**
   * App contructor.
   *
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {};

    // Set app state for user service.
    userServiceSingleton.setAppComponent(this);

    // Set app state for message service.
    messageServiceSingleton.setAppComponent(this);
  }

  /**
   * Handle componentDidMount actions.
   *
   * @public
   */
  componentDidMount = async () => {
    userServiceSingleton.appSetup();
    this.hasMounted = true;
  };

  /**
   * Render App component.
   *
   * @public
   */
  render() {
    // If the component hasn't mounted yet we need to wait so
    // that we can handle user auth.
    if (!this.hasMounted) {
      return <div />;
    }

    return (
      <Router>
        <div>
          <header className="header">
            <MainMenu userUtility={this.state.userUtility} />
          </header>
          <section className="body">
            <Switch>
              <PrivatePropsRoute
                exact
                path="/recipe/add"
                component={FormPage}
                messageUtility={this.state.messageUtility}
                userUtility={this.state.userUtility}
              />
              <PropsRoute
                exact
                path="/"
                component={ListPage}
                messageUtility={this.state.messageUtility}
                userUtility={this.state.userUtility}
              />
              <PropsRoute
                exact
                path="/login"
                component={LoginPage}
                messageUtility={this.state.messageUtility}
                userUtility={this.state.userUtility}
              />
              <PropsRoute
                exact
                path="/recipe/edit/:recipeId"
                component={FormPage}
                messageUtility={this.state.messageUtility}
                userUtility={this.state.userUtility}
              />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

/**
 * Render component with merged props.
 *
 * @param {Object} component
 * @param  {...any} props
 */
const renderMergedProps = (component, ...props) => {
  const finalProps = Object.assign({}, ...props);
  return React.createElement(component, finalProps);
};

/**
 * Add props to a route.
 *
 * @param {Object} Object
 * @param {Object} component
 * @param {...any} props
 */
const PropsRoute = ({ component, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps => {
        return renderMergedProps(component, routeProps, props);
      }}
    />
  );
};

/**
 * Add props to a private route.
 *
 * @param {Object} Object
 * @param {Object} component
 * @param {...any} props
 */
const PrivatePropsRoute = ({ component, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps => {
        if (props.userUtility.isUserAdmin) {
          return renderMergedProps(component, routeProps, props);
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default App;
