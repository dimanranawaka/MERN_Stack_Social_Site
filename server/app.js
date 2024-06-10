const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

const { MONGOURI } = require('./keys');

// register the routes
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err);
});

// 2htWQn73owpz7YOx

// register the model
require('./models/user');
// register the model
require('./models/post');

// pass the incoming request to json
app.use(express.json());

// register the routes
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(port, () => {
    console.log("Server is running on port ", port);
});

