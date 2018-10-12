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

  /**
   * App constructor.
   *
   * @public
   */
  constructor() {
    super();
    this.state = {
      data: null
    };
  }
  /**
   * Proxy our requests.
   *
   * @public
   */
  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  /**
   * Fetches our GET route from the Express server. 
   *
   * The route we are fetching matches the GET route from server.js
   * @param {async}
   * @public
   */
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  /**
   * Render the component.
   * 
   * @public
   */
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            {/* <h1 className="App-title">Recipe App</h1> */}
            <MainMenu />
          </header>
          <p className="App-intro">{this.state.data}</p>
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
