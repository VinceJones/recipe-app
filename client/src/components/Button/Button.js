import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Button component.
 * 
 * @public
 */
export default class Button extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    attr: PropTypes.objectOf(PropTypes.string),
    isBtn: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    preventDefault: PropTypes.bool
  };

  /**
   * Get classes to apply to the button.
   *
   * @public
   */
  get className() {
    let classes = 'btn';

    if (
      this.props.className !== undefined &&
      this.props.className !== null &&
      this.props.className !== ''
    ) {
      classes += ' ' + this.props.className;
    }

    return classes;
  }

  /**
   * Get attributes to apply to the button.
   * 
   * @public
   */
  get attributes() {
    let attr = {};

    if (this.props.className) attr['className'] = this.props.className;
    if (this.props.isBtn) attr['role'] = 'button';
    if (this.props.onClick) attr['onClick'] = this.onClick;

    attr['href'] = this.props.link;

    return {...attr, ...this.props.attr};
  }

  /**
   * Handle click events and preventDefault when needed.
   * 
   * @public
   */
  onClick = (e) => {
    if (this.props.preventDefault) {
      e.preventDefault();
    }

    this.props.onClick();
  }

  /**
   * Render Button.
   *
   * @public
   */
  render() {
    return (
      <a {...this.attributes}>
        {this.props.text}
      </a>
    );
  }
}
