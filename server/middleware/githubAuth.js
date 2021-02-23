require('dotenv').config();
const axios = require('axios');

module.exports = async function githubAuth(req, res, next) {
  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.body.code,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(data).length,
  };

  axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token',
    data,
    headers,
  })
    .then((results) => {
      const accessToken = results.data.split('&')[0].split('=')[1];
      headers.authorization = `Bearer ${accessToken}`;
      axios({
        method: 'get',
        url: 'https://api.github.com/user',
        data: {},
        headers,
      }).then((results2) => {
        req.gitUser = results2.data;
        next();
      }).catch((error) => {
        console.table({ message: 'Github Authentication failed', error: `${error.message} - ${error.response.data.message}` });
        return res.status(400).json({ message: 'Github Authentication failed' });
      });
    }).catch((error) => {
      console.error('Github Authentication failed, Invalid Temp Code', error.message);
      return res.status(400).json({ message: 'Github Authentication failed, Invalid Temp Code' });
    });
};
