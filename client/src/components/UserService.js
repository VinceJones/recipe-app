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
    this.appComponent.state.userUtility = {
      user: new User(),
      storageKey: 'recipeAppUser',
      isUserAdmin: true
    };
  }

  /**
   * Get the client id.
   *
   * @public
   */
  get clientId() {
    return this.appComponent.state.userUtility.user.clientId;
  }

  get githubId() {
    return this.appComponent.state.userUtility.user.githubId;
  }

  /**
   * Get whether the user is admin.
   *
   * @public
   */
  get isUserAdmin() {
    return this.appComponent.state.userUtility.isUserAdmin;
  }

  /**
   * AppComponent setup
   *
   * @public
   */
  appSetup = async () => {
    await this.getUser();
    await this.setClientId();
    await this.setUserIsAdmin();
  };

  /**
   * Handle successful login.
   *
   * @param {Object} response
   * @public
   */
  handleLoginSuccess = async response => {
    let accessToken = '';
    const accessTokenResponse = await authHandler.getAccessToken(response.code);

    if (accessTokenResponse.hasOwnProperty('data')) {
      accessToken = accessTokenResponse.data;
    }

    await this.setUser(accessToken);
    await this.setUserIsAdmin();
  };

  logout = async () => {
    await localStorage.removeItem(
      this.appComponent.state.userUtility.storageKey
    );
    const nextState = Object.assign({}, this.appComponent.state);

    nextState.userUtility.user = new User({
      accessToken: '',
      clientId: this.clientId
    });
    nextState.userUtility.isUserAdmin = false;

    await this.appComponent.setState(nextState);
  };

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
    nextState.userUtility.user = await storageHandler.getUser(
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
  setUser = async (accessToken = '') => {
    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.user.accessToken = accessToken;

    storageHandler.setUser(
      nextState.userUtility.user,
      nextState.userUtility.storageKey
    );

    this.appComponent.setState(nextState);
  };

  /**
   * Get whether a user is admin.
   *
   * @public
   */
  setUserIsAdmin = async () => {
    const user = await authHandler.isUserAdmin(
      this.appComponent.state.userUtility.user
    );
    const nextState = Object.assign({}, this.appComponent.state);
    nextState.userUtility.isUserAdmin = user.approved;
    nextState.userUtility.isUserAdmin = true;
    nextState.userUtility.user.githubId = user.userId;
    this.appComponent.setState(nextState);
  };
}

export default new UserService();
