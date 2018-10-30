import React, { Component } from 'react';
import Page from '../Page';
import GitHubLogin from 'react-github-login';
import AuthHandler from '../../AuthHandler';

const authHandler = new AuthHandler();

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      client_id: ''
    };
  }

  componentDidMount = async () => {
    const client_id = await authHandler.getClientId();
    console.log('client_id', client_id.data);
    this.setState({ client_id: client_id.data });
  };

  /**
   * Handle successful login
   *
   * @param {Object} response
   * @public
   */
  onSuccess = async code => {
    console.log('success', code);
    const accessToken = await authHandler.getAccessToken(code);
    console.log('accessToken', accessToken.data);
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
      <Page pageTitle="Login" messageUtility={this.props.messageUtility}>
        <GitHubLogin
          clientId={this.state.client_id}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          redirectUri={authHandler.endpoints.redirectUri}
        />
      </Page>
    );
  }
}
