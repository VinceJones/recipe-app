import React from 'react';

export default class ListIngredient extends React.Component {
  render() {
    return (
      <li>
        <div className="container--flex-row">
          <span className="ingredient__amount">{this.props.ingredient.amount} {this.props.ingredient.measurementType}</span>
          <span className="ingredient__label">{this.props.ingredient.name}</span>
        </div>
      </li>
    );
  }
}
