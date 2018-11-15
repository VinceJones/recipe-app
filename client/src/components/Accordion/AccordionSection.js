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
    if (this.props.isOpen) return 'accordion accordion--selected';

    return 'accordion';
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
        <div className="accordion__title" onClick={this.onClick}>
          <h3 className="inline">{this.props.label}</h3>
          <span className="right">{this.getArrowIcon(this.props.isOpen)}</span>
        </div>

        {this.props.isOpen && (
          <div className="accordion__body">
            <hr />
            {this.props.description !== '' && <p>{this.props.description}</p>}
            <div className="accordion__bodyInner">{this.props.children}</div>
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
