import React, { Component } from 'react';
import Button from '../Button/Button';
import RecipeConfig from '../RecipeConfig';

const recipeConfig = new RecipeConfig();

/**
 * IngredientForm component.
 *
 * @public
 */
export default class IngredientForm extends Component {
  /**
   * Handle recipe change events.
   *
   * @param {Object} event
   * @public
   */
  handleFieldChange = () => event => {
    const inputElement = event.target;
    let ingredient = { ...this.props.ingredient };
    ingredient[inputElement.name] = inputElement.value;
    this.props.onChange(ingredient);
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div className="Ingredient-group">
        <div className="Ingredient-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.props.ingredient.name}
            onChange={this.handleFieldChange()}
          />
        </div>
        <div className="Ingredient-field Ingredient-fieldInline">
          <label>Amount</label>
          <input
            className="Ingredient-amount"
            type="text"
            name="amount"
            value={this.props.ingredient.amount}
            onChange={this.handleFieldChange()}
          />
        </div>
        <div className="Ingredient-field Ingredient-fieldInline">
          <label>Measurement Type</label>
          <select
            name="measurementType"
            value={this.props.ingredient.measurementType}
            onChange={this.handleFieldChange()}
          >
            {recipeConfig.measurementTypes.map((measurement, index) => (
              <option value={measurement.value} key={index}>
                {measurement.name}
              </option>
            ))}
          </select>
        </div>

        <div className="Ingredient-removeBtn">
          {this.props.showDeleteButton ? (
            <Button
              text="Remove Ingredient"
              link="#"
              className="btn btn_secondary"
              isBtn={true}
              onClick={this.props.requestDeleteGroup}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
