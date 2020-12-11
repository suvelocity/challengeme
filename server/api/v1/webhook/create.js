const createUsersWebhookRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const { v4: generateId } = require('uuid');
const { User, Team, UserTeam, WebhookAccessKey } = require('../../../models');
const {
    webhookSingleUserValidation,
    webhookMultipliedUsersValidation,
    webhookCreateTeamValidation
} = require('../../../helpers/validator');

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "userName": "roy"
    },
        
*/

// webhook create single user
createUsersWebhookRouter.post('/single-user', async (req, res) => {
    try {
        // Joi validation
        const { error } = webhookSingleUserValidation(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        const { userName } = req.body;
        const checkUser = await userIsExist(userName);
        if (checkUser) return res.status(409).send('user name already exists');
        const temporaryPassword = generatePassword()
        const hashPassword = await bcrypt.hashSync(temporaryPassword, 10);
        const newUser = {
            userName,
            password: hashPassword
        }
        await User.create(newUser);
        res.status(201).json({ newUser: { userName, password: temporaryPassword } });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "users": [
        {
            "userName": "roy"
        },
        {
            "userName": "david"
        }
    ]
}
*/

// webhook create multiplied user
createUsersWebhookRouter.post('/multiplied-user', async (req, res) => {
    try {
        // Joi validation
        const { error } = webhookMultipliedUsersValidation(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        const create = await bulkCreateUsers(req.body.users, res)
        if (create) {
            await User.bulkCreate(create.newUsersToCreate);
            res.status(201).json({
                message: `Created ${create.newUsersForResponse.length} new users`,
                newUsers: create.newUsersForResponse
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
body : {
    "teamName": "crm",
    "teachers": [
        {
            "userName": "roy"
        }
    ],
    "users": [
        {
            "userName": "roy"
        },
        {
            "userName": "david"
        }
    ]
}
*/

// webhook create team with/out users
createUsersWebhookRouter.post('/team', async (req, res, next) => {
    try {
        // Joi validation
        const { error } = webhookCreateTeamValidation(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        const externalId = generateId();
        const { teamName } = req.body;
        const teachesInfo = req.body.teachers
        const usersInfo = req.body.users
        if (usersInfo && teachesInfo.every(user => usersInfo.some(teacher => user.userName === teacher.userName))) {
            const createUsers = await bulkCreateUsers(usersInfo, res)
            if (createUsers) {
                const newUsersResponse = await User.bulkCreate(createUsers.newUsersToCreate);
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const newUsersIds = newUsersResponse.map(user => user.id)
                const teachers = newUsersResponse.filter((user => teachesInfo.some(teacher => teacher.userName === user.userName)))
                const teachersUserNames = teachers.map(teacher => teacher.userName)
                const usersTeamArray = newUsersIds.map(id => {
                    const permission = teachers.some(teacher => teacher.id === id) ? 'teacher' : 'student';
                    return { teamId: newTeamResponse.id, userId: id, permission }
                })
                await UserTeam.bulkCreate(usersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team With ${createUsers.newUsersForResponse.length} New Users Success`,
                    newUsers: createUsers.newUsersForResponse,
                    teachers: teachersUserNames,
                    teamId: externalId
                });
            }
        } else {
            const whatTeachersAreExist = await User.findAll({
                where: {
                    userName: teachesInfo.map(teacher => teacher.userName)
                }
            })
            if (whatTeachersAreExist.length === teachesInfo.length) {
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const teachersIds = whatTeachersAreExist.map(teacher => teacher.id)
                const usersTeamArray = teachersIds.map(id => {
                    return { teamId: newTeamResponse.id, userId: id, permission: 'teacher' }
                })
                await UserTeam.bulkCreate(usersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team Success`,
                    teamId: externalId
                });
            } else {
                const missingUsers = teachesInfo.filter(teacher => !whatTeachersAreExist
                    .some(teacherExist => teacher.userName === teacherExist.userName))
                    .map(teacher => teacher.userName)

                res.status(406).json({ message: `${missingUsers} Are not Exist In The System, Please Add Them Inside 'users' Array ` })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});



/* 
request look like this :
header : {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp // webhook token
}
params : e9db316f-4b2b-4f40-a096-5ee443007a00 // uuid

body : {
    "users": [
        {
            "userName": "royTheKing",
            "permission": "student"
        },
        {
            "userName": "suvelocity",
            "permission": "teacher"
        }
    ]
}
*/

// github api for update status about submission
createUsersWebhookRouter.patch('/change-permission/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { users } = req.body;
        const entity = req.entity
        const teamCreator = await WebhookAccessKey.findOne({
            where: {
                id: entity.id
            },
            include: [
                {
                    model: Team,
                    attributes: ["externalId", 'id'],
                },
            ],
        })
        if (teamCreator.Teams.some(team => team.externalId === id)) {
            const teamId = teamCreator.Teams[0].id
            const userNames = users.map(user => user.userName)
            const usersFromDb = await User.findAll({
                where: {
                    userName: userNames
                },
                attributes: ['id', 'userName']
            })
            const formattedUsers = usersFromDb.map(userDb => {
                users.forEach(user => {
                    if (user.userName === userDb.userName) {
                        userDb.permission = user.permission
                    }
                })
                return userDb
            })
            formattedUsers.forEach(async (user) => {
                await UserTeam.update({ permission: user.permission }, {
                    where: {
                        userId: user.id,
                        teamId,
                    }
                })
            })

            res.status(200).json({ message: `Update ${users.length} Users Permission` });
        } else {
            res.status(401).json({ message: 'Not Allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

module.exports = createUsersWebhookRouter;

// generate temporary Password
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// check in the DateBase if user is in the system
async function userIsExist(userName) {
    try {
        const user = await User.findOne({
            where: {
                userName,
            },
        });
        if (user) {
            return true
        }
        return false;
    } catch (error) {
        console.error(error.message);
    }
}

async function bulkCreateUsers(users, res) {

    const checkExistenceUsers = [];
    for (let index = 0; index < users.length; index++) {
        const isExist = await userIsExist(users[index].userName);
        const checkUser = {
            userName: users[index].userName,
            isExist
        }
        checkExistenceUsers.push(checkUser)
    }
    const userNamesTaken = checkExistenceUsers.some((userName) => userName.isExist)
    if (userNamesTaken) {
        const userNamesTakenAlready = checkExistenceUsers.filter((userName) => userName.isExist).map(user => user.userName)
        res.status(409).json({
            message: 'There are usernames that already exists',
            userNamesTakenAlready
        });
        return false
    }
    const newUsersToCreate = [];
    const newUsersForResponse = [];
    for (let index = 0; index < users.length; index++) {
        const temporaryPassword = generatePassword()
        newUsersForResponse.push({
            userName: users[index].userName,
            password: temporaryPassword
        })
        const hashPassword = await bcrypt.hashSync(temporaryPassword, 10);
        users[index].password = hashPassword
        newUsersToCreate.push(users[index])
    }
    return { newUsersToCreate, newUsersForResponse }
}