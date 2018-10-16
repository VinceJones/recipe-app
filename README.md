# Recipes

## Setup
* Clone this [repo](https://github.com/VinceJones/recipe-app)
* npm install at the root of the project to setup the server.
  * `recipes-app> npm install`
* Change directories into client/ and run npm install to install node modules for client application.
  * `recipes-app/client> npm install`
* In a terminal from root of project run 
  * `recipes-app> node server.js`
* In a terminal from the client folder run
  * `recipes-app/client> npm run start`

## Parts to build
* Create form to intake recipes
* Edit form to edit recipes
  * Edit any property of a recipe or delete a recipe, deleting a recipe should prompt the user to make sure they actually want to do this action.
* List page
  * Filters
    * Autocomplete text field
    * Ingredient names, recipe description, and ingredient descriptions will be appended to data attributes for search ability
  * List all recipes by name
  * 
* Save recipes
  * Write a JSON file with all the recipes for start, long term look into a different back end like Node or Python to save to a database.
* Objects
  * Recipe
    * Name
    * Description
    * Ingredients
      * A recipe can have unlimited number of ingredients
  * Ingredient
    * Name
    * Description (Use this as a tool tip to provide additional information)
    * Amount
    * Measurement Type
      * US
        * tsp
        * tbsp
        * cp
        * quart
        * gallon
        * oz
        * lbs
      * Metric
        * liter
        * grams
        * kilo