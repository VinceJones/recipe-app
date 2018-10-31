import React, { Component } from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';

import './Page.css';

/**
 * Page component.
 *
 * @public
 */
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    pageTitle: PropTypes.string.isRequired,
    messageUtility: PropTypes.object.isRequired,
    userUtility: PropTypes.object.isRequired
  };

  /**
   * Set message state.
   *
   * @public
   */
  componentDidMount = async () => {
    if (this.props.userUtility.user.clientId === '') {
      await this.props.userUtility.setClientId();
      await this.props.userUtility.getIsUserAdmin();
    }

    if (
      this.props.messageUtility &&
      this.props.messageUtility.message.shown === false
    ) {
      this.props.messageUtility.toggleMessageShown();
    }
  };

  /**
   * Clear messages if they have been shown.
   *
   * @public
   */
  componentWillUnmount = async () => {
    if (this.props.messageUtility.message.shown) {
      await this.props.messageUtility.clearMessages();
    }
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <div>
        <div>
          <Message messageUtility={this.props.messageUtility} />
        </div>
        <div className="page container">
          <div>
            <h1 className="Page-title">{this.props.pageTitle}</h1>
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
