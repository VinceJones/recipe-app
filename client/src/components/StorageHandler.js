/**
 * Handle storage of data.
 */
export default class StorageHandler {
  /**
   * StorageHandler constructor.
   *
   * @param {*} storageKey
   * @public
   */
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  /**
   * Write the data to a storage.
   * 
   * @public
   */
  writeData = data => {
    let writeArray = [];
    let currentData = this.getData();

    // Prepare current data into write Array. 
    // If we only have one object in the current data 
    // then we need to stick it inside an array.
    if (Object.prototype.toString.call(currentData) !== '[object Array]') {
      if (currentData !== null) {
        writeArray = writeArray.concat([currentData]);
      }
    } else {
      writeArray = writeArray.concat(currentData);
    }

    // Add the new data to the existing data, again we 
    // need to stick it in an array so that we can merge 
    // it properly.
    writeArray = writeArray.concat([data]);

    // Prepare the array for storage.
    const json = JSON.stringify(writeArray);

    localStorage.setItem(this.storageKey, json);
  };

  /**
   * Get the data from storage.
   * 
   * @public
   */
  getData = () => {
    const data = JSON.parse(localStorage.getItem(this.storageKey));
    return data;
  };
}
