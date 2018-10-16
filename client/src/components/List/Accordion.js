import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccordionSection from './AccordionSection';

class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired
  };

  static defaultProps = {
    allowMultipleOpen: false
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach((child, index) => {
      if (child.props.isOpen) {
        this.props.children[index].innerClass = 'Accordion-details Accordion-selected'
        openSections[child.props.label] = true;
      } else {
        this.props.children[index].innerClass = 'Accordion-details'
      }
    });

    this.state = { openSections };
  }

  onClick = label => {
    const {
      props: { allowMultipleOpen },
      state: { openSections }
    } = this;

    const isOpen = !!openSections[label];

    console.log(this);
    console.log(label);

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

    console.log(this);
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections }
    } = this;

    return (
      <li>
        {children.map((child, index) => (
          <AccordionSection
            key={index}
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            description={child.props.description}
            onClick={onClick}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </li>
    );
  }
}

export default Accordion;
