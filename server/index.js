require('dotenv').config()
const ngrok = require('ngrok');
const app = require('./app');
const fs = require('fs');
const filePath = 'urlForTest.json';
const checkActions = require('./lib/check-actions');
const port = process.env.PORT || 8080

async function establishConnection(){
  //const apiUrl = ngrok.getUrl();
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    const url = await ngrok.connect(port);
    process.env.MY_URL = url;
    const urlObject ={"url" : url};
    fs.writeFileSync(filePath,JSON.stringify(urlObject));
    
     
  }
  console.log(process.env.MY_URL);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
 // setInterval(checkActions, 10000) // todo: Make Submissions Update without Me
}
establishConnection();  // node env development




