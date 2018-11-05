import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListPageAccordion from '../Accordion/ListPageAccordion';
import Recipe from '../../models/Recipe';

/**
 * ListPageFilterForm component.
 *
 * @public
 */
export default class ListPageFilterForm extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    filterList: PropTypes.func.isRequired,
    filterValue: PropTypes.string,
    recipes: PropTypes.arrayOf(PropTypes.instanceOf(Recipe))
  };

  /**
   * Render ListPageFilterForm
   *
   * @public
   */
  render() {
    return (
      <div className="ListPage-container">
        <form>
          <fieldset>
            <input
              type="text"
              name="filterInput"
              value={this.props.filterValue}
              className="ListPage-filterInput"
              placeholder="Search by Recipe name, Ingredient name, or Tag name"
              onChange={event => this.props.filterList(event)}
            />
          </fieldset>
        </form>
        <ListPageAccordion
          recipes={this.props.recipes}
          showModal={recipe => this.props.showModal(recipe)}
          scaleRecipe={(index, scaleType, scaleAmount) =>
            this.props.scaleRecipe(index, scaleType, scaleAmount)
          }
        />
      </div>
    );
  }
}
