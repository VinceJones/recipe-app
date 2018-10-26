import Recipe from '../models/Recipe';

/**
 * Handle storage of data.
 */
export default class StorageHandler {
  /**
   * StorageHandler constructor.
   *
   * @public
   */
  constructor() {
    this.endpoints = {
      host: 'https://vincentjonesmuth.com:5000',
      postRecipes: '/recipes/post',
      updateRecipe: '/recipes/update',
      deleteRecipe: '/recipes/delete',
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

    console.log('postRecipe', this);

    return await this.makeRequest(this.endpoints.postRecipes, options).then(
      responseJson => {
        return responseJson;
      }
    );
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

    return await this.makeRequest(this.endpoints.updateRecipe, options).then(
      responseJson => {
        return responseJson;
      }
    );
  };

  /**
   * Get the recipes from storage.
   *
   * @public
   */
  getRecipes = async () => {
    return this.makeRequest(this.endpoints.getRecipes).then(responseJson => {
      const responseData = JSON.parse(responseJson.data);
      const recipes = [];

      responseData.data.forEach(recipeData => {
        recipes.push(new Recipe(recipeData));
      });

      return recipes;
    });
  };

  /**
   * Get recipe by ID.
   *
   * @param {number} id
   * @public
   */
  getRecipeById = async id => {
    const endpoint = this.endpoints.getRecipes + '/' + id;

    return await this.makeRequest(endpoint).then(responseJson => {
      if (this.isEmpty(responseJson.data)) {
        return undefined;
      }
      const parsedData = JSON.parse(responseJson.data);

      if (parsedData !== undefined) {
        return new Recipe(parsedData);
      }

      return undefined;
    });
  };

  /**
   * Check if an object is empty.
   * 
   * @param {Object} obj
   * @public
   */
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  /**
   * Delete recipe by ID.
   *
   * @param {number} id
   * @public
   */
  deleteRecipeById = async id => {
    const endpoint = this.endpoints.deleteRecipe + '/' + id;

    const options = {
      method: 'DELETE'
    };

    return await this.makeRequest(endpoint, options).then(responseJson => {
      const responseData = JSON.parse(responseJson.data);
      return responseData;
    });
  };

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
