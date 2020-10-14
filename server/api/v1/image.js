const { Router } = require('express');
const { Image } = require('../../models');
const router = Router();

router.get('/', async (req, res) => { 
    let challengeId = req.query.id ;
    try{
        const image = await Image.findOne({
            where: {challengeId}
        });
        res.json(image)
    }
    catch(e){res.send("Something went wrong")}
});


router.post('/', async (req, res) => { 
    let image = req.body ;
    try {
        const checkIfExists = await Image.findOne({
            where: {challengeId: image.challengeId}
        });
    
        if(!checkIfExists) {
            const newImage = await Image.create(image);
            res.status(200).send('Success');
        } else {
            res.status(400).send('This challenge already own an image');
        }
    } catch(e) { 
        res.status(400).send('Something went wrong');
    }
});

module.exports = router;
