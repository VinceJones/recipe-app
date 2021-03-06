import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccordionSection from './AccordionSection';

import './accordion.css';

/**
 * Accordion component.
 * 
 * @public
 */
class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired
  };

  static defaultProps = {
    allowMultipleOpen: false
  };

  /**
   * Accordion constructor.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach((child, index) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      } else {
      }
    });

    this.state = { openSections };
  }

  /**
   * Handle opening and closing accordions.
   *
   * @param {string} label
   * @public
   */
  onClick = label => {
    const {
      props: { allowMultipleOpen },
      state: { openSections }
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    }
  };

  /**
   * Render Accordion.
   *
   * @public
   */
  render() {
    return (
      <div>
        {this.props.children.map((child, index) => (
          <AccordionSection
            key={index}
            isOpen={!!this.state.openSections[child.props.label]}
            label={child.props.label}
            description={child.props.description}
            onClick={this.onClick}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

export default Accordion;
