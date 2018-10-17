import React from 'react';
import IngredientContainer from './IngredientContainer';
import RecipeConfig from './RecipeConfig';
import StorageHandler from '../StorageHandler';
import Message from '../Message/Message';
import {
  MessageContext,
  messagesContainer
} from '../Message/messages-context';

import './Recipe.css';

const recipeConfig = new RecipeConfig();
const storageHandler = new StorageHandler('recipe');

export default class Recipe extends React.Component {
  /**
   * Recipe constructor.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      message: messagesContainer.message,
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
   * @param {Object} event
   * @public
   */
  handleRecipeFieldChange = () => event => {
    const recipeFieldElement = event.target;
    this.setState({ [recipeFieldElement.name]: recipeFieldElement.value });
  };

  /**
   * Handle child field changes.
   *
   * @param {string} field
   * @param {Object} newValuesCollection
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
   * @param {number} index
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
   * @async
   * @param {Object} event
   * @public
   */
  handleSubmit = async event => {
    event.preventDefault();
    const saved = await storageHandler.postRecipe(this.state);
    this.props.setMessage(
      this.getMessageStatus(saved.data),
      this.getSavedMessage(saved.data)
    );
    this.props.history.push('/');
  };

  /**
   * Get the message after recipe POST has completed.
   *
   * @param {Boolean} saved
   * @public
   *
   */
  getSavedMessage = saved => {
    return saved ? 'Recipe has been saved.' : 'Recipe has not been saved.';
  };

  /**
   * Get the message status after recipe POST has completed.
   *
   * @param {bool} saved
   * @public
   */
  getMessageStatus = saved => {
    return saved ? 'success' : 'error';
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
        <form className="Recipe-container" onSubmit={this.handleSubmit}>
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

          <IngredientContainer
            value={this.state.ingredients}
            onChange={this.handleChildFieldChange('ingredients')}
            requestDeleteGroup={index =>
              this.handleDeleteIngredientGroup(index)
            }
            requestAddGroup={this.handleAddIngredientGroup}
          />

          <div>
            <input className="btn btn_primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
