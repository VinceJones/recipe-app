/**
 * RecipeValidationService.
 *
 * @public
 */
class RecipeValidationService {
  /**
   * Check if a recipe has a valid ID.
   *
   * @param {Object} recipe
   * @public
   */
  validateRecipeId(recipe) {
    if (!recipe.hasOwnProperty('id')) {
      return false;
    }

    if (isNaN(recipe.id)) {
      return false;
    }

    if (recipe.id === undefined || recipe.id === null || recipe.id === '') {
      return false;
    }

    return true;
  }
}

module.exports = new RecipeValidationService();
