const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const recipeService = require('./src/Recipe/RecipeService');


var whitelist = ['http://localhost:3000', 'http://localhost:5000'];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * console.log that your server is up and running
 */
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * GET recipes.
 */
app.get('/recipes/get', (req, res) => {
  const content = recipeService.getRecipes();
  res.send({ data: content });
});

/**
 * POST recipes.
 */
app.post('/recipes/post', (req, res) => {
  const saved = recipeService.saveRecipe(req.body);
  res.send({ data: saved });
});