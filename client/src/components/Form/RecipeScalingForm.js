import React, { Component } from 'react';
import RecipeConfig from '../RecipeConfig';

const recipeConfig = new RecipeConfig();

/**
 * RecipeScalingForm component.
 *
 * @public
 */
export default class RecipeScalingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scalingType: recipeConfig.scalingTypes[0].value,
      scalingAmount: recipeConfig.scalingAmount[0]
    };
  }

  /**
   * Handle form field changes.
   *
   * @param {Object} event
   * @public
   */
  handleFieldChange = () => async event => {
    const fieldElement = event.target;
    const state = Object.assign({}, this.state);
    state[fieldElement.name] = fieldElement.value;
    await this.setState(state);
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
    this.props.scaleRecipe(
      this.props.index,
      this.state.scalingType,
      this.state.scalingAmount
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ListIngredient-field ListIngredient-fieldInline">
          <label>Scaling Type</label>
          <select
            name="scalingType"
            value={this.state.scalingType}
            onChange={this.handleFieldChange()}
          >
            {recipeConfig.scalingTypes.map((scalingType, index) => (
              <option value={scalingType.value} key={index}>
                {scalingType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ListIngredient-field ListIngredient-fieldInline">
          <label>Change by</label>
          <select
            name="scalingAmount"
            value={this.state.scalingAmount}
            onChange={this.handleFieldChange()}
          >
            {recipeConfig.scalingAmount.map((scalingAmount, index) => (
              <option value={scalingAmount} key={index}>
                {scalingAmount}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            className="btn btn_primary"
            type="submit"
            value="Scale Recipe"
          />
        </div>
      </form>
    );
  }
}
