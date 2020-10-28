const { Router } = require('express');
const { User } = require('../../models');

const router = Router();

router.get('/allUsers', async (req, res) => {
    try {
        const allUsers = await User.findAll({})
        const filtterdUsersSensitiveData = allUsers.map(user => {
            delete user.dataValues.password
            delete user.dataValues.securityAnswer
            return user.dataValues
        })
        res.json(filtterdUsersSensitiveData)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

module.exports = router;
