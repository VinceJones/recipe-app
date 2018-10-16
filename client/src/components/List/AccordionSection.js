import React from 'react';
import PropTypes from 'prop-types';

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

  /**
   * Get arrow used for accordion section.
   *
   * @param {isOpen}
   */
  getArrowIcon(isOpen) {
    if (isOpen) return <span>&#9660;</span>;

    return <span>&#9650;</span>;
  }

  getContainerClass(isOpen) {
    if (isOpen) return 'Accordion-container Accordion-selected';

    return 'Accordion-container';
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
      <div className={this.getContainerClass(isOpen)}>
        <div className="Accordion-details" onClick={onClick}>
          <h3>
            {label}
            <div className="Accordion-icon">{this.getArrowIcon()}</div>
          </h3>

          {isOpen && (<hr />)}

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
