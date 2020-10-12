const express = require('express')

const app = express()
app.use(express.json( {limit: '50mb'}))

app.use('/api', require('./api')) // if auth works this can probably go

app.use('*', function(req,res){
    res.sendStatus(404)
})

module.exports = app;