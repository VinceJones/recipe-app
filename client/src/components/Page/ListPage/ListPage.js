import React, { Component } from 'react';
import Page from '../Page';
import ListPageAccordion from '../../Accordion/ListPageAccordion';
import DeleteRecipeModal from '../../Modal/DeleteRecipeModal';
import StorageHandler from '../../StorageHandler';
import MessageService from '../../Message/MessageService';
import Recipe from '../../../models/Recipe';
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
      recipes: []
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
        this.setState({ recipes: recipes });
      } else {
        this.setState({ recipes: [] });
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
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <Page pageTitle="Recipes" messageUtility={this.props.messageUtility}>
        <ListPageAccordion
          recipes={this.state.recipes}
          showModal={recipe => this.showModal(recipe)}
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
