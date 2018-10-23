import React, { Component } from 'react';
import IngredientForm from './IngredientForm';
import Button from '../Button/Button';

/**
 * IngredientFormContainer component.
 *
 * @public
 */
export default class IngredientFormContainer extends Component {
  /**
   * Get whether we should delete the the group.
   */
  get shouldShowDeleteButton() {
    return this.props.ingredients.length > 1;
  }

  /**
   * Handle ingredient change events.
   *
   * @param {event}
   * @public
   */
  handleFieldChange = index => newValuesObject => {
    const ingredients = [...this.props.ingredients];
    ingredients[index] = newValuesObject;
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
            />
          </div>
        </div>
      </div>
    );
  }
}
