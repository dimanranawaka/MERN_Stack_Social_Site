const express = require('express');
const app = express();

const port = 5000;

const customMiddleware = (req, res, next) => {
  console.log("Middleware Executed");
  next();
}

// Passing the middleware to the app
app.use(customMiddleware);

app.get('/', (req, res) => {
  console.log("Home");
  res.send('Hello World');
});

app.listen(port, () => {
  console.log("Server is running on port ",port);
});

app.get('/about', (req, res) => {
  console.log("About");
  res.send('About Page');
});