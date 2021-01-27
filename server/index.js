require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 80;
const httpsPort = process.env.SECURE_PORT || 443;
const spliceIpAddress = process.env.IP_ADDRESS.lastIndexOf(':')
const ipAddress = process.env.IP_ADDRESS.substr(0, spliceIpAddress + 1)
const env = process.env.NODE_ENV || 'development';
const establishNgrokConnection = require('./helpers/ngrokConnection');

if (env === 'development') {
  establishNgrokConnection();
}

app.listen(port, () => {
  console.log(`ChallengeMe listening at ${ipAddress}${port}`);
});

app.listen(httpsPort, () => {
  console.log(`Secure ChallengeMe listening at ${ipAddress}${httpsPort}`);
});
