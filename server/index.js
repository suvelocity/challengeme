require('dotenv').config()
const app = require('./app');
const checkActions = require('./lib/check-actions');
const port = process.env.PORT || 8080

setInterval(checkActions, 10000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


