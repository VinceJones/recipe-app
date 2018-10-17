import React from 'react';
import StorageHandler from '../StorageHandler';
import Accordion from './Accordion';
import ListIngredient from './ListIngredient';
import Message from '../Message/Message';
import { MessageContext, messagesContainer } from '../Message/messages-context';

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
      recipes: [],
      message: messagesContainer.message
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
                  <a className="ListRecipe-editBtn" href="recipe/edit/">
                    <button>Edit recipe</button>
                  </a>
                </div>
              </div>
            ))}
          </Accordion>
        </ul>
      </div>
    );
  }
}
