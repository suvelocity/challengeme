const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const checkAdmin = require('../../middleware/checkAdmin');
const { checkTeacherPermission } = require('../../middleware/checkTeamPermission');
const { User, Challenge, Submission, Review, UserTeam, Team } = require('../../models');
const { editUserValidation, changePasswordValidation } = require('../../helpers/validator');

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

userRouter.patch('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (newPassword === oldPassword) return res.status(409).json({ message: 'You should choose new password' });
    const { error } = changePasswordValidation(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).json({ success: false, message: 'password should be at least 8 characters' });
    }

    const user = await User.findOne({
      where: {
        userName: req.user.userName,
      },
    });

    const validPass = await bcrypt.compareSync(
      oldPassword,
      user.password,
    );

    if (!validPass) return res.status(400).json({ message: 'Old Password Incorrect' });

    const hashPassword = await bcrypt.hashSync(newPassword, 10);

    await User.update({ password: hashPassword }, {
      where: {
        userName: req.user.userName,
      },
    });

    return res.json({ message: 'Updated Password Success' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

userRouter.patch('/info', async (req, res) => {
  const {
    firstName, lastName, birthDate, country, city, githubAccount,
  } = req.body;
  try {
    const editedUser = {};
    firstName ? editedUser.firstName = firstName : null;
    lastName ? editedUser.lastName = lastName : null;
    birthDate ? editedUser.birthDate = birthDate : null;
    country ? editedUser.country = country : null;
    city ? editedUser.city = city : null;
    githubAccount ? editedUser.githubAccount = githubAccount : null;
    const { error } = editUserValidation(editedUser);
    if (error) {
      console.error(error.message);
      const onlyLetters = 'must be only letters';
      const validator = {
        firstName: `first name ${onlyLetters}`,
        lastName: `last name ${onlyLetters}`,
        birthDate: 'invalid date',
        country: `country ${onlyLetters}`,
        city: `city ${onlyLetters}`,
        githubAccount: 'invalid github account',
      };
      const myMessage = validator[error.details[0].context.key];
      const responseMessage = myMessage || "Don't mess with me!";
      return res.status(400).json({ success: false, message: responseMessage });
    }
    await User.update(editedUser, {
      where: {
        userName: req.user.userName,
      },
    });
    return res.json({ message: 'Updated Personal Details Success' });
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

// bind user with the same email
userRouter.put('/bind', checkAdmin, async (req, res) => {
  const { email } = req.body;
  try {
    const allUsersSameEmail = await User.findAll({
      where: {
        email,
      },
    });
    bindUsers(allUsersSameEmail[0], allUsersSameEmail)
    return res.json(allUsersSameEmail);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

async function bindUsers(main, list) {
  const jsonMap = list.map(user => user.toJSON()).splice(1)
  const jsonMain = main.toJSON()
  console.log('-------------------------------------------------------------');
  const idList = jsonMap.map(user => user.id)
  await Challenge.update({ authorId: jsonMain.id }, {
    where: {
      authorId: idList
    }
  })
  await Submission.update({ userId: jsonMain.id }, {
    where: {
      userId: idList
    }
  })
  await Review.update({ userId: jsonMain.id }, {
    where: {
      userId: idList
    }
  })
  await UserTeam.update({ userId: jsonMain.id }, {
    where: {
      userId: idList
    }
  })
  const allUserTeamsByUser = await UserTeam.findAll({
    where: {
      userId: jsonMain.id
    }
  })
  const jsonUserTeam = allUserTeamsByUser.map(a => a.toJSON())
  let chicken = {};
  jsonUserTeam.forEach((i) => {
    if (!chicken[i.userId + '_' + i.teamId]) {
      chicken[i.userId + '_' + i.teamId] = i
    }
  })
  const toRecover = Object.values(chicken)
  const elementsIds = jsonUserTeam.map(a => a.id)
  await UserTeam.destroy({
    where: {
      id: elementsIds
    },
    force: true
  })
  await UserTeam.bulkCreate(toRecover)
  await User.destroy({
    where: {
      id: idList
    },
    force: true
  })
  console.log('-------------------------------------------------------------');
}

module.exports = userRouter;
