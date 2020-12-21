require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { WebhookAccessKey } = require('../models');

module.exports = async function checkWebhook(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: 'Access Token Required' });
  token = token.split(' ')[1];
  jwt.verify(token, process.env.WEBHOOK_SECRET, async (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Invalid Access Token' });
    const accessKey = await WebhookAccessKey.findOne({
      where: { id: decoded.id },
    });
    if (accessKey) {
      const validPass = await bcrypt.compareSync(
        accessKey.key,
        decoded.token,
      );
      if (validPass) {
        req.entity = decoded;
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
