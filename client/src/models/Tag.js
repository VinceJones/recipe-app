/**
 * Tag model.
 *
 * @public
 */
export default class Tag {
  /**
   * Tag constructor.
   *
   * @param {Object} tag
   * @public
   */
  constructor(tag = {}) {
    this.id = tag.id ? tag.id : '';
    this.name = tag.name ? tag.name : '';
  }
}
