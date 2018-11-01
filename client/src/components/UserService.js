import AuthHandler from './AuthHandler';
import StorageHandler from './StorageHandler';
import User from '../models/User';

const authHandler = new AuthHandler();
const storageHandler = new StorageHandler();

/**
 * UserService.
 *
 * @public
 */
class UserService {
  appComponent = null;

  /**
   * Set the app component.
   *
   * @param {Object} appComponent
   * @public
   */
  setAppComponent(appComponent) {
    this.appComponent = appComponent;
  }

  /**
   * Get the client id.
   *
   * @public
   */
  setClientId = async () => {
    if (this.appComponent.state.userUtility.user.clientId !== '') {
      return;
    }

    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.user.clientId = await authHandler.getClientId();
    this.appComponent.setState(nextState);
  };

  /**
   * Get the user from local storage if it exists.
   *
   * @public
   */
  getUser = async () => {
    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.user = storageHandler.getUser(
      this.appComponent.state.userUtility.storageKey
    );
    this.appComponent.setState(nextState);
  };

  /**
   * Set the user information using the accesstoken.
   *
   * @param {string} accessToken
   * @public
   */
  setUser = async accessToken => {
    if (!accessToken) {
      this.setState({});
    }

    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.user.accessToken = accessToken;

    localStorage.setItem(
      nextState.userUtility.storageKey,
      JSON.stringify(nextState.userUtility.user)
    );

    this.appComponent.setState(nextState);
  };

  /**
   * Get whether a user is admin.
   *
   * @public
   */
  setUserIsAdmin = async () => {
    const isUserAdmin = await authHandler.isUserAdmin(
      this.appComponent.state.userUtility.user
    );
    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.isUserAdmin = isUserAdmin;
    this.appComponent.setState(nextState);
  };
}

export default new UserService();
