/**
 * Ingredient model.
 */
export default class Ingredient {
  /**
   * Ingredient constructor.
   *
   * @param {Object} ing
   */
  constructor(ing = {}) {
    this.name = ing.name ? ing.name : '';
    this.amount = ing.amount ? ing.amount : '';
    this.measurementType = ing.measurementType ? ing.measurementType : '';
  }
}
