import React from 'react';
import { Route } from 'react-router-dom';
import renderMergedProps from './renderMergedProps';

/**
 * Add props to a route.
 *
 * @param {Object} Object
 * @param {Object} component
 * @param {...any} props
 */
const PropsRoute = ({ component, ...props }) => {
    return (
      <Route
        {...props}
        render={routeProps => {
          return renderMergedProps(component, routeProps, props);
        }}
      />
    );
  };

  export default PropsRoute;
