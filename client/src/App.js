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

const authHandler = new AuthHandler();

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
        getIsUserAdmin: () => this.getIsUserAdmin()
      }
    };
  }

  /**
   * Handle componentDidMount actions.
   *
   * @public
   */
  componentDidMount = async () => {
    this.getUser();

    if (this.state.userUtility.user.clientId !== '') {
      await this.setClientId();
      await this.getIsUserAdmin();
    }
  };

  /**
   * Clear message.
   *
   * @public
   */
  clearMessages = async () => {
    await this.setState(new Message({}));
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
    const state = this.state;
    state.messageUtility.message = new Message({ status, text });
    await this.setState(state);
  };

  /**
   * Toggle whether the message has been shown.
   *
   * @public
   */
  toggleMessageShown = async () => {
    if (this.state.messageUtility !== undefined) {
      const state = this.state.messageUtility.message;
      state.messageUtility.message.shown =
        state.messageUtility.message.shown === true ? false : true;

      await this.setState(state);
    }
  };

  /**
   * Get the client id.
   *
   * @public
   */
  setClientId = async () => {
    const state = this.state;
    this.state.userUtility.user.clientId = await authHandler.getClientId();
    console.log('setClientId:', this.state.userUtility.user);
    this.setState(state);
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

    const state = this.state;
    state.userUtility.user = new User(JSON.parse(storageItem));
    this.setState(state);
  };

  /**
   * Get whether a user is admin.
   *
   * @public
   */
  getIsUserAdmin = async () => {
    const isUserAdmin = await authHandler.isUserAdmin(
      this.state.userUtility.user
    );
    console.log('getIsUserAdmin', isUserAdmin);
    const state = this.state;
    state.userUtility.isUserAdmin = isUserAdmin;
    this.setState(state);
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

    const state = this.state;
    state.userUtility.user.accessToken = accessToken;

    this.setState(state);
    console.log('setUser user', this.state.userUtility.user);

    // Set the user to local storage for future use.
    await localStorage.setItem(
      this.state.userUtility.storageKey,
      JSON.stringify(this.state.userUtility.user)
    );
  };

  /**
   * Render App component.
   *
   * @public
   */
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <MainMenu userUtility={this.state.userUtility} />
          </header>
          <section className="App-body">
            <Switch>
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
                path="/recipe/add"
                component={FormPage}
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
        console.log(
          'PrivatePropRoute isUserAdmin',
          props.userUtility.isUserAdmin
        );
        console.log('\n\n\n');
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
