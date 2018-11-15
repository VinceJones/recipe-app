import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tag from '../../models/Tag';
import Button from '../Button/Button';

/**
 * TagForm component.
 *
 * @public
 */
export default class TagForm extends Component {
  static propTypes = {
    tag: PropTypes.instanceOf(Tag),
    onChange: PropTypes.func.isRequired
  };

  /**
   * Get the tag.
   *
   * @public
   */
  get tag() {
    return this.props.tag;
  }

  /**
   * Handle tag change events.
   *
   * @param {Object} event
   * @public
   */
  handleFieldChange = () => event => {
    const inputElement = event.target;
    let tag = { ...this.props.tag };
    tag[inputElement.name] = inputElement.value;
    this.props.onChange(tag);
  };

  /**
   * Render TagForm.
   *
   * @public
   */
  render() {
    return (
      <div className="input__tag">
        <div>
          <label className="isHidden">Tag</label>
          <input
            className="TagForm-input"
            type="text"
            name="name"
            value={this.props.tag.name}
            onChange={this.handleFieldChange()}
          />
          <Button
            text="&times;"
            link="#"
            isBtn={false}
            className="icon icon--remove"
            onClick={() => this.props.requestDeleteTag()}
          />
        </div>
      </div>
    );
  }
}
