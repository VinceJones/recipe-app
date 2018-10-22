import React, { Component } from 'react';

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
    return show ? 'modal display-block' : 'modal display-none';
  };

  /**
   * Render the modal.
   *
   * @public
   */
  render() {
    return (
      <div className={this.getShowHideClassName(this.props.show)}>
        <section className="modal-main">
          {this.props.children}
          <button className="btn btn_tertiary btn_modalClose" onClick={() => this.props.hideModal()}>close</button>
        </section>
      </div>
    );
  }
}
