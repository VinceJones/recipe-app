import React, { Component } from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import { MessageContext, messagesContext } from '../Message/messages-context';

import './Page.css';

/**
 * Page component.
 * 
 * @public
 */
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    pageTitle: PropTypes.string.isRequired
  };

  /**
   * Page constructor.
   *
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      message: {
        status: '',
        text: '',
        shown: false
      }
    };
  }

  /**
   * Set message state.
   *
   * @public
   */
  componentDidMount = () => {
    if (!messagesContext.message.show) {
      this.setState({ message: messagesContext.message });
      messagesContext.toggleShown();
    }
  };

  /**
   * Clear messages if they have been shown.
   *
   * @public
   */
  componentWillUnmount = async () => {
    if (messagesContext.message.shown) {
      await messagesContext.clearMessages();
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
          <MessageContext.Provider value={this.state.message}>
            <Message message={this.state.message} />
          </MessageContext.Provider>
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
