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

    if (!messagesContext.message.show) {
      this.setState({ message: messagesContext.message });
      messagesContext.toggleShown();
    }
  };

  /**
   * Handle componentWillUnmount actions.
   *
   * @public
   */
  componentWillUnmount = async () => {
    if (messagesContext.message.shown) {
      await messagesContext.clearMessages();
    }
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
        messagesContext.toggleShown();

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
    const recipe = this.state.recipe;
    recipe.ingredients = recipe.ingredients.concat([
      {
        name: '',
        amount: '',
        measurementType: ''
      }
    ]);
    this.setState({
      recipe: recipe
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
      await storageHandler.putRecipe(this.state.recipe).then(res => {
        console.log('update res', res);
        messagesContext.setMessage(
          messageService.getRecipeUpdateStatus(res.data),
          messageService.getRecipeUpdateMessage(this.state.recipe.name)
        );
        this.setState({ message: messagesContext.message });
        return res;
      });
    } else {
      // Handle save new recipe.
      await storageHandler.postRecipe(this.state.recipe).then(res=> {
        console.log('new res', res);
        messagesContext.setMessage(
          messageService.getPostMessageStatus(res.data),
          messageService.getSavedRecipeMessage(res.data)
        );
        this.setState({ message: messagesContext.message });
        return res;
      });
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
