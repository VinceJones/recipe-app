import React from 'react';

import './Modal.css';

/**
 * DeleteModal.
 *
 * @public
 */
export default class Modal extends React.Component {
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
      <div className={this.props.show ? 'modal display-block' : 'modal display-none'}>
        <section className="modal-main">
          {this.props.children}
          <button className="btn btn_tertiary btn_modalClose" onClick={() => this.props.handleClose()}>close</button>
        </section>
      </div>
    );
  }
}
