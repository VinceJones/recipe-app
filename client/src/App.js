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
import Message from './models/Message';
import AuthHandler from './components/AuthHandler';
import User from './models/User';
import './App.css';
import StorageHandler from './components/StorageHandler';

const authHandler = new AuthHandler();
const storageHandler = new StorageHandler();

/**
 * App component.
 */
class App extends Component {
  /**
   * App contructor.
   *
   * @public
   */
  constructor(props) {
    // userServiceSingleton.setAppComponent(this);

    super(props);
    this.state = {
      messageUtility: {
        message: new Message({}),
        getMessage: () => this.getMessage(),
        clearMessages: () => this.clearMessages(),
        setMessage: (status, text) => this.setMessage(status, text),
        toggleMessageShown: () => this.toggleMessageShown()
      },
      userUtility: {
        user: new User(),
        storageKey: 'recipeAppUser',
        isUserAdmin: false,
        setUser: accessToken => this.setUser(accessToken),
        setClientId: () => this.setClientId(),
        setUserIsAdmin: () => this.setUserIsAdmin()
      }
    };
  }

  /**
   * Handle componentDidMount actions.
   *
   * @public
   */
  componentDidMount = async () => {
    const nextState = Object.assign({}, this.state);

    await this.setUser();
    await this.setClientId()
    await this.setUserIsAdmin();

    this.hasMounted = true;

    this.setState(nextState);
  };

  /**
   * Clear message.
   *
   * @public
   */
  clearMessages = async () => {
    const nextState = Object.assign({}, this.state);
    nextState.messageUtility.message = new Message({});
    await this.setState(nextState);
  };

  /**
   * Get the message properties
   *
   * @public
   */
  getMessage = () => {
    return this.state.messageUtility.message.props;
  };

  /**
   * Set message.
   *
   * @public
   */
  setMessage = async (status, text) => {
    const nextState = Object.assign({}, this.state);
    nextState.messageUtility.message = new Message({ status, text });
    this.setState(nextState);
  };

  /**
   * Toggle whether the message has been shown.
   *
   * @public
   */
  toggleMessageShown = async () => {
    if (this.state.messageUtility !== undefined) {
      const nextState = Object.assign({}, this.state);
      nextState.messageUtility.message.shown =
        nextState.messageUtility.message.shown === true ? false : true;
      this.setState(nextState);
    }
  };

  /**
   * Get the client id.
   *
   * @public
   */
  setClientId = async () => {
    if (this.state.userUtility.user.clientId !== '') {
      return;
    }

    const nextState = Object.assign({}, this.state);
    nextState.userUtility.user.clientId = await authHandler.getClientId();
    this.setState(nextState);
  };

  /**
   * Get the user from local storage if it exists.
   *
   * @public
   */
  getUser = async () => {
    const storageItem = await localStorage.getItem(
      this.state.userUtility.storageKey
    );

    if (!storageItem) {
      return;
    }

    const nextState = Object.assign({}, this.state);
    nextState.userUtility.user = new User(JSON.parse(storageItem));
    this.setState(nextState);
  };

  /**
   * Set the user information using the accesstoken.
   *
   * @param {string} accessToken
   * @public
   */
  setUser = async accessToken => {
    if (!accessToken) {
      this.setState({});
    }

    const nextState = Object.assign({}, this.state);
    nextState.userUtility.user.accessToken = accessToken;

    localStorage.setItem(
      nextState.userUtility.storageKey,
      JSON.stringify(nextState.userUtility.user)
    );

    this.setState(nextState);
  };

  /**
   * Get whether a user is admin.
   *
   * @public
   */
  setUserIsAdmin = async () => {
    const isUserAdmin = await authHandler.isUserAdmin(this.state.userUtility.user);
    const nextState = Object.assign({}, this.state);
    nextState.userUtility.isUserAdmin = isUserAdmin;
    this.setState(nextState);
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
        <div className="App">
          <header className="App-header">
            <MainMenu userUtility={this.state.userUtility} />
          </header>
          <section className="App-body">
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
