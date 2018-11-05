import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';

/**
 * ScalingHandler.
 *
 * @public
 */
export default class ScalingHandler {
  /**
   * Scale Recipe.
   *
   * @param {Object} state
   * @public
   */
  scaleRecipe = (state, index, scaleType, scaleAmount) => {
    const newState = Object.assign({}, state);
    const recipe = new Recipe(state.recipes[index]);
    const changedRecipe = new Recipe(state.recipes[index]);

    if (scaleAmount > 1) {
      // Multiple or divide the amount by the original value and
      // then change the value of the filtered recipes.
      const newIngArray = [];
      for (let i = 0; i < changedRecipe.ingredients.length; i++) {
        const originalIngredient = new Ingredient(recipe.ingredients[i]);
        const changedIngredient = new Ingredient(recipe.ingredients[i]);

        changedIngredient.amount = String(
          scaleType === '*'
            ? originalIngredient.amount * scaleAmount
            : originalIngredient.amount / scaleAmount
        );

        newIngArray.push(changedIngredient);
      }

      changedRecipe.ingredients = newIngArray;
      newState.filteredRecipes[index] = new Recipe(changedRecipe);
      newState.filteredRecipes[index].scaled = {
        scaleType: scaleType,
        scaleAmount: scaleAmount
      };
    } else {
      newState.filteredRecipes[index] = new Recipe(recipe);
    }

    return newState;
  };
}
