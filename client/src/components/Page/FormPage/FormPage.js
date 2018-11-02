import React, { Component } from 'react';
import Page from '../Page';
import Recipe from '../../../models/Recipe';
import Ingredient from '../../../models/Ingredient';
import Tag from '../../../models/Tag';
import RecipeForm from '../../Form/RecipeForm';
import StorageHandler from '../../StorageHandler';
import messageServiceSingleton from '../../MessageService';
import './FormPage.css';

const storageHandler = new StorageHandler();

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
      if (recipe instanceof Recipe) {
        this.setState({ recipe: recipe });
      } else {
        messageServiceSingleton.setMessage(
          messageServiceSingleton.getRecipeNotFoundStatus(),
          messageServiceSingleton.getRecipeNotFoundMessage()
        );
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
   * Add a tag.
   *
   * @public
   */
  handleAddTag = () => {
    const recipe = this.state.recipe;
    recipe.tags = recipe.tags.concat([new Tag()]);
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
   * Remove an item from array.
   *
   * @param {number} index
   * @public
   */
  handleDeleteItemFromArray = (index, propName) => {
    console.log(index, propName);
    const recipe = this.state.recipe;
    recipe[propName] = recipe[propName].filter(
      (item, itemIdx) => index !== itemIdx
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

    if (
      this.state.recipe.hasOwnProperty('id') &&
      this.state.recipe.id !== '' &&
      this.state.recipe.id !== undefined
    ) {
      // Handle update recipe.
      await storageHandler.putRecipe(this.state.recipe).then(res => {
        messageServiceSingleton.setMessage(
          messageServiceSingleton.getRecipeUpdateStatus(res.data),
          messageServiceSingleton.getRecipeUpdateMessage(this.state.recipe.name)
        );
        return res;
      });
    } else {
      // Handle save new recipe.
      await storageHandler.postRecipe(this.state.recipe).then(res => {
        messageServiceSingleton.setMessage(
          messageServiceSingleton.getPostMessageStatus(res.data),
          messageServiceSingleton.getSavedRecipeMessage(res.data)
        );
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
      <Page pageTitle={this.state.pageTitle}>
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
          handleDeleteItemFromArray={(index, propName) => {
            this.handleDeleteItemFromArray(index, propName);
          }}
          handleAddIngredientGroup={() => this.handleAddIngredientGroup()}
          handleAddTag={() => this.handleAddTag()}
        />
      </Page>
    );
  }
}
