import React, { Component } from 'react';
import Page from '../Page';
import Recipe from '../../../models/Recipe';
import Ingredient from '../../../models/Ingredient';
import StorageHandler from '../../StorageHandler';
import RecipeForm from '../../Form/RecipeForm';
import MessageService from '../../Message/MessageService';
import { messagesContext } from '../../Message/messages-context';

import './FormPage.css';

const storageHandler = new StorageHandler('recipe');
const messageService = new MessageService();

/**
 * FormPage component.
 *
 * @public
 */
export default class FormPage extends Component {
  /**
   * FormPage constructor.
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: new Recipe(),
      pageTitle: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Get recipe for editing
   *
   * @public
   */
  componentDidMount = async () => {
    await this.getRecipeFromPath();
    this.setPageTitle();
  };

  /**
   * Set the page title based on initial state.
   *
   * @public
   */
  setPageTitle = () => {
    const state = { ...this.state };

    if (this.state.recipe.name !== '' && this.state.recipe.id !== '') {
      state.pageTitle = 'Edit ' + this.state.recipe.name + ' recipe';
    } else {
      state.pageTitle = 'Add a Recipe';
    }

    this.setState(state);
  };

  /**
   * Get recipe from path for editing.
   *
   * @public
   */
  getRecipeFromPath = async () => {
    if (!this.props.match.params.hasOwnProperty('recipeId')) {
      return;
    }

    const recipeId = parseInt(this.props.match.params.recipeId);
    await storageHandler.getRecipeById(recipeId).then(recipe => {
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
    recipe.ingredients = recipe.ingredients.concat([new Ingredient()]);
    this.setState({ recipe: recipe });
  };

  /**
   * Remove an ingredient group.
   *
   * @param {number} index
   * @public
   */
  handleDeleteIngredientGroup = index => {
    const recipe = this.state.recipe;
    recipe.ingredients = recipe.ingredients.filter(
      (ing, ingIdx) => index !== ingIdx
    );
    this.setState({ recipe: recipe });
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
        messagesContext.setMessage(
          messageService.getRecipeUpdateStatus(res.data),
          messageService.getRecipeUpdateMessage(this.state.recipe.name)
        );
        this.setState({ message: messagesContext.message });
        return res;
      });
    } else {
      // Handle save new recipe.
      await storageHandler.postRecipe(this.state.recipe).then(res => {
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
   * Render FormPage.
   *
   * @public
   */
  render() {
    return (
      <Page pageTitle={this.state.pageTitle} message={messagesContext.message}>
        <RecipeForm
          recipe={this.state.recipe}
          handleSubmit={event => this.handleSubmit(event)}
          handleRecipeFieldChange={() => this.handleRecipeFieldChange()}
          handleChildFieldChange={fieldName =>
            this.handleChildFieldChange(fieldName)
          }
          handleDeleteIngredientGroup={index =>
            this.handleDeleteIngredientGroup(index)
          }
          handleAddIngredientGroup={() => this.handleAddIngredientGroup()}
        />
      </Page>
    );
  }
}
