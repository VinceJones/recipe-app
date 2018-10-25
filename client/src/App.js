import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './components/Page/FormPage/FormPage';
import ListPage from './components/Page/ListPage/ListPage';
import MainMenu from './components/Menu/MainMenu';
import Message from './components/Message/Message';
import './App.css';

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
      message: new Message(),
      getMessage: () => this.getMessage(),
      clearMessages: () => this.clearMessages(),
      setMessage: (status, text) => this.setMessage(status, text),
      toggleMessageShown: () => this.toggleMessageShown()
    };
  }

  /**
   * Clear message.
   *
   * @public
   */
  clearMessages = async () => {
    await this.setState(new Message());
  };

  /**
   * Get the message properties
   * 
   * @public
   */
  getMessage = () => {
    return this.state.message.props;
  }

  /**
   * Set message.
   *
   * @public
   */
  setMessage = async (status, text) => {
    await this.setState({ message: new Message({ status, text }) });
  };

  /**
   * Toggle whether the message has been shown.
   *
   * @public
   */
  toggleMessageShown = async () => {
    if (this.state.message) {
      const state = this.state.message;
      state.message.shown = state.message.shown === true ? false : true;
      await this.setState(state);
    }
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
            <MainMenu />
          </header>
            <section className="App-body">
              <Switch>
                <PropsRoute
                  exact
                  path="/"
                  component={ListPage}
                  messageUtility={this.state}
                />
                <PropsRoute
                  exact
                  path="/recipe/add"
                  component={FormPage}
                  messageUtility={this.state}
                />
                <PropsRoute
                  exact
                  path="/recipe/edit/:recipeId"
                  component={FormPage}
                  messageUtility={this.state}
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

export default App;
