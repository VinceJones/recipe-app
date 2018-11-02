/**
 * RecipeConfig.
 *
 * @public
 */
export default class RecipeConfig {
  /**
   * Get the ingredient measurement types.
   *
   * @public
   */
  get measurementTypes() {
    return [
      {
        name: 'Each',
        value: 'ea'
      },
      {
        name: 'Pinch',
        value: 'pinch'
      },
      {
        name: 'Teaspoon(s)',
        value: 'tsp'
      },
      {
        name: 'Tablespoon(s)',
        value: 'tbsp'
      },
      {
        name: 'Cup(s)',
        value: 'cp'
      },
      {
        name: 'Quart(s)',
        value: 'qt'
      },
      {
        name: 'Gallon(s)',
        value: 'gl'
      },
      {
        name: 'Ounce(s)',
        value: 'oz'
      },
      {
        name: 'Pound(s)',
        value: 'lbs'
      },
      {
        name: 'Liter(s)',
        value: 'lt'
      },
      {
        name: 'Milliliter(s)',
        value: 'ml'
      },
      {
        name: 'Gram(s)',
        value: 'gr'
      },
      {
        name: 'Kilogram(s)',
        value: 'kilo'
      }
    ];
  }

  /**
   * Get textarea configuration.
   *
   * @public
   */
  get textAreaConfig() {
    return {
      rows: '10',
      columns: '30'
    };
  }

  /**
   * Get the scaling types.
   *
   * @public
   */
  get scalingTypes() {
    return [
      {
        name: 'Multiply',
        value: '*'
      },
      {
        name: 'Divide',
        value: '/'
      }
    ];
  }

  /**
   * Get the scaling amounts.
   * 
   * @public
   */
  get scalingAmount() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
}
