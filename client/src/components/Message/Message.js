import React, { Component } from 'react';

import './Message.css';

/**
 * Handle messages set in the header.
 */
export default class Message extends Component {
  /**
   * Get the container class based on the status.
   *
   * @public
   */
  getContainerClass = () => {
    console.log(this.props.status);
    let containerClass = 'Message-container';

    // if (this.props.status === 'error') {
    //     containerClass = containerClass.concat('Message-error');
    //   console.log('error hit', containerClass);
    // }

    switch (this.props.status) {
      case 'error':
        containerClass = containerClass.concat(' Message-error');
        console.log('error hit', containerClass);
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
          <div className={this.getContainerClass()}>
            <p className="Message-body">{this.props.message}</p>
          </div>
        )}
      </div>
    );
  }
}
