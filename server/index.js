require('dotenv').config()
const ngrok = require('ngrok');
const app = require('./app');
const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || 'development'
const exec = require('child_process').exec;
const DEFAULT_BRANCH = process.env.DEFAULT_BRANCH || 'master'; // the default fallback branch if current branch can't be recieved through command line

const getCurrentBranch = () => new Promise((resolve, reject) => {
    exec('git branch --show-current', function(err, stdout, stderr){
      if(err != null){
        console.error(`COULD NOT GET CURRENT BRANCH RESOLVING TO ${DEFAULT_BRANCH}`)
        resolve(DEFAULT_BRANCH)
        //reject(new Error(err))
      }else if(typeof(stderr) != "string"){
        console.error(`COULD NOT GET CURRENT BRANCH RESOLVING TO ${DEFAULT_BRANCH}`)
        resolve(DEFAULT_BRANCH)
        //reject(new Error(stderr))
      }else{
          resolve (stdout);
      }
    }); 
})

async function establishConnection(){
  process.env.MY_BRANCH = await getCurrentBranch();
  console.log('current branch' , process.env.MY_BRANCH);

  if(env === 'development'){
    const url = await ngrok.connect(port);
    process.env.MY_URL = url;
  }
  console.log('Client Ip Address', process.env.IP_ADDRESS);
}

establishConnection(); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


