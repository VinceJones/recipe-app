import React, { Component } from 'react';
import Page from '../Page';
import GitHubLogin from 'react-github-login';
import AuthHandler from '../../AuthHandler';

const authHandler = new AuthHandler();

export default class LoginPage extends Component {
  /**
   * Handle successful login
   *
   * @param {Object} response
   * @public
   */
  onSuccess = async response => {
    let accessToken = '';
    const accessTokenResponse = await authHandler.getAccessToken(response.code);

    if (accessTokenResponse.hasOwnProperty('data')) {
      accessToken = accessTokenResponse.data;
    }

    await this.props.userUtility.setUser(accessToken);
    await this.props.userUtility.setUserIsAdmin();
    this.props.history.push('/');
  };

  /**
   * Handle error login
   *
   * @param {Object} response
   * @public
   */
  onFailure = response => console.error('error', response);

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <Page
        pageTitle="Login"
        messageUtility={this.props.messageUtility}
        userUtility={this.props.userUtility}
      >
        <GitHubLogin
          clientId={this.props.userUtility.user.clientId}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          redirectUri={authHandler.endpoints.redirectUri}
        />
      </Page>
    );
  }
}
