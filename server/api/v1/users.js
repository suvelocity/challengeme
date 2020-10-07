const { Router } = require('express');
const usersRouter = Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt')

usersRouter.post('/register', async (req, res) => {
     const checkUser = await User.findOne({
            where: {
                userName: req.body.userName
            }
        })
    if (checkUser) {
        res.status(409).send("user name already exists")
    }
    else {
       const hashPassword = await bcrypt.hash(req.body.password, 10);
       
       req.body.password = hashPassword;      
       
       await User.create(req.body);
       res.status(201).json({message: "Register Success"}); 
    }
})
module.exports = usersRouter
