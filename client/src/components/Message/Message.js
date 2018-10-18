import React, { Component } from 'react';
import { MessageContext } from './messages-context';

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
  getContainerClass = (status) => {
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
  render() {
    const {
      props: { message }
    } = this;

    return (
      <div>
        {message !== '' && (
          <MessageContext.Consumer>
            {message => (
              <div className={this.getContainerClass(message.status)}>
                <p className="Message-body">{message.text}</p>
              </div>
            )}
          </MessageContext.Consumer>
        )}
      </div>
    );
  }
}
