import React from 'react';

/**
 * LoginPageContent component.
 *
 * @public
 */
const LoginPageContent = ({ githubId = '' }) => {
  return (
    <div className="LoginPageContent-container">
      <p>
        If you wish to contribute recipes to the Recipe App please login with
        Github and send your send your Github ID to{' '}
        <a href="mailto:vincentjones4426@gmail.com">
          vincentjones4426@gmail.com
        </a>
        . You will then be added to approved users.
      </p>

      {githubId !== '' && (
        <div>
          <h3>Github ID: {githubId}</h3>
        </div>
      )}
    </div>
  );
};

export default LoginPageContent;
