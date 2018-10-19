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
  validateRecipeId(recipeData, recipe) {
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

  /**
   * Check if recipe with id already exists.
   * 
   * @param {Object[]} recipeData 
   * @param {number} recipeId
   * @public
   */
  indexExists(recipeData, recipeId) {
    const indexExists = this.getIndexOfRecipeById(recipeData, recipeId);

    if (
      indexExists === undefined ||
      indexExists === null ||
      indexExists === '' ||
      indexExists === -1
    ) {
      return false
    }

    return true;
  }

  /**
   * Get index of recipe by id.
   *
   * @param {Object} recipeData
   * @param {number} id
   * @public
   */
  getIndexOfRecipeById(recipeData, id) {
    return recipeData.data
      .map(function(item) {
        return item.id;
      })
      .indexOf(id);
  }
}

module.exports = new RecipeValidationService();
