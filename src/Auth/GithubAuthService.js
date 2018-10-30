const fetch = require('node-fetch');
const authConfig = require('../../AuthConfig');
const qs = require('querystring');

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
      accessToken: 'https://github.com/login/oauth/access_token',
      user: 'https://api.github.com/user',
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
  async getAccessToken(code) {
    const headers = this.getHeaders();

    const options = {
      method: 'POST',
      headers: headers,
    };

    const accessTokenQueryString = qs.stringify({
      code: code,
      client_id: authConfig.client_id,
      client_secret: authConfig.client_secret,
      scope: ['user'],
      redirectUri: 'http://localhost:5000/login'
    });

    const accessTokenObj = await this.makeRequest(
      this.endpoints.accessToken + '?' + accessTokenQueryString,
      options
    );

    console.log('Access token:\n', accessTokenObj);

    const userQueryString = qs.stringify({
      access_token: accessTokenObj.access_token,
    });

    const user = await this.makeRequest(this.endpoints.user + '?' + userQueryString);

    console.log('User: ', user);

    return user;
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
