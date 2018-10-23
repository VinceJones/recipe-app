import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './components/Page/FormPage/FormPage';
import ListPage from './components/Page/ListPage/ListPage';
import {
  MessageContext,
  messagesContext
} from './components/Message/messages-context';
import MainMenu from './components/Menu/MainMenu';
import Routes from './Routes';

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
  constructor() {
    super();
    this.state = {
      message: messagesContext.message,
      routes: Routes
    };
  }

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
            <MainMenu routes={this.state.routes} />
          </header>
          <MessageContext.Provider value={this.state.message}>
            <section className="App-body">
              <Switch>
                <Route exact path="/" component={ListPage} />
                <Route exact path="/recipe/add" component={FormPage} />
                <Route exact path="/recipe/edit/:recipeId" component={FormPage} />
              </Switch>
            </section>
          </MessageContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
