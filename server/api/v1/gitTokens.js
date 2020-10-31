require('dotenv').config();
const { Router } = require('express');
const { GitToken } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allTokens = await GitToken.findAll({});
    const allTokensForResponse = allTokens.map(token => {
      if (token.dataValues.token === process.env.GITHUB_ACCESS_TOKEN) {
        token.dataValues.active = true
      } else {
        token.dataValues.active = false
      }
      return token
    })
    res.json([allTokensForResponse]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const destructuredToken = {
      token: req.body.token,
      gitAccount: req.body.gitAccount,
      actionsLimit: req.body.actionsLimit,
    };
    const newToken = await GitToken.create(destructuredToken);
    res.json(newToken);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

router.patch('/', async (req, res) => {
  try {
    const destructuredToken = {
      status: req.body.status,
      resetAt: new Date() + 356 * 24 * 60 * 60 * 1000,
    };
    const newToken = await GitToken.update(destructuredToken, {
      where: {
        token: req.body.token,
      },
    });
    res.json(newToken);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

router.delete('/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const removedToken = await GitToken.destroy({
      where: {
        token,
      },
    });
    res.json(removedToken);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = router;
