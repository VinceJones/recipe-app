import React from 'react';
import RecipeConfig from './RecipeConfig';

const recipeConfig = new RecipeConfig();

export default class Ingredient extends React.Component {

  /**
   * Get the values of this objects properties.
   */
  get ingredientValues() {
    return this.props.value;
  }

  /**
   * Handle recipe change events.
   *
   * @param {Object} event
   * @public
   */
  handleFieldChange = () => event => {
    const inputElement = event.target;

    let newValuesObject = { ...this.ingredientValues };
    newValuesObject[inputElement.name] = inputElement.value;

    this.props.onChange(newValuesObject);
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
            value={this.ingredientValues.name}
            onChange={this.handleFieldChange()}
          />
        </div>
        <div className="Ingredient-field Ingredient-fieldInline">
          <label>Amount</label>
          <input
            className="Ingredient-amount"
            type="text"
            name="amount"
            value={this.ingredientValues.amount}
            onChange={this.handleFieldChange()}
          />
        </div>
        <div className="Ingredient-field Ingredient-fieldInline">
          <label>Measurement Type</label>
          <select
            name="measurementType"
            value={this.ingredientValues.measurementType}
            onChange={this.handleFieldChange()}
          >
            {recipeConfig.measurementTypes.map((measurement, index) => (
              <option value={measurement.value} key={index}>{measurement.name}</option>
            ))}
          </select>
        </div>
        <div className="Ingredient-field">
          <label>Description:</label>
          <textarea
            name="description"
            rows={recipeConfig.textAreaConfig.rows}
            cols={recipeConfig.textAreaConfig.columns}
            value={this.props.value.description}
            onChange={this.handleFieldChange()}
          />
        </div>

        <div className="Ingredient-removeBtn">
          {this.props.showDeleteButton ? (
            <button className="btn btn_secondary" type="button" onClick={this.props.requestDeleteGroup}>
              Remove Ingredient
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
