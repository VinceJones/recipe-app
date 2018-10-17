const fs = require('fs');

/**
 * RecipeFileStorageService.
 *
 * Service to help with file storage.
 *
 * @public
 */
class RecipeFileStorageService {
  /**
   * Constructor for RecipeFileStorageService.
   *
   * @public
   */
  constructor() {
    this.fileOptions = {
      path: 'data/recipes.json'
    };
  }

  /**
   * Get the file contents.
   */
  getFileContents() {
    const content = fs.readFileSync(this.fileOptions.path, 'utf8', function(
      error,
      fileData
    ) {
      // TODO: Add error handling.
      if (error) throw error;

      return fileData;
    });
    return content;
  };

  /**
   * Save data to a file.
   *
   * @param {Object} data
   * @public
   */
  saveDatatoFile(data) {
    fs.writeFile(this.fileOptions.path, JSON.stringify(data), function(error) {
      if (error) throw error;
      console.log('Saved content.');
    });

    return true;
  };
}

module.exports = new RecipeFileStorageService();