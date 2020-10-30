const express = require('express');
const path = require('path');
const helmet = require("helmet");
app.use(helmet({ hsts: false, contentSecurityPolicy: false, referrerPolicy: false }));

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(require("./middleware/morgan"));

// app.get("/", (req, res) => {
//   res.json({ name: 'Jane' })
// })

app.use('/api', require('./api')); // if auth works this can probably go

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = app;
