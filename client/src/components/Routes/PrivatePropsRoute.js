import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import renderMergedProps from './renderMergedProps';

/**
 * Add props to a private route.
 *
 * @param {Object} Object
 * @param {Object} component
 * @param {...any} props
 */
const PrivatePropsRoute = ({ component, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps => {
        if (props.userUtility.isUserAdmin) {
          return renderMergedProps(component, routeProps, props);
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivatePropsRoute;
