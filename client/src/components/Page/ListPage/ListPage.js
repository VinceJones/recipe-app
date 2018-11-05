import React, { Component } from 'react';
import Page from '../Page';
import Recipe from '../../../models/Recipe';
import DeleteRecipeModal from '../../Modal/DeleteRecipeModal';
import ListPageFilterForm from '../../Form/ListPageFilterForm';
import FilterHandler from '../../FilterHandler';
import StorageHandler from '../../StorageHandler';
import ScalingHandler from '../../ScalingHandler';
import messageServiceSingleton from '../../MessageService';
import userServiceSingleton from '../../UserService';
import './ListPage.css';

const storageHandler = new StorageHandler();
const filterHandler = new FilterHandler();
const scalingHandler = new ScalingHandler();

export default class ListPage extends Component {
  /**
   * ListPage constructor.
   *
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteRecipe: {},
      recipes: [],
      filteredRecipes: [],
      filterValue: ''
    };
  }

  /**
   * Get recipes and set them to state.
   *
   * @public
   */
  componentDidMount = () => {
    this.updateStateWithRecipes();
  };

  /**
   * Show the modal.
   *
   * @param {Object} recipe
   * @public
   */
  showModal = recipe => {
    const state = Object.assign({}, this.state);
    state.showModal = true;
    state.deleteRecipe = recipe;
    this.setState(state);
  };

  /**
   * Hide the modal
   *
   * @public
   */
  hideModal = () => {
    const state = Object.assign({}, this.state);
    state.showModal = false;
    this.setState(state);
  };

  /**
   * Update state with new recipes.
   *
   * @public
   */
  updateStateWithRecipes = async () => {
    const state = Object.assign({}, this.state);
    const recipes = await storageHandler.getRecipes();

    if (recipes && recipes.length > 0 && recipes[0] instanceof Recipe) {
      state.recipes = recipes;
      state.filteredRecipes = [...recipes];
      await this.setState(state);
    } else {
      state.recipes = [];
      state.filteredRecipes = [];
      await this.setState(state);
    }
  };

  /**
   * Handle delete of a recipe.
   *
   * @public
   */
  handleDeleteRecipe = async () => {
    const recipe = this.state.deleteRecipe;
    const response = await storageHandler.deleteRecipeById(recipe.id);
    if (response) {
      messageServiceSingleton.setMessage(
        messageServiceSingleton.getRecipeDeleteStatus(),
        messageServiceSingleton.getRecipeDeleteMessage(recipe.name)
      );
    } else {
      messageServiceSingleton.setMessage(
        messageServiceSingleton.getRecipeDeleteFailStatus(),
        messageServiceSingleton.getRecipeDeleteFailMessage(recipe.name)
      );
    }
    const state = Object.assign({}, this.state);
    state.showModal = false;

    await this.setState(state);
    this.updateStateWithRecipes();
  };

  /**
   * Filter the recipes.
   *
   * @param {Object} event
   * @public
   */
  filterList = event => {
    const state = Object.assign({}, this.state);
    state.filterValue = event.target.value;
    this.setState(state);

    // If there is no filter applied then we should revert
    // the list to the original list of recipes.
    if (event.target.value === '') {
      this.setState({ filteredRecipes: this.state.recipes });
      return;
    }

    // Start filtering with the unfiltered list of items
    // so that every item is accounted for in the filtering.
    const updatedList = filterHandler.filterItems(
      this.state.recipes,
      event.target.value
    );

    state.filteredRecipes = updatedList;

    this.setState(state);
  };

  /**
   * Scale a recipe based on user input.
   *
   * @param {number} index
   * @param {string} scaleType
   * @param {number} scaleAmount
   * @public
   */
  scaleRecipe = async (index, scaleType, scaleAmount) => {
    const state = await scalingHandler.scaleRecipe(
      this.state,
      index,
      scaleType,
      scaleAmount
    );

    await this.setState(state);
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <Page pageTitle="Recipes">
        <ListPageFilterForm
          filterValue={this.state.filterValue}
          recipes={this.state.filteredRecipes}
          showModal={recipe => this.showModal(recipe)}
          filterList={event => this.filterList(event)}
          scaleRecipe={(index, scaleType, scaleAmount) =>
            this.scaleRecipe(index, scaleType, scaleAmount)
          }
        />
        {userServiceSingleton.isUserAdmin && (
          <DeleteRecipeModal
            showModal={this.state.showModal}
            handleDeleteRecipe={() => this.handleDeleteRecipe()}
            hideModal={() => this.hideModal()}
            deleteRecipe={this.state.deleteRecipe}
          />
        )}
      </Page>
    );
  }
}
