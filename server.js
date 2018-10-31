const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const recipeService = require('./src/Recipe/RecipeService');
const githubAuthService = require('./src/Auth/GithubAuthService');
const config = require('./Config');

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
app.get('/auth/login/:code', async (req, res) => {
  const code = req.params.code;
  if (!code) {
    res.send({ data: 'Code is needed to get acccess token.' });
  }

  console.log('Try to get access token with code: \n', code);

  const accessToken = await githubAuthService.getAccessToken(code);
  res.send({ data: accessToken });
});

/**
 * GET client id.
 */
app.get('/auth/get/client_id', (req, res) => {
  console.log('GET client_id:\n', config.client_id);
  res.send({ data: config.client_id });
});

/**
 * Is user admin?.
 */
app.get('/auth/get/isUserAdmin/:accessToken', async (req, res) => {
  const accessToken = req.params.accessToken;
  const data = {
    user: false,
  }

  if (!accessToken) { 
    data.error = 'Access token is needed to get user.',
    res.send(data);
  }
  console.log('GET access token:\n', accessToken);

  data.user = await githubAuthService.isUserAdmin(accessToken);
  res.send(data);
})

/**
 * Server App to client.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
