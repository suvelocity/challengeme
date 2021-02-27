require('dotenv').config();
const axios = require('axios');

module.exports = async function googleAuth(req, res, next) {
  const headers = { Authorization: `Bearer ${req.body.code}` };

  axios({
    method: 'get',
    url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    headers,
  })
    .then((results) => {
      const userInfo = results.data;
      req.googleUser = userInfo;
      next();
    }).catch((error) => {
      console.error('Google Authentication failed, Invalid Temp Code', error.message);
      return res.status(400).json({ message: 'Google Authentication failed, Invalid Temp Code' });
    });
};
