import React from 'react';
import StorageHandler from '../StorageHandler';

const storageHandler = new StorageHandler('recipe');

export default class ListRecipe extends React.Component {
  /**
   * ListRecipe constructor.
   *
   * @public
   */
  constructor() {
    super();
    this.state = {
      recipes: []
    };
    this.getStoredData();
  }

  /**
   * Get the stored recipes.
   * 
   * @public
   */
  getStoredData = () => {
    const storageData = storageHandler.getData();
    console.log('stored data', storageData);

    if (storageData && storageData.length > 0) {
      //   this.setState({ recipes: storageData });
      this.state.recipes = storageData;
      console.log('this.state', this.state);
    }
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div className="ListRecipe-container">
        <h2>Recipes</h2>
        <ul>
          {this.state.recipes.map((recipe, index) => (
            <li key={index}>
              <div>
                {recipe.name}
                {recipe.description ? ' - ' + recipe.description : ''}
                <div>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
