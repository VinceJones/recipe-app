import React, { Component } from 'react';
import Page from '../Page';
import LoginPageContent from './LoginPageContent';
import userServiceSingleton from '../../UserService';

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
        <LoginPageContent
          githubId={userServiceSingleton.githubId}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </Page>
    );
  }
}
