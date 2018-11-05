import React from 'react';

export default class ListIngredient extends React.Component {
  render() {
    return (
      <li>
        <div className="ListIngredient-container">
          <span className="ListIngredient-amount">{this.props.ingredient.amount} {this.props.ingredient.measurementType}</span>
          <span className="ListIngredient-label">{this.props.ingredient.name}</span>
        </div>
      </li>
    );
  }
}
