import React, { Component } from 'react';
import './Message.css';

/**
 * Handle messages set in the header.
 */
export default class Message extends Component {
  /**
   * Get the message properties from message utility.
   */
  get message() {
    if (this.props && this.props.messageUtility) {
      return this.props.messageUtility.getMessage();
    }
    
    return {};
  }

  /**
   * Get the container class based on the status.
   *
   * @param {string} status
   * @public
   */
  getContainerClass = status => {
    let containerClass = 'Message-container';

    switch (status) {
      case 'error':
        containerClass = containerClass.concat(' Message-error');
        break;
      case 'success':
        containerClass = containerClass.concat(' Message-success');
        break;
      case 'warning':
        containerClass = containerClass.concat(' Message-warning');
        break;
      default:
        return '';
    }
    return containerClass;
  };

  /**
   * Render Message.
   *
   * @public
   */
  render() {
    return (
      <div>
        {this.message && (
          <div className={this.getContainerClass(this.message.status)}>
            <p className="Message-body">{this.message.text}</p>
          </div>
        )}
      </div>
    );
  }
}
