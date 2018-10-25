import Ingredient from './Ingredient';
import Tag from './Tag';

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
    this.id = recipe.id !== '' ? recipe.id : '';
    this.name = recipe.name ? recipe.name : '';
    this.description = recipe.description ? recipe.description : '';
    this.ingredients = this.tranformIngredientData(recipe.ingredients);
    this.tags = this.transformTagData(recipe.tags);
  }

  /**
   * Transform ingredient data into array of Ingredients.
   * 
   * @param {Object[]} ingData
   * @public
   */
  tranformIngredientData = ingData => {
    if (!ingData) {
      return [new Ingredient()];
    }

    const ingredients = [];
    ingData.forEach(ing => {
      ingredients.push(new Ingredient(ing));
    });

    return ingredients;
  }

  /**
   * Transform ingredient data into array of Ingredients.
   * 
   * @param {Object[]} tagData
   * @public
   */
  transformTagData = tagData => {
    if (!tagData) {
      return [new Tag()];
    }

    const tags = [];
    tagData.forEach(tag => {
      tags.push(new Tag(tag));
    })

    return tags;
  }
}
