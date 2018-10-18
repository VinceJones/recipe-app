const WARNING = 'warning';
const ERROR = 'error';
const SUCCESS = 'success';

/**
 * MessageService.
 */
export default class MessageService {
  
  /**
   * Get the message status after recipe POST has completed.
   *
   * @param {bool} saved
   * @public
   */
  getPostMessageStatus = saved => {
    return saved ? SUCCESS : ERROR;
  };

  /**
   * Get the message after recipe POST has completed.
   *
   * @param {Boolean} saved
   * @public
   */
  getSavedRecipeMessage = saved => {
    return saved ? 'Recipe has been saved.' : 'Recipe has not been saved.';
  };

  /**
   * Get the recipe not found status.
   *
   * @public
   */
  getRecipeNotFoundStatus = () => {
    return WARNING;
  }

  /**
   * Get recipe not found message.
   * 
   * @public
   */
  getRecipeNotFoundMessage = () => {
    return 'Recipe could not be found, try adding a new recipe';
  }

  /**
   * Get the recipe not found status.
   *
   * @public
   */
  getRecipeUpdateStatus = () => {
    return SUCCESS;
  }

  /**
   * Get recipe not found message.
   * 
   * @public
   */
  getRecipeUpdateMessage = (name = '') => {
    return name + ' recipe has been updated.';
  }
}
