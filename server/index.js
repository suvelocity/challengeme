require('dotenv').config()
const ngrok = require('ngrok');
const app = require('./app');
const checkActions = require('./lib/check-actions');
const port = process.env.PORT || 8080

async function establishConnection(){
  const url = await ngrok.connect(port);
  //const apiUrl = ngrok.getUrl();
  process.env.MY_URL = url;  
}
establishConnection(); //if(process.env.NODE_ENV === 'development') // node env development

setInterval(checkActions, 10000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


