import React from 'react';
import ChildContainer from './IngredientContainer';
import RecipeConfig from './RecipeConfig';
import StorageHandler from '../StorageHandler';

import './Recipe.css';

const recipeConfig = new RecipeConfig();
const storageHandler = new StorageHandler('recipe');

export default class Recipe extends React.Component {
  /**
   * Recipe constructor.
   *
   * @public
   */
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      ingredients: [
        {
          name: '',
          description: '',
          amount: '',
          measurementType: ''
        }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handle top level field changes.
   *
   * @param {event}
   * @public
   */
  handleRecipeFieldChange = () => event => {
    const recipeFieldElement = event.target;
    this.setState({ [recipeFieldElement.name]: recipeFieldElement.value });
  };

  /**
   * Handle child field changes.
   *
   * @param {field}
   * @param {newValuesCollection}
   * @public
   */
  handleChildFieldChange = field => newValuesCollection => {
    const recipeData = { ...this.state };
    recipeData[field] = newValuesCollection;
    this.setState(recipeData);
  };

  /**
   * Add an ingredient group.
   *
   * @public
   */
  handleAddIngredientGroup = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([
        { name: '', description: '' }
      ])
    });
  };

  /**
   * Remove an ingredient group.
   *
   * @param {index}
   * @public
   */
  handleDeleteIngredientGroup = index => {
    this.setState({
      ingredients: this.state.ingredients.filter(
        (ingredient, ingredientIndex) => index !== ingredientIndex
      )
    });
  };

  /**
   * Handle form submit.
   *
   * @param {event}
   * @public
   */
  handleSubmit = event => {
    storageHandler.writeData(this.state);
    const { name, description, ingredients } = this.state;

    let message =
      'Name : ' + name + '\n' + 'Description : ' + description + '\n\n';

    message += ingredients.map(
      (ingredient, index) =>
        'Ingredient ' +
        index +
        ' name : ' +
        ingredient.name +
        '\n' +
        'Ingredient ' +
        index +
        ' description : ' +
        ingredient.description +
        '\n'
    );

    alert(message);
    event.preventDefault();
    this.props.history.push('/');
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div className="Recipe-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h2>Add a Recipe</h2>
          </div>
          <div className="Recipe-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleRecipeFieldChange()}
            />
          </div>
          <div className="Recipe-field">
            <label>Description:</label>
            <textarea
              name="description"
              rows={recipeConfig.textAreaConfig.rows}
              cols={recipeConfig.textAreaConfig.columns}
              value={this.state.description}
              onChange={this.handleRecipeFieldChange()}
            />
          </div>

          <ChildContainer
            value={this.state.ingredients}
            onChange={this.handleChildFieldChange('ingredients')}
            requestDeleteGroup={index =>
              this.handleDeleteIngredientGroup(index)
            }
            requestAddGroup={this.handleAddIngredientGroup}
          />

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
