import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Recipe from './components/Form/Recipe';
import ListRecipe from './components/List/ListRecipe';

import './App.css';

const MainMenu = () => {
  return (
    <div>
      <Link to="/">
        <button>View Recipes</button>
      </Link>
      <Link to="/create-recipe">
        <button>Add a Recipe</button>
      </Link>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            {/* <h1 className="App-title">Recipe App</h1> */}
            <MainMenu />
          </header>
          <section className="App-body">
            <Switch>
              <Route exact path="/" component={ListRecipe} />
              <Route exact path="/create-recipe" component={Recipe} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
