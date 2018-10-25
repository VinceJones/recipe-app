import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tag from '../../models/Tag';
import TagForm from './TagForm';
import Button from '../Button/Button';

/**
 * TagFormContainer component.
 *
 * @public
 */
export default class TagFormContainer extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    requestDeleteTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.instanceOf(Tag)),
  };

  /**
   * Handle tag change events.
   *
   * @param {number} index
   * @param {Object} newTagValues
   * @public
   */
  handleFieldChange = index => newTagValues => {
    const tags = [...this.props.tags];
    tags[index] = new Tag(newTagValues);
    this.props.onChange(tags);
  };

  /**
   * Render TagFormContainer.
   *
   * @public
   */
  render() {
    return (
      <div>
        <h4>Tags</h4>
        {this.props.tags.map((tag, index) => (
          <TagForm
            key={index}
            tag={tag}
            index={index}
            onChange={this.handleFieldChange(index)}
            requestDeleteTag={() => this.props.requestDeleteTag(index)}
          />
        ))}
        <div className="Tag-addBtn">
          <Button
            text="Add Tag"
            link="#"
            className="btn btn_tertiary"
            isBtn={true}
            onClick={this.props.requestAddTag}
          />
        </div>
      </div>
    );
  }
}
