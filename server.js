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
 * POST recipes to the backend and save them to a file.
 */
app.post('/post-recipe', (req, res) => {

  fs.readFile('data/recipes.json', 'utf8', function(error, data) {
    if (error) throw error;

    const fileData = JSON.parse(data);
    console.log("fileData",fileData);

    fileData.data.push(req.body);
  
    const preparedData = JSON.stringify(fileData);
  
    fs.writeFile('data/recipes.json', preparedData, function(error) {
      if (error) throw error;
      console.log('Saved data');
    });

    return true;
  });

  res.send({ data: 'Data has been saved.' });
});
