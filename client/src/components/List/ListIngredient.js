import React from 'react';

export default class ListIngredient extends React.Component {
  render() {
    return (
      <li>
        <h3>
          {this.props.ingredient.amount} {this.props.ingredient.measurementType} - {this.props.ingredient.name}
        </h3>
        <div />
      </li>
    );
  }
}
