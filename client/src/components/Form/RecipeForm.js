import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeConfig from '../RecipeConfig';
import IngredientFormContainer from './IngredientFormContainer';
import Recipe from '../../models/Recipe';
import TagFormContainer from './TagFormContainer';

const recipeConfig = new RecipeConfig();

/**
 * RecipeForm component.
 *
 * @public
 */
export default class RecipeForm extends Component {
  static propTypes = {
    recipe: PropTypes.instanceOf(Recipe),
    handleSubmit: PropTypes.func.isRequired,
    handleRecipeFieldChange: PropTypes.func.isRequired,
    handleChildFieldChange: PropTypes.func.isRequired,
    handleDeleteIngredientGroup: PropTypes.func.isRequired,
    handleAddIngredientGroup: PropTypes.func.isRequired
  };

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
        <TagFormContainer
          tags={this.props.recipe.tags}
          onChange={this.props.handleChildFieldChange('tags')}
          requestDeleteTag={index => this.props.handleDeleteItemFromArray(index, 'tags')}
          requestAddTag={() => this.props.handleAddTag()}
        />
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
