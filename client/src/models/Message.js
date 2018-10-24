/**
 * Message model.
 *
 * @public
 */
export default class Message {
  /**
   * Message constructor.
   *
   * @param {Object} Object
   * @param {string} status
   * @param {string} text
   * @param {Boolean} shown
   */
  constructor({ status = '', text = '', shown = false }) {
    this.status = status ? status : '';
    this.text = text ? text : '';
    this.shown = shown;
  }
}
