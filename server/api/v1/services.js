const { Router } = require("express");
const router = Router();
const axios = require("axios")

//get repo details if its public
router.get("/public_repo", async (req, res) => {
    try {
      const { data: repo } = await axios.get(
        `https://api.github.com/repos/${req.query.repo_name}`,
        {
          headers: { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` },
        }
      );
      if (!repo.private) {
        res.json(repo);
      } else {
        res.status(401).send("Repo is private");
      }
    } catch (error) {
      res.status(400).send("Repo does not exist");
    }
});


module.exports = router;

