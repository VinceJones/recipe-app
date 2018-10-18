/**
 * MessageService.
 */
export default class MessageService {
  /**
   * Get the message after recipe POST has completed.
   *
   * @param {Boolean} saved
   * @public
   *
   */
  getSavedRecipeMessage = saved => {
    return saved ? 'Recipe has been saved.' : 'Recipe has not been saved.';
  };

  /**
   * Get the message status after recipe POST has completed.
   *
   * @param {bool} saved
   * @public
   */
  getPostMessageStatus = saved => {
    return saved ? 'success' : 'error';
  };
}
