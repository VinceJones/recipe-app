import React, { Component } from 'react';
import Button from '../Button/Button';

import './Modal.css';

/**
 * DeleteModal component.
 *
 * @public
 */
export default class Modal extends Component {
  /**
   * Get the show hide class name.
   *
   * @param {Boolean} show
   * @public
   */
  getShowHideClassName = show => {
    return show ? 'Modal Modal-display' : 'Modal Modal-hide';
  };

  /**
   * Render the modal.
   *
   * @public
   */
  render() {
    return (
      <div className={this.getShowHideClassName(this.props.show)}>
        <section className="Modal-main">
          {this.props.children}
          <div className="Modal-btnCloseContainer">
            <Button
              text="Close"
              link="#"
              className="btn btn_tertiary btn_modalClose"
              isBtn={true}
              onClick={() => this.props.hideModal()}
            />
          </div>
        </section>
      </div>
    );
  }
}
