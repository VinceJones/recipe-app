import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivatePropsRoute from './components/Routes/PrivatePropsRoute';
import PropsRoute from './components/Routes/PropsRoute';
import FormPage from './components/Page/FormPage/FormPage';
import ListPage from './components/Page/ListPage/ListPage';
import LoginPage from './components/Page/Login/LoginPage';
import Header from './components/Header/Header';
import userServiceSingleton from './components/UserService';
import messageServiceSingleton from './components/MessageService';
import './app.css';
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
        <Header />
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
      </Router>
    );
  }
}

export default App;
