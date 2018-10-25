import React, { Component } from 'react';
import Page from '../Page';
import DeleteRecipeModal from '../../Modal/DeleteRecipeModal';
import StorageHandler from '../../StorageHandler';
import MessageService from '../../Message/MessageService';
import Recipe from '../../../models/Recipe';
import ListPageFilterForm from '../../Form/ListPageFilterForm';
import './ListPage.css';


const storageHandler = new StorageHandler();
const messageService = new MessageService();

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
      filteredRecipes: []
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
    this.setState({ showModal: true, deleteRecipe: recipe });
  };

  /**
   * Hide the modal
   *
   * @public
   */
  hideModal = () => {
    this.setState({ showModal: false });
  };

  /**
   * Update state with new recipes.
   *
   * @public
   */
  updateStateWithRecipes = () => {
    storageHandler.getRecipes().then(recipes => {
      if (recipes && recipes.length > 0 && recipes[0] instanceof Recipe) {
        this.setState({ recipes: recipes, filteredRecipes: recipes });
      } else {
        this.setState({ recipes: [], filteredRecipes: [] });
      }
    });
  };

  /**
   * Handle delete of a recipe.
   *
   * @public
   */
  handleDeleteRecipe = () => {
    const recipe = this.state.deleteRecipe;
    storageHandler.deleteRecipeById(recipe.id).then(res => {
      if (res) {
        this.props.messageUtility.setMessage(
          messageService.getRecipeDeleteStatus(),
          messageService.getRecipeDeleteMessage(recipe.name)
        );
      } else {
        this.props.messageUtility.setMessage(
          messageService.getRecipeDeleteFailStatus(),
          messageService.getRecipeDeleteFailMessage(recipe.name)
        );
      }

      this.setState({ showModal: false });
      this.updateStateWithRecipes();
    });
  };

  /**
   * Filter the recipes.
   *
   * @param {Object} event
   * @public
   */
  filterList = event => {
    // If there is no filter applied then we should revert
    // the list to the original list of recipes.
    if (event.target.value === '') {
      this.setState({ filteredRecipes: this.state.recipes });
      return;
    }

    // Start filtering with the filtered list of recipes so filtering
    // can go quicker.
    let updatedList = this.state.filteredRecipes;

    updatedList = updatedList.filter(recipe => {
      // Check the name of the Recipe.
      const nameMatch =
        recipe.name.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1;

      // Check the name of each Ingredient;
      let ingMatch = recipe.ingredients.filter(ingredient => {
        return (
          ingredient.name
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        );
      });

      ingMatch = (ingMatch !== undefined && ingMatch.length > 0);

      // Check the name of each Tag.
      let tagMatch = recipe.tags.filter(tag => {
        return (
          tag.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
        );
      });
      tagMatch = (tagMatch !== undefined && tagMatch.length > 0);

      return nameMatch || ingMatch || tagMatch;
    });

    this.setState({ filteredRecipes: updatedList });
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <Page pageTitle="Recipes" messageUtility={this.props.messageUtility}>
        <ListPageFilterForm
          recipes={this.state.filteredRecipes}
          showModal={recipe => this.showModal(recipe)}
          filterList={event => this.filterList(event)}
        />
        <DeleteRecipeModal
          showModal={this.state.showModal}
          handleDeleteRecipe={() => this.handleDeleteRecipe()}
          hideModal={() => this.hideModal()}
          deleteRecipe={this.state.deleteRecipe}
        />
      </Page>
    );
  }
}
