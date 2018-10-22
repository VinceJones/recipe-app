import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipe from './components/Form/Recipe';
import ListPage from './components/Page/ListPage/ListPage';
import {
  MessageContext,
  messagesContext
} from './components/Message/messages-context';
import MainMenu from './components/Menu/MenuContainer';
import MenuItems from './components/Menu/MenuItems';

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
      menuItems: MenuItems
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <MainMenu menuItems={this.state.menuItems} />
          </header>
          <MessageContext.Provider value={this.state.message}>
            <section className="App-body">
              <Switch>
                <Route exact path="/" component={ListPage} />
                <Route exact path="/recipe/add" component={Recipe} />
                <Route exact path="/recipe/edit/:recipeId" component={Recipe} />
              </Switch>
            </section>
          </MessageContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
