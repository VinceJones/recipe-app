import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import RecipeConfig from '../RecipeConfig';
import Ingredient from '../../models/Ingredient';

const recipeConfig = new RecipeConfig();

/**
 * IngredientForm component.
 *
 * @public
 */
export default class IngredientForm extends Component {
  static propTypes = {
    ingredient: PropTypes.instanceOf(Ingredient),
    onChange: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired,
    requestDeleteGroup: PropTypes.func.isRequired
  };

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
      <div className="form__ingredient">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.props.ingredient.name}
            onChange={this.handleFieldChange()}
          />
        </div>
        <div className="form__amountMeasurementWrapper">
          <div className="form__input--sideBySide inline left">
            <div className="input__amountMeasurementWrapper">
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                value={this.props.ingredient.amount}
                onChange={this.handleFieldChange()}
              />
            </div>
          </div>
          <div className="form__input--sideBySide inline left">
            <div className="input__amountMeasurementWrapper">
              <label>Type</label>
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
          </div>
        </div>

        <div className="Ingredient-removeBtn">
          {this.props.showDeleteButton ? (
            <Button
              text="Remove Ingredient"
              link="#"
              className="btn btn_secondary"
              isBtn={true}
              onClick={this.props.requestDeleteGroup}
              preventDefault={true}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
