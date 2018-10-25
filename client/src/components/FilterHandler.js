/**
 * FilterHandler
 *
 * Handle live filtering.
 */
export default class FilterHandler {
  /**
   * Filter a array by filter value.
   *
   * @param {Object[]} items
   * @param {string}} filterValue
   */
  filterItems(items, filterValue) {
    this.setFilterValue(filterValue);
    items = items.filter(item => {
      return this.getMatchByType(item);
    });

    return items;
  }

  /**
   * Set the value to filter by
   *
   * @private
   */
  setFilterValue = filterValue => {
    this.filterValue = filterValue;
  };

  /**
   * Get a match value based on type of item.
   *
   * @param {*} item
   */
  getMatchByType(item) {
    let match = false;

    // Check if value is a object and not a function.
    if (typeof item === 'object' && typeof item !== 'function') {
      match = this.checkObjectMatch(item);
    }

    // Check if a value is an array and loop to check the
    // name property if it exists to see if it matches.
    if (item instanceof Array) {
      match = this.checkArrayMatch(item);
    }

    // Check if the value is a string and see if it matches.
    if (typeof item === 'string') {
      match = this.checkStringMatch(item);
    }

    return match;
  }

  /**
   * Recursively check if object values match the filter value.
   *
   * @param {Object} obj
   */
  checkObjectMatch(obj) {
    const matches = [];
    Object.entries(obj).forEach(([key, value]) => {
      matches.push(this.getMatchByType(value));
    });

    return matches.indexOf(true) > -1;
  }

  /**
   * Recursively check if array values match the filter value.
   *
   * @param {Array} array
   * @private
   */
  checkArrayMatch(array) {
    const matches = [];
    array.forEach(item => {
      matches.push(this.getMatchByType(item));
    });

    return matches.indexOf(true) > -1;
  }

  /**
   * Check if a string matches the filter value.
   *
   * @param {string} value
   * @private
   */
  checkStringMatch(value) {
    const match = false;
    const stringMatch =
      value.toLowerCase().search(this.filterValue.toLowerCase()) !== -1;
    return stringMatch ? stringMatch : match;
  }

  /**
   * Check if a array of objects matches the filter value.
   *
   * @param {*} updatedList
   * @param {*} event
   *
   * @deprecated
   *   This function assumes an array is a array of ojects and
   *   those objects have a name property. We want to recursively
   *   loop through an array until a string is found and then return
   *   the comparison against that string. checkArrayMatch() accomplishes
   *   this.
   *
   * @private
   */
  _filterItems_BAK(updatedList, event) {
    const filterValue = event.target.value;
    updatedList = updatedList.filter(recipe => {
      const matches = [];
      Object.entries(recipe).forEach(([key, value]) => {
        let match = false;

        // Check if a value is an array and loop to check the
        // name property if it exists to see if it matches.
        if (value instanceof Array) {
          let arrayMatch = recipe[key].filter(item => {
            if (item.hasOwnProperty('name')) {
              return (
                item.name.toLowerCase().search(filterValue.toLowerCase()) !== -1
              );
            } else {
              return false;
            }
          });
          arrayMatch = arrayMatch !== undefined && arrayMatch.length > 0;
          match = arrayMatch ? arrayMatch : match;
        }

        // Check if the value is a string and see if it matches.
        if (typeof value === 'string' || value instanceof String) {
          let stringMatch =
            recipe[key].toLowerCase().search(filterValue.toLowerCase()) !== -1;
          match = stringMatch ? stringMatch : match;
        }

        matches.push(match);
      });

      return matches.indexOf(true) > -1;
    });
  }
}
