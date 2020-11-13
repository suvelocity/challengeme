const userRouter = require('express').Router();
const checkAdmin = require('../../middleware/checkAdmin');
const { User } = require('../../models');

// get information about user
userRouter.get('/info', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.user.userName,
      },
      attributes: [
        'firstName',
        'lastName',
        'birthDate',
        'country',
        'city',
        'githubAccount',
        'createdAt',
      ],
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Admin Routes ======================================//

// get information about all the users
userRouter.get('/all', checkAdmin, async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    const filtterdUsersSensitiveData = allUsers.map((user) => {
      delete user.dataValues.password;
      delete user.dataValues.securityAnswer;
      return user.dataValues;
    });
    res.json(filtterdUsersSensitiveData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// edit user permission
userRouter.patch('/permission', checkAdmin, async (req, res) => {
  const { permission, userName } = req.body;
  try {
    const updatedUser = await User.update({ permission }, {
      where: {
        userName,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = userRouter;
