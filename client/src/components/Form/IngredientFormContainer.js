import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IngredientForm from './IngredientForm';
import Button from '../Button/Button';
import Ingredient from '../../models/Ingredient';

/**
 * IngredientFormContainer component.
 *
 * @public
 */
export default class IngredientFormContainer extends Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),
    onChange: PropTypes.func.isRequired,
    requestDeleteGroup: PropTypes.func.isRequired,
    requestAddGroup: PropTypes.func.isRequired
  };

  /**
   * Get whether we should delete the the group.
   */
  get shouldShowDeleteButton() {
    return this.props.ingredients.length > 1;
  }

  /**
   * Handle ingredient change events.
   *
   * @param {number} index
   * @param {Object} newIngValues
   * @public
   */
  handleFieldChange = index => newIngValues => {
    const ingredients = [...this.props.ingredients];
    ingredients[index] = new Ingredient(newIngValues);
    this.props.onChange(ingredients);
  };

  /**
   * Render IngredientFormContainer.
   *
   * @public
   */
  render() {
    return (
      <div>
        <h4>Ingredients</h4>
        <div className="Ingredient-container">
          {this.props.ingredients.map((ingredient, index) => (
            <IngredientForm
              key={index}
              ingredient={ingredient}
              onChange={this.handleFieldChange(index)}
              showDeleteButton={this.shouldShowDeleteButton}
              requestDeleteGroup={() => this.props.requestDeleteGroup(index)}
            />
          ))}
          <div className="Ingredient-addBtn">
            <Button
              text="Add Ingredient"
              link='#'
              className="btn btn_tertiary"
              isBtn={true}
              onClick={this.props.requestAddGroup}
              preventDefault={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
