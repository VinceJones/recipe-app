const fetch = require('node-fetch');
const authConfig = require('../../AuthConfig');

/**
 * GithubAuthService.
 *
 * Service to help with GitHub Auth.
 *
 * @public
 */
class GithubAuthService {
  /**
   * GithubAuthService constructor.
   *
   * @public
   */
  constructor() {
    this.endpoints = {
      accessToken: 'https://github.com/login/oauth/access_token'
    };
  }

  /**
   * Get request headers.
   */
  getHeaders() {
    return {
      'content-type': 'text/plain',
      Accept: 'application/json'
    };
  }

  /**
   * Get Github Access token
   *
   * @param {string} code
   */
  async getAccesstoken(code) {
    const headers = this.getHeaders();

    const options = {
      method: 'POST',
      headers: headers,
      body: {
        code: code,
        client_id: authConfig.client_id,
        client_secret: authConfig.client_secret
      }
    };

    console.log('Request options:\n', options);

    const accessToken = await this.makeRequest(
      this.endpoints.accessToken,
      options
    );

    console.log('Access token:\n', accessToken);

    return accessToken;
  }

  async makeRequest(endpoint, options) {
    return await fetch(endpoint, options)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error', error);
        return error;
      });
  }
}

module.exports = new GithubAuthService();
