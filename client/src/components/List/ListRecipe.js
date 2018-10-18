import React from 'react';
import StorageHandler from '../StorageHandler';
import Accordion from './Accordion';
import ListIngredient from './ListIngredient';
import Message from '../Message/Message';
import { MessageContext, messagesContext } from '../Message/messages-context';

import './ListRecipe.css';
import './Accordion.css';

const storageHandler = new StorageHandler('recipe');

export default class ListRecipe extends React.Component {
  /**
   * ListRecipe constructor.
   *
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      message: {
        status: '',
        text: ''
      },
      recipes: []
    };
  }

  /**
   * Get recipes and set them to state.
   *
   * @public
   */
  componentDidMount = () => {
    storageHandler.getRecipes().then(res => {
      this.setState({ recipes: res });
    });
    this.setState({ message: messagesContext.message });
  };

  /**
   * Handle componentWillUnmount actions.
   *
   * @public
   */
  componentWillUnmount = async () => {
    await messagesContext.clearMessages();
    console.log(messagesContext);
    console.log('componentWillUnmount');
  };

  handleDeleteRecipe = recipeId => {
    console.log('delete', recipeId);
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div>
        <MessageContext.Provider value={this.state.message}>
          <Message message={this.state.message} />
        </MessageContext.Provider>
        <h2 className="ListRecipe-title">Recipes</h2>

        <ul className="ListRecipe-container">
          <Accordion allowMultipleOpen>
            {this.state.recipes.map((recipe, index) => (
              <div
                key={index}
                label={recipe.name}
                description={recipe.description}
              >
                <ul>
                  <h4>Ingredients</h4>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListIngredient key={index} ingredient={ingredient} />
                  ))}
                </ul>
                <div>
                  <a href={'recipe/edit/' + recipe.id}>
                    <button className="btn btn_tertiary">Edit recipe</button>
                  </a>

                  <button
                    type="button"
                    className="btn btn_secondary"
                    onClick={() => this.handleDeleteRecipe(recipe.id)}
                  >
                    Delete recipe
                  </button>
                </div>
              </div>
            ))}
          </Accordion>
        </ul>
      </div>
    );
  }
}
