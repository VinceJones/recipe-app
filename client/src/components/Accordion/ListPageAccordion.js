import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import ListIngredient from '../Page/ListPage/ListIngredient';

/**
 * ListPageAccordion component.
 *
 * @public
 */
export default class ListPageAccordion extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
  };

  /**
   * Render ListPageAccordion.
   *
   * @public
   */
  render() {
    return (
      <ul className="ListRecipe-container">
        <Accordion allowMultipleOpen>
          {this.props.recipes.map((recipe, index) => (
            <div
              key={index}
              label={recipe.name}
              description={recipe.description}
            >
              <ul>
                <h4>Ingredients</h4>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListIngredient key={index} ingredient={ingredient} />
                ))}
              </ul>
              <div>
                <a href={'recipe/edit/' + recipe.id}>
                  <button className="btn btn_tertiary">Edit recipe</button>
                </a>

                <button
                  type="button"
                  className="btn btn_secondary"
                  onClick={() => this.props.showModal(recipe)}
                >
                  Delete recipe
                </button>
              </div>
            </div>
          ))}
        </Accordion>
      </ul>
    );
  }
}
