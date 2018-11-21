import React from 'react';

/**
 * Render component with merged props.
 *
 * @param {Object} component
 * @param  {...any} props
 */
const renderMergedProps = (component, ...props) => {
  const finalProps = Object.assign({}, ...props);
  return React.createElement(component, finalProps);
};

export default renderMergedProps;