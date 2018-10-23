import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../Button/Button';

/**
 * DeleteRecipeModal component.
 *
 * @public
 */
export default class DeleteRecipeModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    handleDeleteRecipe: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.instanceOf(Object).isRequired
  };

  /**
   * Get the name of the recipe to delete.
   *
   * @public
   */
  get recipeName() {
    if (
      this.props.deleteRecipe.hasOwnProperty('name') &&
      this.props.deleteRecipe.name !== undefined &&
      this.props.deleteRecipe.name !== null &&
      this.props.deleteRecipe.name !== ''
    ) {
      return this.props.deleteRecipe.name;
    }

    return 'this';
  }
  render() {
    return (
      <Modal show={this.props.showModal} hideModal={this.props.hideModal}>
        <div className="ListRecipe-deleteModal">
          <h3>Are you sure you would like delete {this.recipeName} recipe?</h3>
          <div className="ListRecipe-buttonGroup">
            <Button
              text="Yes"
              link="#"
              className="btn btn_secondary"
              isBtn={true}
              onClick={() => this.props.handleDeleteRecipe()}
            />
            <Button
              text="No"
              link="#"
              className="btn btn_primary"
              isBtn={true}
              onClick={() => this.props.hideModal()}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
