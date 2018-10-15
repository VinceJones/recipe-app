const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

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
 * Default GET endpoint to test server.
 */
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/**
 * GET recipes.
 */
app.get('/recipes/get', (req, res) => {
  const content = fs.readFileSync('data/recipes.json', 'utf8', function(error, fileData) {
    if (error) throw error;

    console.log("Get the recipes");
  });

  console.log("content", content);

  res.send({ data: content });
});

/**
 * POST recipes.
 */
app.post('/recipes/post', (req, res) => {
  fs.readFile('data/recipes.json', 'utf8', function(error, fileData) {
    if (error) throw error;

    // Parse the current data so that we can add to it.
    let currentData = JSON.parse(fileData);

    // TODO: Validate the data:
    //   - Check the schema.
    //   - Filter the values.
    const newData = req.body;

    // Add the new data to the old data.
    currentData.data.push(newData);

    fs.writeFile('data/recipes.json', JSON.stringify(currentData), function(
      error
    ) {
      if (error) throw error;
      console.log('Saved recipe');
    });

    return true;
  });

  res.send({ data: 'Recipe has been saved.' });
});
