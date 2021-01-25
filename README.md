# Recipes

[![Build Status](https://travis-ci.com/VinceJones/recipe-app.svg?branch=master)](https://travis-ci.com/VinceJones/recipe-app)

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
* Log in with Github to authenticate for Add/Edit/Delete functionality.

## Roadmap
* Add cucumber-js.
* Add drag and drop functionality to recipe add/edit page to reorder ingredients.
* Automatic deploys on master merge?