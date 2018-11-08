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

## Functionality
* Add a recipe
  * Recipes are saved to a JSON file, long term look into saving to DB.
* List recipes
* Edit a recipe
* Delete a recipe

## Parts to build
* Recipe form ingredient ordering.

## Schema
  * Recipe
    * Name
    * Description
    * Ingredients
      * A recipe can have unlimited number of ingredients
  * Ingredient
    * Name
    * Amount
    * Measurement Type
      * US
        * each
        * pinch
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