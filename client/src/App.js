import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Recipe from './components/Form/Recipe';
import ListRecipe from './components/List/ListRecipe';
import Message from './components/Message/Message';

import './App.css';

/**
 * MainMenu component.
 */
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

// const RecipeForm = (props) => {
//   return (
//     <Recipe setMessage={message => this.setMessage(message)} {...props}/>
//   )
// }

class App extends Component {
  /**
   * App contructor.
   *
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      message: ''
    };
  }

  /**
   * Set the message to be displayed.
   *
   * @param {string} status
   * @param {string} message
   * @public
   */
  setMessage = (status, message) => {
    this.setState({ message: message, status: status });
  };

  /**
   * Get the Recipe Form.
   *
   * @param {Object} props
   * @public
   */
  recipeForm = props => {
    return (
      <Recipe
        setMessage={(status, message) => this.setMessage(status, message)}
        {...props}
      />
    );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <MainMenu />
          </header>
          <Message status={this.state.status} message={this.state.message} />
          <section className="App-body">
            <Switch>
              <Route exact path="/" component={ListRecipe} />
              <Route exact path="/create-recipe" component={this.recipeForm} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
