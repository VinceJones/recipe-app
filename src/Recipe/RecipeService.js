const fs = require('fs');
const fileStorageService = require('../Storage/RecipeFileStorageService');

/**
 * RecipeService.
 *
 * Service to help with Recipes.
 *
 * @public
 */
class RecipeService {
  /**
   * Get recipes from file.
   *
   * @public
   */
  getRecipes() {
    return fileStorageService.getFileContents();
  }

  /**
   * Sort recipes by name
   *
   * @param {Object} recipes
   * @public
   */
  sortRecipesByName(recipes) {
    recipes.data.sort(function(a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  /**
   * Make sure every recipe has an ID.
   *
   * @param {recipeData}
   * @public
   */
  assignIdToRecipes(recipes) {
    recipes.data.array.forEach((element, index) => {
      if (element.id === undefined || element.id === null) {
        element.id = getRecipeId(recipes, index);
      }
    });
  }

  /**
   * Create a recipe ID.
   *
   * @param {recipeData}
   * @param {index}
   * @public
   */
  createRecipeId(recipeData, index) {
    const hasIndex = currentData.data.includes(function(item) {
      return item.id === index;
    });
    if (hasIndex) {
      return getRecipeId(recipeData, index + 1);
    }

    return index;
  }

  /**
   * Save the recipe.
   *
   * @param {Object} newData
   * @public
   */
  saveRecipe(newData) {
    let currentData = JSON.parse(this.getRecipes());

    // Make sure that we have a data property before we move forward.
    if (!currentData.hasOwnProperty('data')) {
      return false;
    }

    // TODO: Validate the data:
    //   - Check the schema.
    //   - Filter the values.

    // Add the new data to the old data.
    currentData.data.push(newData);

    // Sort data alphabetically.
    this.sortRecipesByName(currentData);

    // Assign ID to each recipe.
    // this.assignIdToRecipes(currentData);

    fileStorageService.saveDatatoFile(currentData);
    return true;
  }
}

module.exports = new RecipeService();
