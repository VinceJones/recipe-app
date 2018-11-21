import React, { Component } from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import messageServiceSingleton from '../MessageService';

import './page.css';

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
   * Set message state.
   *
   * @public
   */
  componentDidMount = async () => {
    messageServiceSingleton.toggleMessageShown();
  };

  /**
   * Clear messages if they have been shown.
   *
   * @public
   */
  componentWillUnmount = async () => {
    messageServiceSingleton.clearMessages();
  };

  /**
   * Render the form.
   *
   * @public
   */
  render() {
    return (
      <section className="body">
        <Message />
        <div className="page">
          <h1 className="page__title">{this.props.pageTitle}</h1>
          <div className="page__content">{this.props.children}</div>
        </div>
      </section>
    );
  }
}
