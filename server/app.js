const path = require("path");
const express = require('express')
const fs = require('fs');
const checkToken = require('./middleware/checkToken')


const app = express()
app.use(express.json( {limit: '50mb'}))


app.use('/api/v1/',checkToken ,require('./api/v1'))


app.use('/api', require('./api')) // if auth works this can probably go

app.use('*', function(req,res){
    res.sendStatus(404)
})

// app.use(express.static(path.join(__dirname, "..", "client", 'build')))
// app.use('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
// });

module.exports = app;
