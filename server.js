const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const recipeService = require('./src/Recipe/RecipeService');
const githubAuthService = require('./src/Auth/GithubAuthService');
const authConfig = require('./AuthConfig');

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
app.use(express.static(`${__dirname}/./client/build`));

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
 * GET recipe by id.
 */
app.get('/recipes/get/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const content = recipeService.getRecipeById(recipeId);
  res.send({ data: content });
});

/**
 * POST recipes.
 */
app.post('/recipes/post', (req, res) => {
  const saved = recipeService.saveRecipe(req.body);
  res.send({ data: saved });
});

/**
 * PUT recipe.
 */
app.put('/recipes/update', (req, res) => {
  const saved = recipeService.updateRecipe(req.body);
  res.send({ data: saved });
});

/**
 * DELETE recipe by id.
 */
app.delete('/recipes/delete/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const deleted = recipeService.deleteRecipeById(recipeId);
  res.send({ data: deleted });
});

/**
 * Login with Github
 */
app.post('/auth/login/', async (req, res) => {
  if (!req.body.hasOwnProperty('code')) {
    res.send({ data: 'Code is needed to get acccess token.' });
  }

  console.log('Try to get access token');

  const accessToken = await githubAuthService.getAccessToken(req.body.code);
  res.send({ data: accessToken });
});

/**
 * GET client id.
 */
app.get('/auth/get/client_id', (req, res) => {
  res.send({ data: authConfig.client_id });
});

/**
 * Server App to client.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
