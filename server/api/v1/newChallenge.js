const { Challenge } = require('../../models');

const { Router } = require('express');
const axios = require('axios');
const fs = require('fs');

const router = Router();

//router Post
//+
//router Get - Validation
router.post(`/`,async(req,res) => {
    try{
        const newRepo = req.body.repositoryName;
        // try{
        //     await axios.get(`https://api.github.com/repos/${newRepo}`)
        // }catch(err){
        //      return res.status(400).send('Repo not found')
        // }
        const check = await Challenge.findOne({
            where:{
                repositoryName: newRepo
            }
        })
        if(check){
            return res.status(500).send('Repo is already in the system')
        }
        const newChallenge = await Challenge.create(req.body);
        res.status(200).send(newChallenge);
    }catch(err){
        res.send("Bad request.")
    }
})

//router Get - github/workflows
router.get('/type', async (req,res) => {
    const files = fs.readdirSync('../.github/workflows');
    const types = files.map(file =>
        file.slice(0,-4)
    )
    res.send(types)
})




module.exports = router;
