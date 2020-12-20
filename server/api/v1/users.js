const userRouter = require('express').Router();
const checkAdmin = require('../../middleware/checkAdmin');
const { checkTeacherPermission } = require('../../middleware/checkTeamPermission');
const { User, Team } = require('../../models');
const { editUserValidation } = require('../../helpers/validator')

// get information about user
userRouter.get('/info', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.user.userName,
      },
      attributes: [
        'userName',
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

userRouter.patch('/info', async (req, res) => {
  const { firstName, lastName, birthDate, country, city, githubAccount } = req.body
  try {
    const editedUser = {}
    firstName ? editedUser.firstName = firstName : null
    lastName ? editedUser.lastName = lastName : null
    birthDate ? editedUser.birthDate = birthDate : null
    country ? editedUser.country = country : null
    city ? editedUser.city = city : null
    githubAccount ? editedUser.githubAccount = githubAccount : null
    const { error } = editUserValidation(editedUser);
    if (error) {
      console.error(error.message);
      const onlyLetters = 'must be only letters';
      const validator = {
        firstName: 'first name ' + onlyLetters,
        lastName: 'last name ' + onlyLetters,
        birthDate: 'invalid date',
        country: 'country ' + onlyLetters,
        city: 'city ' + onlyLetters,
        githubAccount: 'invalid github account'
      }
      const myMessage = validator[error.details[0].context.key]
      const responseMessage = myMessage ? myMessage : "Don't mess with me!"
      return res.status(400).json({ success: false, message: responseMessage });
    }
    await User.update(editedUser, {
      where: {
        userName: req.user.userName,
      }
    });
    return res.json({ message: 'Updated Success' });
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

    return res.json(allUsers);
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
