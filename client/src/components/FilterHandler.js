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
    items = items.filter(item => {
      // return this.getMatchByType(item);
      return this.search(item, filterValue);
    });

    return items;
  }

  /**
   * Search for a match recursively.
   *
   * @param {*} haystack
   * @param {string} string
   * @public
   */
  search(haystack, needle) {
    if (haystack instanceof Array) {
      for (let i = 0; i < haystack.length; i++) {
        if (this.search(haystack[i], needle)) {
          return true;
        }
      }
    } else if (typeof haystack === 'object') {
      for (const key in haystack) {
        if (this.search(haystack[key], needle)) {
          return true;
        }
      }
    } else {
      return (
        String(haystack)
          .toLowerCase()
          .search(needle.toLowerCase()) !== -1
      );
    }

    return false;
  }
}
