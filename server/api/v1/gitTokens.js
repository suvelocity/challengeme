require('dotenv').config();
const { Router } = require('express');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { GitToken, Submission } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allTokens = await GitToken.findAll({});
    const month = 31 * 24 * 60 * 60 * 1000;
    const submissionCount = await Submission.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'countSubmission']],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - month),
        },
      },
    });
    const tokensArray = allTokens.map((token) => token.dataValues.token);
    let location = tokensArray.indexOf(process.env.GITHUB_ACCESS_TOKEN);
    if (tokensArray.length === location + 1) {
      location = -1;
    }
    if (submissionCount[0].dataValues.countSubmission > 1000 * (location + 1)) {
      process.env.GITHUB_ACCESS_TOKEN = tokensArray[location + 1];
    }
    res.json([allTokens, submissionCount]);
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
