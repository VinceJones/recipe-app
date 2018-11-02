import Message from '../models/Message';

const WARNING = 'warning';
const ERROR = 'error';
const SUCCESS = 'success';

/**
 * MessageService.
 *
 * @public
 */
class MessageService {
  /**
   * Default value for appComponent.
   */
  appComponent = null;

  /**
   * Set the app component.
   *
   * @param {Object} appComponent
   * @public
   */
  setAppComponent(appComponent) {
    this.appComponent = appComponent;
    this.appComponent.state.messageUtility = {
      message: new Message({}),
      getMessage: () => this.getMessage(),
      clearMessages: () => this.clearMessages(),
      setMessage: (status, text) => this.setMessage(status, text),
      toggleMessageShown: () => this.toggleMessageShown()
    };
  }

  /**
   * Get the message properties
   *
   * @public
   */
  get message() {
    if (this.appComponent.state.messageUtility !== undefined) {
      return this.appComponent.state.messageUtility.message.props;
    }

    return new Message({});
  }

  /**
   * Clear message.
   *
   * @public
   */
  clearMessages = async () => {
    if (this.appComponent.state.messageUtility.message.shown) {
      const nextState = Object.assign({}, this.appComponent.state);
      nextState.messageUtility.message = new Message({});
      await this.appComponent.setState(nextState);
    }
  };

  /**
   * Set message.
   *
   * @param {string} status
   * @param {string} text
   * @public
   */
  setMessage = async (status, text) => {
    console.log('setMessage', status, text);
    const nextState = Object.assign({}, this.appComponent.state);
    nextState.messageUtility.message = new Message({ status, text });
    this.appComponent.setState(nextState);
  };

  /**
   * Toggle whether the message has been shown.
   *
   * @public
   */
  toggleMessageShown = async () => {
    if (
      this.appComponent.state.messageUtility !== undefined &&
      this.appComponent.state.messageUtility.message.shown === false
    ) {
      console.log('toggling message');
      const nextState = Object.assign({}, this.appComponent.state);
      nextState.messageUtility.message.shown =
        nextState.messageUtility.message.shown === true ? false : true;
      this.appComponent.setState(nextState);
    }
  };


  /**
   * Available Statuses.
   * 
   * @public
   */
  statuses = () => {
    return {
      WARNING: WARNING,
      ERROR: ERROR,
      SUCCESS: SUCCESS
    }
  }
  
  /**
   * Get the message status after recipe POST has completed.
   *
   * @param {bool} saved
   * @public
   */
  getPostMessageStatus = saved => {
    console.log('getPostMessageStatus saved', saved);
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

  /**
   * Get the recipe delete status.
   *
   * @public
   */
  getRecipeDeleteStatus = () => {
    return SUCCESS;
  }

  /**
   * Get recipe delete message.
   * 
   * @public
   */
  getRecipeDeleteMessage = (name = '') => {
    return name + ' recipe has been deleted.';
  }

  /**
   * Get the recipe delete status.
   *
   * @public
   */
  getRecipeDeleteFailStatus = () => {
    return ERROR;
  }

  /**
   * Get recipe delete message.
   * 
   * @public
   */
  getRecipeDeleteFailMessage = (name = '') => {
    return name + ' recipe has not been deleted.';
  }
}

export default new MessageService();
