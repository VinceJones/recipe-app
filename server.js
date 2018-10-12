const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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

    res.send({ data: 'Data was saved' });
})