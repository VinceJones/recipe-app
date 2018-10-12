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
    this.host = 'http://localhost:5000';
  }

  /**
   * Write the data to a storage.
   *
   * @public
   */
  writeData = data => {
    // const json = this.prepareData(data);
    const json = JSON.stringify(data);
    const endpoint = '/post-recipe';

    // const headers = new Headers();
    // headers.append('Content-type', 'application/json');

    // const options = {
    //   method: 'POST',
    //   headers,
    //   body: json
    // };

    // const request = new Request(this.host + endpoint, options);
    // console.log('request', request);
    // const response = this.makeRequest(request).then(response => {
    //   console.log('response', response.body);
    // });

    const response = fetch(this.host + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: json
    })
      .then(response => response.json())
      .then(
        result => {
          return result;
        },
        error => {
          console.log('error', error);
          return error;
        }
      );

    console.log('response.body', response.body);

    // localStorage.setItem(this.storageKey, json);
  };

  /**
   * Make a request.
   */
  makeRequest = request => {
    return fetch(request)
      .then(res => res.json())
      .then(
        result => {
          return result;
        },
        error => {
          return error;
        }
      );
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

  /**
   * Prepare data for storage.
   *
   * @param {data}
   * @public
   */
  prepareData = data => {
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
    return writeArray;
  };
}
