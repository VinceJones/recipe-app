import React, { Component } from 'react';
import messageServiceSingleton from '../MessageService';
import './Message.css';

/**
 * Handle messages set in the header.
 */
export default class Message extends Component {
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
        {messageServiceSingleton.message && (
          <div
            className={this.getContainerClass(
              messageServiceSingleton.message.status
            )}
          >
            <p className="Message-body">
              {messageServiceSingleton.message.text}
            </p>
          </div>
        )}
      </div>
    );
  }
}
