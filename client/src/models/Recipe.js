import Ingredient from './Ingredient';

/**
 * Recipe model.
 *
 * @public
 */
export default class Recipe {
  /**
   * Recipe constructor.
   *
   * @param {Object} recipe
   */
  constructor(recipe = {}) {
    this.id = recipe.id ? recipe.id : '';
    this.name = recipe.name ? recipe.name : '';
    this.description = recipe.description ? recipe.description : '';
    this.ingredients = recipe.ingredients
      ? recipe.ingredients
      : [new Ingredient()];
  }
}
