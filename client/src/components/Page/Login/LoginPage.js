import React, { Component } from 'react';
import Page from '../Page';
import GitHubLogin from 'react-github-login';
import LoginPageContent from './LoginPageContent';
import AuthHandler from '../../AuthHandler';
import userServiceSingleton from '../../UserService';
import './LoginPage.css';

const authHandler = new AuthHandler();

export default class LoginPage extends Component {
  /**
   * Handle successful login
   *
   * @param {Object} response
   * @public
   */
  onSuccess = async response => {
    await userServiceSingleton.handleLoginSuccess(response);
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
      <Page pageTitle="Login">
        <LoginPageContent githubId={userServiceSingleton.githubId} />
        <div>
          <GitHubLogin
            clientId={userServiceSingleton.clientId}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            redirectUri={authHandler.endpoints.redirectUri}
            className="btn btn_secondary btn_login"
          />
        </div>
      </Page>
    );
  }
}
