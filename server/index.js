require('dotenv').config()
const ngrok = require('ngrok');
const app = require('./app');
const checkActions = require('./lib/check-actions');
const port = process.env.PORT || 8080

async function establishConnection(){
  const url = await ngrok.connect(port);
  //const apiUrl = ngrok.getUrl();
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV == 'development'){
    process.env.MY_URL = url; 
  }
  console.log(process.env.MY_URL);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
establishConnection();  // node env development
setInterval(checkActions, 10000)



