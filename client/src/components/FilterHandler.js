/**
 * FilterHandler
 *
 * Handle live filtering.
 */
export default class FilterHandler {
  /**
   * Filter a array of objects by filter value.
   *
   * @param {Object[]} items
   * @param {string}} filterValue
   */
  filterItems(items, filterValue) {
    console.log('base items', items);
    items = items.filter(recipe => {
      const matches = [];
      Object.entries(recipe).forEach(([key, value]) => {
        let match = false;

        // Check if a value is an array and loop to check the
        // name property if it exists to see if it matches.
        if (value instanceof Array) {
          match = this.checkArrayMatch(value, filterValue);
        }

        // Check if the value is a string and see if it matches.
        if (typeof value === 'string') {
          match = this.checkStringMatch(value, filterValue);
        }

        matches.push(match);
      });

      return matches.indexOf(true) > -1;
    });

    return items;
  }

  /**
   * Recursively check if array of objects matches the filter value.
   *
   * @param {Array} array
   * @param {string} filterValue
   * @private
   */
  checkArrayMatch(array, filterValue) {
    let match = false;

    const matches = [];
    array.forEach(item => {
      if (typeof item === 'object' && typeof item !== 'function') {
        console.log('obj');

        const arrayMatches = [];
        Object.entries(item).forEach(([key, value]) => {
          // Check if a value is an array and loop to check the
          // name property if it exists to see if it matches.
          if (value instanceof Array) {
            match = this.checkArrayMatch(value, filterValue);
          }

          // Check if the value is a string and see if it matches.
          if (typeof value === 'string') {
            match = this.checkStringMatch(value, filterValue);
          }

          arrayMatches.push(match);
        });

        match = arrayMatches.indexOf(true) > -1
      }

      // Check if item is an array.
      if (item instanceof Array) {
        match = this.checkArrayMatch(item, filterValue);
      }

      // Check if item is a string.
      if (typeof value === 'string') {
        match = this.checkStringMatch(item, filterValue);
      }

      matches.push(match);
    });

    return matches.indexOf(true) > -1
  }

  /**
   * Check if a string matches the filter value.
   *
   * @param {string} value
   * @param {*} filterValue
   * @private
   */
  checkStringMatch(value, filterValue) {
    let match = false;
    let stringMatch =
      value.toLowerCase().search(filterValue.toLowerCase()) !== -1;
    match = stringMatch ? stringMatch : match;
    return match;
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
