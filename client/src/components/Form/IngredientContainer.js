import React from 'react';
import Ingredient from './Ingredient';

export default class IngredientContainer extends React.Component {
  /**
   * Get the collection of values.
   */
  get valuesCollection() {
    return this.props.value;
  }

  /**
   * Get whether we should delete the the group.
   */
  get shouldShowDeleteButton() {
    return this.valuesCollection.length > 1;
  }

  /**
   * Handle recipe change events.
   *
   * @param {event}
   * @public
   */
  handleFieldChange = index => newValuesObject => {
    const newValuesCollection = [...this.valuesCollection];
    newValuesCollection[index] = newValuesObject;
    this.props.onChange(newValuesCollection);
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div className="Ingredient-container">
        <h4>Ingredients</h4>

        {this.valuesCollection.map((subform, index) => (
          <Ingredient
            key={index}
            value={subform}
            onChange={this.handleFieldChange(index)}
            showDeleteButton={this.shouldShowDeleteButton}
            requestDeleteGroup={() => this.props.requestDeleteGroup(index)}
          />
        ))}
        <div className="Ingredient-addBtn">
          <button type="button" onClick={this.props.requestAddGroup}>
            Add Ingredient
          </button>
        </div>
      </div>
    );
  }
}
