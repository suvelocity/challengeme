const { Router } = require('express');
const usersRouter = Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

ACCESS_TOKEN_SECRET='MATAN';
REFRESH_TOKEN_SECRET='ITAY';

usersRouter.post('/register', async (req, res) => {
     const checkUser = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });
    if (checkUser) {
        res.status(409).send("user name already exists");
    }
    else {
       const hashPassword = await bcrypt.hash(req.body.password, 10);
       
       req.body.password = hashPassword;      
       
       await User.create(req.body);
       res.status(201).json({message: "Register Success"}); 
    };
});

usersRouter.post('/login', async (req, res) => {
    const currentUser = await User.findOne({
        where: {
            userName: req.body.userName
        }
    });
    if (!currentUser) return res.status(404).json({message: "Cannot Find User"})
    else {
        const validPass = await bcrypt.compare(req.body.password, currentUser.password);
        if (!validPass) return res.status(403).json({message: "User or Password incorrect"})
        else {
            const accessToken = jwt.sign({currentUser}, ACCESS_TOKEN_SECRET, {expiresIn: '10s'});
            const refreshToken = jwt.sign({currentUser}, REFRESH_TOKEN_SECRET);
            
            const body = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                userDetails: currentUser
            };

        res.status(200).json(body); 
        };
    };
});

module.exports = usersRouter;
