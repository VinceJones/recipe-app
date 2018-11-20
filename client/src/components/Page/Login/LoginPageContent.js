import React from 'react';
import GitHubLogin from 'react-github-login';
import AuthHandler from '../../AuthHandler';
import userServiceSingleton from '../../UserService';
import './login.css';

const authHandler = new AuthHandler();

/**
 * LoginPageContent component.
 *
 * @public
 */
const LoginPageContent = ({ githubId = '00000000', onSuccess, onFailure }) => {
  return (
    <div className="login">
      <div className="login__hd">
        <h3>If you wish to contribute recipes</h3>
      </div>
      <div className="login__bd">
        <ol>
          <li>Login with Github using the button below</li>
          <li>
            You will be presented with your Github ID, send this ID to{' '}
            <a href="mailto:vincentjones4426@gmail.com">
              vincentjones4426@gmail.com
            </a>{' '}
            stating that you would like to have access to Add/Edit/Delete
            content on this site.
          </li>
          <li>
            You will then be added to approved users and will be able to
            Add/Edit/Delete content.
          </li>
        </ol>
      </div>

      <div className="login__ft">
        <h3>Github ID: {githubId}</h3>
        <GitHubLogin
          clientId={userServiceSingleton.clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri={authHandler.endpoints.redirectUri}
          className="btn btn_secondary btn_login"
        />
      </div>
    </div>
  );
};

export default LoginPageContent;
