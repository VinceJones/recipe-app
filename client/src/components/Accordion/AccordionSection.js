import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * AccordionSection component.
 *
 * @public
 */
class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  /**
   * Get arrow used for accordion section.
   *
   * @param {isOpen}
   */
  getArrowIcon(isOpen) {
    if (isOpen) return <span>&#9660;</span>;

    return <span>&#9650;</span>;
  }

  /**
   * Get the container class to specify if the accordion is open or not.
   *
   * @param {Boolean} isOpen
   * @public
   */
  getContainerClass(isOpen) {
    if (isOpen) return 'Accordion-container Accordion-selected';

    return 'Accordion-container';
  }

  /**
   * Handle open and closing the accordion.
   *
   * @public
   */
  onClick = event => {
    this.props.onClick(this.props.label, event);
  };

  /**
   * Render AccordionSection.
   *
   * @public
   */
  render() {
    const {
      onClick,
      props: { isOpen, label, description }
    } = this;

    return (
      <div className={this.getContainerClass(isOpen)}>
        <div className="Accordion-details" onClick={onClick}>
          <h3>
            {label}
            <div className="Accordion-icon">{this.getArrowIcon(isOpen)}</div>
          </h3>

          {isOpen && <hr />}

          {isOpen && (
            <div>
              <p>{description}</p>
              <div className="Accordion-inner">{this.props.children}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AccordionSection;
