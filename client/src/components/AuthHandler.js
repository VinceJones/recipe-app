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
      host: 'http://localhost:5000',
      accessToken: '/auth/login/',
      clientId: '/auth/get/client_id',
      redirectUri: 'http://localhost:5000/login',
    };
  }

  /**
   * Get the client_id from the server.
   */
  getClientId = async () => {
      return await this.makeRequest(this.endpoints.clientId);
  }

  /**
   * Get the access github access token
   *
   * @param {string} code
   * @public
   */
  getAccessToken = async code => {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Accept', 'application/json');

    const json = JSON.stringify(code);

    const options = {
      method: 'POST',
      headers,
      body: json
    };

    console.log('Try to get access token');

    return await this.makeRequest(this.endpoints.accessToken, options);
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
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error', error);
        return error;
      });
  };
}
