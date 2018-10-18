const fs = require('fs');
const fileStorageService = require('../Storage/RecipeFileStorageService');
const recipeValidationService = require('./RecipeValidationService');

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
   * Get recipe by ID.
   *
   * @param {number} id
   * @public
   */
  getRecipeById(id) {
    const recipes = JSON.parse(this.getRecipes());

    if (recipes.data === undefined || recipes.data.length === 0) {
      return {};
    }

    const recipe = recipes.data.filter(function(item) {
      return item.id === id;
    });

    if (recipe.length !== 0 && recipe[0].hasOwnProperty('name')) {
      console.log('GET recipe', recipe[0].name);
    }

    return JSON.stringify(recipe);
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
  assignIdToRecipes(recipeData) {
    recipeData.data.forEach((recipe, index) => {
      if (!recipeValidationService.validateRecipeId(recipe)) {
        recipe.id = this.createRecipeId(recipeData, index);
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
    let hasIndex = recipeData.data.filter(function(item) {
      return item.id === index;
    });

    if (hasIndex === undefined || hasIndex.length === 0) {
      return this.createRecipeId(recipeData, index + 1);
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
    this.assignIdToRecipes(currentData);

    fileStorageService.saveDatatoFile(currentData);
    return true;
  }

  updateRecipe(recipe) {
    let currentData = JSON.parse(this.getRecipes());

    // Make sure that we have a data property before we move forward.
    if (!currentData.hasOwnProperty('data')) {
      return false;
    }

    // Make sure the recipe to update has an id.
    if (!recipeValidationService.validateRecipeId(recipe)) {
      return false;
    }

    // TODO: Validate the data:
    //   - Check the schema.
    //   - Filter the values.

    // Get position of recipe.
    const elementPos = currentData.data
      .map(function(item) {
        return item.id;
      })
      .indexOf(recipe.id);

    currentData.data[elementPos] = recipe
    fileStorageService.saveDatatoFile(currentData);
  }
}

module.exports = new RecipeService();
