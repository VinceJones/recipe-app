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
   * @public
   */
  getContainerClass() {
    if (this.props.isOpen) return 'Accordion-container Accordion-selected';

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
    return (
      <div className={this.getContainerClass()}>
        <div className="Accordion-details">
          <div className="Accordion-titleContainer" onClick={this.onClick}>
            <h3 className="Accordion-title">{this.props.label}</h3>
            <span className="Accordion-icon">
              {this.getArrowIcon(this.props.isOpen)}
            </span>
          </div>

          {this.props.isOpen && (
            <div className="Accordion-bodyContainer">
              <hr />
              <p>{this.props.description}</p>
              <div className="Accordion-inner">{this.props.children}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AccordionSection;
