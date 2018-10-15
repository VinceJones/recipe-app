import React from 'react';
import PropTypes from 'prop-types';

import './Accordion.css';

class AccordionSection extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      detailsClass: 'Accordion-details'
    };
  }

  onClick = () => {

    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label, description }
    } = this;

    return (
      <div className='Accordion-container'>
        <div
          className='Accordion-details'
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          <h3>
            {label}
            <div style={{ float: 'right' }}>
              {!isOpen && <span>&#9650;</span>}
              {isOpen && <span>&#9660;</span>}
            </div>
          </h3>
          <p>{description}</p>
          {isOpen && (
            <div className='Accordion-inner'>{this.props.children}</div>
          )}
        </div>
      </div>
    );
  }
}

export default AccordionSection;
