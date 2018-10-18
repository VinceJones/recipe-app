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
    const currentData = JSON.parse(this.getRecipes());

    if (currentData.data === undefined || currentData.data.length === 0) {
      return {};
    }

    // Get position of recipe by id.
    const index = this.getIndexOfRecipeById(currentData, id);

    if (index === undefined || index === null || index === '' || index === -1) {
      return {};
    }

    const recipe = currentData.data[index];
    console.log('GET recipe', recipe.name);

    return JSON.stringify(recipe);
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
    console.log('POST recipe ', newData.name);

    return true;
  }

  /**
   * Update the recipe.
   *
   * @param {Object} recipe
   * @public
   */
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
    const elementPos = this.getIndexOfRecipeById(currentData, recipe.id);

    currentData.data[elementPos] = recipe;
    fileStorageService.saveDatatoFile(currentData);
    console.log('PUT recipe ', recipe.name);
  }

  /**
   * Delete recipe by ID.
   *
   * @param {number} id
   * @public
   */
  deleteRecipeById(id) {
    const currentData = JSON.parse(this.getRecipes());

    if (currentData.data === undefined || currentData.data.length === 0) {
      return false;
    }

    // Get position of recipe by id.
    const index = this.getIndexOfRecipeById(currentData, id);

    if (index === undefined || index === null || index === '') {
      return false;
    }

    console.log('DELETE recipe ', currentData.data[index].name);
    currentData.data.splice(index, 1);
    fileStorageService.saveDatatoFile(currentData);

    return true;
  }

  /**
   * Get index of recipe by id.
   *
   * @param {Object} currentData
   * @param {number} id
   * @private
   */
  getIndexOfRecipeById(currentData, id) {
    return currentData.data
      .map(function(item) {
        return item.id;
      })
      .indexOf(id);
  }

  /**
   * Sort recipes by name
   *
   * @param {Object} recipes
   * @private
   */
  sortRecipesByName(recipes) {
    recipes.data.sort(function(a, b) {
      
      if (a.name === undefined || b.name === undefined) {
        return 0;
      }

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
   * @private
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
   * @private
   */
  createRecipeId(recipeData, index) {
    const recipeIndex = this.getIndexOfRecipeById(recipeData, index);

    if (
      recipeIndex === undefined ||
      recipeIndex === null ||
      recipeIndex === ''
    ) {
      return this.createRecipeId(recipeData, index + 1);
    }

    return index;
  }
}

module.exports = new RecipeService();
