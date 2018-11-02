/**
 * AuthHandler service.
 *
 * @public
 */
export default class AuthHandler {
  /**
   * StorageHandler constructor.
   *
   * @public
   */
  constructor() {
    this.endpoints = {
      host: window.location.protocol + '//' + window.location.host + ':5000',
      redirectUri: window.location.protocol + '//' + window.location.host + '/login',
      accessToken: '/auth/login',
      clientId: '/auth/get/client_id',
      isUserAdmin: '/auth/get/isUserAdmin'
    };
  }

  /**
   * Get the client_id from the server.
   *
   * @public
   */
  getClientId = async () => {
    const response = await this.makeRequest(this.endpoints.clientId);

    if (!response.hasOwnProperty('data')) {
      return '';
    }

    console.log('getClientId response', response);

    return response.data;
  };

  /**
   * Get the access github access token
   *
   * @param {string} code
   * @public
   */
  getAccessToken = async code => {
    const endpoint = this.endpoints.accessToken + '/' + code;
    const response = await this.makeRequest(endpoint);

    if (!response.hasOwnProperty('data')) {
      return '';
    }

    return response;
  };

  /**
   * Find out whether the user that loggec in is admin.
   *
   * @param {User} user
   * @public
   */
  isUserAdmin = async user => {
    if (!user.hasOwnProperty('accessToken') || user.accessToken === '') {
      return false;
    }

    const endpoint = this.endpoints.isUserAdmin + '/' + user.accessToken;
    const response = await this.makeRequest(endpoint);
    return response.user;
  };

  /**
   * Make a request.
   *
   * @param {endpoint}
   * @param {options}
   * @public
   */
  makeRequest = async (endpoint, options = {}) => {
    return fetch(this.endpoints.host + endpoint, options)
      .then(response => response.json())
      .then(result => result)
      .catch(error => {
        console.log('error', error);
        return error;
      });
  };
}
