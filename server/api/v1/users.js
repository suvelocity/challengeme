const userRouter = require('express').Router();
const checkAdmin = require('../../middleware/checkAdmin');
const { checkTeacherPermission } = require('../../middleware/checkTeamPermission');
const { User, Team } = require('../../models');

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
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Teacher Routes ======================================

userRouter.get('/teacher/:teamId', checkTeacherPermission, async (req, res) => {
  try {
    const { teamId } = req.params;
    const allUsers = await Team.findOne({
      where: {
        id: teamId,
      },
      include: {
        model: User,
        attributes: ['id', 'userName'],
        through: {
          paranoid: false,
        },
      },
    });
    const flitteredUsersSensitiveData = allUsers.Users.map((user) => {
      delete user.dataValues.password;
      delete user.dataValues.securityAnswer;
      return user.dataValues;
    });
    return res.json(flitteredUsersSensitiveData);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Admin Routes ======================================//

// get information about all the users
userRouter.get('/admin', checkAdmin, async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    const filtterdUsersSensitiveData = allUsers.map((user) => {
      delete user.dataValues.password;
      delete user.dataValues.securityAnswer;
      return user.dataValues;
    });
    return res.json(filtterdUsersSensitiveData);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
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
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = userRouter;
