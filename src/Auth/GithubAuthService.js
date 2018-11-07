const fetch = require('node-fetch');
const config = require('../../Config');
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
      redirectUri: 'http://localhost:5000/login',
      accessToken: 'https://github.com/login/oauth/access_token',
      user: 'https://api.github.com/user',
    };
  }

  /**
   * Get request headers.
   * 
   * @public
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
   * @public
   */
  async getAccessToken(code) {
    const headers = this.getHeaders();

    const options = {
      method: 'POST',
      headers: headers,
    };

    const accessTokenQueryString = qs.stringify({
      code: code,
      client_id: config.client_id,
      client_secret: config.client_secret,
      scope: ['user'],
      redirectUri: this.endpoints.redirectUri
    });

    const accessTokenObj = await this.makeRequest(
      this.endpoints.accessToken + '?' + accessTokenQueryString,
      options
    );

    console.log('Access token:\n', accessTokenObj);
    return accessTokenObj.access_token;
  }

  /**
   * Is user admin?
   * 
   * @param {string} accessToken
   * @public
   */
  async isUserAdmin(accessToken) {
    const user = await this.getUser(accessToken);

    if (!user.hasOwnProperty('id') && user.id !== '' && user.id !== undefined && user.id !== null) {
      return false;
    }

    const userId = parseInt(user.id);
    console.log('checking userId', user, userId);

    const response = {
      approved: false,
      userId: userId,
    }

    if (config.approved_users.includes(userId)) {
      response.approved = true;
    }

    return JSON.stringify(response);
  }

  /**
   * Get the user object.
   * 
   * @param {string} accessToken
   * @public
   */
  async getUser(accessToken) {
    const userQueryString = qs.stringify({
      access_token: accessToken,
    });

    const user = await this.makeRequest(this.endpoints.user + '?' + userQueryString);
    return user;
  }

  /**
   * Make a request.
   * 
   * @param {string} endpoint 
   * @param {Object} options
   * @public
   */
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
