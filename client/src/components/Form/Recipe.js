import React from 'react';
import IngredientContainer from './IngredientContainer';
import RecipeConfig from './RecipeConfig';
import StorageHandler from '../StorageHandler';
import Message from '../Message/Message';
import MessageService from '../Message/MessageService';
import { MessageContext, messagesContext } from '../Message/messages-context';

import './Recipe.css';

const recipeConfig = new RecipeConfig();
const storageHandler = new StorageHandler('recipe');
const messageService = new MessageService();

export default class Recipe extends React.Component {
  /**
   * Recipe constructor.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      message: {
        status: '',
        text: ''
      },
      recipe: {
        id: '',
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
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Component did mount.
   *
   * @public
   */
  componentDidMount = () => {
    this.getRecipeFromPath();
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

  /**
   * Get recipe from path for editing.
   *
   * @public
   */
  getRecipeFromPath = () => {
    if (!this.props.match.params.hasOwnProperty('recipeId')) {
      return;
    }

    const recipeId = parseInt(this.props.match.params.recipeId);
    storageHandler.getRecipeById(recipeId).then(recipe => {
      if (recipe !== undefined) {
        this.setState({ recipe: recipe });
      } else {
        messagesContext.setMessage(
          messageService.getRecipeNotFoundStatus(),
          messageService.getRecipeNotFoundMessage()
        );
        this.setState({ message: messagesContext.message });
        this.props.history.push('/recipe/add');
      }
    });
  };

  /**
   * Handle top level field changes.
   *
   * @param {Object} event
   * @public
   */
  handleRecipeFieldChange = () => event => {
    const recipeFieldElement = event.target;
    const recipe = this.state.recipe;
    recipe[recipeFieldElement.name] = recipeFieldElement.value;
    this.setState({
      recipe: recipe
    });
  };

  /**
   * Handle child field changes.
   *
   * @param {string} field
   * @param {Object} newValuesCollection
   * @public
   */
  handleChildFieldChange = field => newValuesCollection => {
    const state = { ...this.state };
    state.recipe[field] = newValuesCollection;
    this.setState(state);
  };

  /**
   * Add an ingredient group.
   *
   * @public
   */
  handleAddIngredientGroup = () => {
    this.setState({
      recipe: {
        ingredients: this.state.recipe.ingredients.concat([
          { name: '', description: '' }
        ])
      }
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
      recipe: {
        ingredients: this.state.recipe.ingredients.filter(
          (ingredient, ingredientIndex) => index !== ingredientIndex
        )
      }
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

    if (this.state.recipe.hasOwnProperty('id') && this.state.recipe.id !== '') {
      // Handle update recipe.
      const saved = await storageHandler.putRecipe(this.state.recipe);
      messagesContext.setMessage(
        messageService.getRecipeUpdateStatus(saved.data),
        messageService.getRecipeUpdateMessage(this.state.recipe.name)
      );
    } else {
      // Handle save new recipe.
      const saved = await storageHandler.postRecipe(this.state.recipe);
      messagesContext.setMessage(
        messageService.getPostMessageStatus(saved.data),
        messageService.getSavedRecipeMessage(saved.data)
      );
    }

    this.props.history.push('/');
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
              value={this.state.recipe.name}
              onChange={this.handleRecipeFieldChange()}
            />
          </div>
          <div className="Recipe-field">
            <label>Description:</label>
            <textarea
              name="description"
              rows={recipeConfig.textAreaConfig.rows}
              cols={recipeConfig.textAreaConfig.columns}
              value={this.state.recipe.description}
              onChange={this.handleRecipeFieldChange()}
            />
          </div>

          <IngredientContainer
            value={this.state.recipe.ingredients}
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
