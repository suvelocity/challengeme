const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express()
app.use(express.json( {limit: '50mb'}))

app.use('/api', require('./api')) // if auth works this can probably go

app.use(express.static(path.join(__dirname, "..", "client", 'build')))
app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use('*', function(req,res){
    res.sendStatus(404)
})


module.exports = app;
