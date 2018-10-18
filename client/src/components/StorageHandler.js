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
    this.endpoints = {
      host: 'http://localhost:5000',
      postRecipes: '/recipes/post',
      updateRecipes: '/recipes/update',
      getRecipes: '/recipes/get'
    };
  }

  /**
   * Get headers to send a POST request.
   *
   * @public
   */
  get postHeaders() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  /**
   * Write the data to a storage.
   *
   * @param {data}
   * @public
   */
  postRecipe = async data => {
    const json = JSON.stringify(data);
    const headers = this.postHeaders;

    const options = {
      method: 'POST',
      headers,
      body: json
    };

    return await this.makeRequest(this.endpoints.postRecipes, options);
  };

  /**
   * Write the data to a storage.
   *
   * @param {data}
   * @public
   */
  putRecipe = async data => {
    const json = JSON.stringify(data);
    const headers = this.postHeaders;

    const options = {
      method: 'PUT',
      headers,
      body: json
    };

    return await this.makeRequest(this.endpoints.updateRecipes, options);
  };

  /**
   * Get the data from storage.
   *
   * @public
   */
  getRecipes = async () => {
    return this.makeRequest(this.endpoints.getRecipes).then(responseJson => {
      const responseData = JSON.parse(responseJson.data);
      return responseData.data;
    });
  };

  /**
   * Get recipe by ID.
   * 
   * @param {number} id
   * @public
   */
  getRecipeById = async (id) => {
    return await this.makeRequest(this.endpoints.getRecipes + '/' + id).then(responseJson => {
      const responseData = JSON.parse(responseJson.data);
      const recipe = responseData.shift()
      return recipe;
    });
  }

  /**
   * Make a request.
   *
   * @param {endpoint}
   * @param {options}
   * @public
   */
  makeRequest = async (endpoint, options = {}) => {
    return fetch(this.endpoints.host + endpoint, options)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error', error);
        return error;
      });
  };
}
