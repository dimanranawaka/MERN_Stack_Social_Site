const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

const {MONGOURI} = require('./keys');

mongoose.connect(MONGOURI);
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo");
});

mongoose.connection.on('error',(err)=>{
    console.log("Error connecting",err);
});

// 2htWQn73owpz7YOx

app.listen(port, () => {
  console.log("Server is running on port ",port);
});

