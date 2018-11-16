import React from 'react';

/**
 * LoginPageContent component.
 *
 * @public
 */
const LoginPageContent = ({ githubId = '' }) => {
  return (
    <div className="login__container">
      <h3>If you wish to contribute recipes</h3>
      <ol>
        <li>Login with Github using the button below</li>
        <li>
          You will be presented with your Github ID, send this ID to{' '}
          <a href="mailto:vincentjones4426@gmail.com">
            vincentjones4426@gmail.com
          </a>
          {' '} stating that you would like to have access to Add/Edit/Delete content on this site.
        </li>
        <li>
          You will then be added to approved users and will be able to
          Add/Edit/Delete content.
        </li>
      </ol>

      {githubId !== '' && (
        <div>
          <h3>Github ID: {githubId}</h3>
        </div>
      )}
    </div>
  );
};

export default LoginPageContent;
