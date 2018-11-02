import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import ListIngredient from '../Page/ListPage/ListIngredient';
import Button from '../Button/Button';
import Recipe from '../../models/Recipe';
import userServiceSingleton from '../UserService';

/**
 * ListPageAccordion component.
 *
 * @public
 */
export default class ListPageAccordion extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.instanceOf(Recipe)).isRequired
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
              {userServiceSingleton.isUserAdmin && (
                <div>
                  <Button
                    text="Edit recipe"
                    link={'recipe/edit/' + recipe.id}
                    className="btn btn_tertiary"
                    isBtn={true}
                  />
                  <Button
                    text="Delete recipe"
                    link="#"
                    className="btn btn_secondary"
                    isBtn={true}
                    onClick={() => this.props.showModal(recipe)}
                  />
                </div>
              )}
            </div>
          ))}
        </Accordion>
      </ul>
    );
  }
}
