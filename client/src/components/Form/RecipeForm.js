import React, { Component } from 'react';
import RecipeConfig from '../RecipeConfig';
import IngredientFormContainer from './IngredientFormContainer';

const recipeConfig = new RecipeConfig();

/**
 * RecipeForm component.
 *
 * @public
 */
export default class RecipeForm extends Component {
  /**
   * Handle form submit.
   *
   * @async
   * @param {Object} event
   * @public
   */
  handleSubmit = async event => {
    this.props.handleSubmit(event);
  };

  /**
   * Render RecipeForm.
   *
   * @public
   */
  render() {
    return (
      <form className="Recipe-container" onSubmit={this.props.handleSubmit}>
        <div className="Recipe-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.props.recipe.name}
            onChange={this.props.handleRecipeFieldChange()}
          />
        </div>
        <div className="Recipe-field">
          <label>Description:</label>
          <textarea
            name="description"
            rows={recipeConfig.textAreaConfig.rows}
            cols={recipeConfig.textAreaConfig.columns}
            value={this.props.recipe.description}
            onChange={this.props.handleRecipeFieldChange()}
          />
        </div>
        <IngredientFormContainer
          ingredients={this.props.recipe.ingredients}
          onChange={this.props.handleChildFieldChange('ingredients')}
          requestDeleteGroup={index =>
            this.props.handleDeleteIngredientGroup(index)
          }
          requestAddGroup={this.props.handleAddIngredientGroup}
        />
        <div>
          <input className="btn btn_primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}
