const express = require('express');
const app = express();

const port = 5000;

const customMiddleware = (req, res, next) => {
  console.log("Middleware Executed");
}

app.use(customMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log("Server is running on port ",port);
});