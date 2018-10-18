import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Recipe from './components/Form/Recipe';
import ListRecipe from './components/List/ListRecipe';
import {
  MessageContext,
  messagesContext
} from './components/Message/messages-context';

import './App.css';

/**
 * MainMenu component.
 */
const MainMenu = () => {
  return (
    <div className="MainMenu-container">
      <Link to="/">
        <span>View Recipes</span>
      </Link>
      <Link to="/create-recipe">
        <span>Add a Recipe</span>
      </Link>
    </div>
  );
};

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
      message: messagesContext.message
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <MainMenu />
          </header>
          <MessageContext.Provider value={this.state.message}>
            <section className="App-body">
              <Switch>
                <Route exact path="/" component={ListRecipe} />
                <Route exact path="/create-recipe" component={Recipe} />
              </Switch>
            </section>
          </MessageContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
