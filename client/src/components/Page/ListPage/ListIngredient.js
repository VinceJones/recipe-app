import React from 'react';

/**
 * Return a scaled ingredient amount
 * 
 * Doing this inline allows values to be changed on the fly more easily.
 * 
 * @param {Ingredient} ingredient 
 * @param {Object} scaled 
 */
function scaleIngredient(ingredient, scaled) {
  const { type, amount } = scaled;
  let ingredientAmount = ingredient.amount;

  if (type && amount ) {
    ingredientAmount = String(
      type === '*'
        ? ingredient.amount * amount
        : ingredient.amount / amount
    );
  }

  return ingredientAmount;
}

/**
 * ListIngredient Component.
 */
const ListIngredient = ({ingredient, scaled = {}}) => {
  const amount = scaleIngredient(ingredient, scaled);
  return (
    <li>
        <div className="container--flex-row">
          <span className="ingredient__amount">{amount} {ingredient.measurementType}</span>
          <span className="ingredient__label">{ingredient.name}</span>
        </div>
      </li>
  )
}

export default ListIngredient;