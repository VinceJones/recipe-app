import React, { Component } from 'react';
import Page from '../Page';
import ListPageAccordion from '../../Accordion/ListPageAccordion';
import DeleteRecipeModal from '../../Modal/DeleteRecipeModal';
import StorageHandler from '../../StorageHandler';
import MessageService from '../../Message/MessageService';
import { messagesContext } from '../../Message/messages-context';

import './ListRecipe.css';

const storageHandler = new StorageHandler('recipe');
const messageService = new MessageService();

export default class ListPage extends Component {
  /**
   * ListPage constructor.
   *
   * @public
   */
  constructor() {
    super();
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
    storageHandler.getRecipes().then(res => {
      this.setState({ recipes: res });
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
      let status = messagesContext.message.status;
      let text = messagesContext.message.text;

      console.log(res);

      if (res) {
        status = messageService.getRecipeDeleteStatus();
        text = messageService.getRecipeDeleteMessage(recipe.name);
      } else {
        status = messageService.getRecipeDeleteFailStatus();
        text = messageService.getRecipeDeleteFailMessage(recipe.name);
      }

      messagesContext.setMessage(status, text);
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
      <Page pageTitle="Recipes" message={messagesContext.message}>
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
