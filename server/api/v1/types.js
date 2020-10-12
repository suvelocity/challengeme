const { Router } = require('express');
const router = Router();
const fs = require("fs")

// router Get - github/workflows
router.get('/', async (req,res) => {
    try{
      const files = fs.readdirSync('../.github/workflows');
      let types = files.map(file =>
        !file.includes("deploy")?
        file.slice(0,-4)
        :
        null
      )
      types = types.filter(type => type!==null)
      res.send(types)
    }catch(e){res.send(e.message)}
})

module.exports = router;
