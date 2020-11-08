const { Router } = require('express');

const router = Router();
const axios = require('axios');
const handleGithubTokens = require('../../helpers/handleGithubTokens');

// get repo details if its public
router.get('/public_repo', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${req.query.repo_name}`,
      {
        headers: { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` },
      },
    );
    handleGithubTokens(response.headers);
    if (!response.data.private) {
      res.json(response.data.repo);
    } else {
      res.status(401).send('Repo is private');
    }
  } catch (error) {
    handleGithubTokens(error.response.headers);
    res.status(400).send('Repo does not exist');
  }
});

module.exports = router;
