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
    "teamName": "crm",
    "leaders": [
        {
            "userName": "roy"
        },
           {
            "userName": "dan"
        }
    ],
    "usersToCreate": [    // optional
        {
            "userName": "roy"
        },
        {
            "userName": "david"
        }
    ],
    "eventsRegistration": [ // optional
        {
        "webhookUrl": "http://localhost:8090/api/v1/webhook",
        "events":  ["startedChallenge","submittedChallenge"],
        "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        },
        {
        "webhookUrl": "http://localhost:8091/api/v1/webhook",
        "events":  ["startedChallenge"],
        "authorizationToken": "1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }
    ]
}
*/

// webhook create team with/out users
createUsersWebhookRouter.post('/create', async (req, res, next) => {
    try {
        // Joi validation
        const { error } = webhookCreateTeamValidation(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        const externalId = generateId();
        const { teamName } = req.body;
        const leadersInfo = req.body.leaders
        const usersInfo = req.body.usersToCreate
        const whichTeachersExist = await User.findAll({
            where: {
                // userName: leadersInfo.map(leader => { return { userName: leader.userName } })
                userName: leadersInfo.map(leader => leader.userName)
            }
        })
        const leadersExistUserNames = whichTeachersExist.map(leader => leader.userName)
        console.log(leadersExistUserNames);
        console.log(usersInfo);
        console.log(leadersInfo);
        console.log(leadersInfo.every(user => usersInfo.some(leader => user.userName === leader.userName)));
        if (usersInfo && leadersInfo.every(user => usersInfo.some(leader => user.userName === leader.userName) || leadersExistUserNames.some(leader => user.userName === leader.userName))) {
            const createUsers = await bulkCreateUsers(usersInfo, res)
            if (createUsers) {
                const newUsersResponse = await User.bulkCreate(createUsers.newUsersToCreate);
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const newUsersIds = newUsersResponse.map(user => user.id)
                const leaders = newUsersResponse.filter((user => leadersInfo.some(leader => leader.userName === user.userName)))
                const leadersUserNames = leaders.map(leader => leader.userName)
                const usersTeamArray = newUsersIds.map(id => {
                    if (leaders.some(leader => leader.id === id)) {
                        return { teamId: newTeamResponse.id, userId: id, permission: 'student' }
                    }
                }).filter(x => !!x)

                const leadersIds = whichTeachersExist.map(leader => leader.id)
                leadersIds.forEach(id => {
                    usersTeamArray.push({ teamId: newTeamResponse.id, userId: id, permission: 'teacher' })
                })
                console.log('usersTeamArray', usersTeamArray.length);
                await UserTeam.bulkCreate(usersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team With ${createUsers.newUsersForResponse.length} New Users Success`,
                    newUsers: createUsers.newUsersForResponse,
                    leaders: leadersUserNames,
                    teamId: externalId
                });
            }
        } else {
            const whichTeachersExist = await User.findAll({
                where: {
                    userName: leadersInfo.map(leader => leader.userName)
                }
            })
            if (whichTeachersExist.length === leadersInfo.length) {
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const leadersIds = whichTeachersExist.map(leader => leader.id)
                const leadersTeamArray = leadersIds.map(id => {
                    return { teamId: newTeamResponse.id, userId: id, permission: 'teacher' }
                })
                await UserTeam.bulkCreate(leadersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team Success`,
                    teamId: externalId
                });
            } else {
                const missingUsers = leadersInfo.filter(leader => !whichTeachersExist
                    .some(leaderExist => leader.userName === leaderExist.userName))
                    .map(leader => leader.userName)

                res.status(406).json({ message: `${missingUsers} Are not Exist In The System, Please Add Them Inside 'users' Array ` })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});


createUsersWebhookRouter.post('/add-users', async (req, res, next) => {
    try {
        // Joi validation
        const { error } = webhookCreateTeamValidation(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
        const externalId = generateId();
        const { teamName } = req.body;
        const leadersInfo = req.body.leaders
        const usersInfo = req.body.usersToCreate
        const whichTeachersExist = await User.findAll({
            where: {
                // userName: leadersInfo.map(leader => { return { userName: leader.userName } })
                userName: leadersInfo.map(leader => leader.userName)
            }
        })
        const leadersExistUserNames = whichTeachersExist.map(leader => leader.userName)
        console.log(leadersExistUserNames);
        console.log(usersInfo);
        console.log(leadersInfo);
        console.log(leadersInfo.every(user => usersInfo.some(leader => user.userName === leader.userName)));
        if (usersInfo && leadersInfo.every(user => usersInfo.some(leader => user.userName === leader.userName) || leadersExistUserNames.some(leader => user.userName === leader.userName))) {
            const createUsers = await bulkCreateUsers(usersInfo, res)
            if (createUsers) {
                const newUsersResponse = await User.bulkCreate(createUsers.newUsersToCreate);
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const newUsersIds = newUsersResponse.map(user => user.id)
                const leaders = newUsersResponse.filter((user => leadersInfo.some(leader => leader.userName === user.userName)))
                const leadersUserNames = leaders.map(leader => leader.userName)
                const usersTeamArray = newUsersIds.map(id => {
                    if (leaders.some(leader => leader.id === id)) {
                        return { teamId: newTeamResponse.id, userId: id, permission: 'student' }
                    }
                }).filter(x => !!x)

                const leadersIds = whichTeachersExist.map(leader => leader.id)
                leadersIds.forEach(id => {
                    usersTeamArray.push({ teamId: newTeamResponse.id, userId: id, permission: 'teacher' })
                })
                console.log('usersTeamArray', usersTeamArray.length);
                await UserTeam.bulkCreate(usersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team With ${createUsers.newUsersForResponse.length} New Users Success`,
                    newUsers: createUsers.newUsersForResponse,
                    leaders: leadersUserNames,
                    teamId: externalId
                });
            }
        } else {
            const whichTeachersExist = await User.findAll({
                where: {
                    userName: leadersInfo.map(leader => leader.userName)
                }
            })
            if (whichTeachersExist.length === leadersInfo.length) {
                const newTeamResponse = await Team.create({ name: teamName, externalId });
                const leadersIds = whichTeachersExist.map(leader => leader.id)
                const leadersTeamArray = leadersIds.map(id => {
                    return { teamId: newTeamResponse.id, userId: id, permission: 'teacher' }
                })
                await UserTeam.bulkCreate(leadersTeamArray);
                res.status(201).json({
                    message: `Create ${teamName} Team Success`,
                    teamId: externalId
                });
            } else {
                const missingUsers = leadersInfo.filter(leader => !whichTeachersExist
                    .some(leaderExist => leader.userName === leaderExist.userName))
                    .map(leader => leader.userName)

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
            "permission": "leader"
        }
    ]
}
*/

// github api for update status about submission
createUsersWebhookRouter.patch('/change-permissions/:id', async (req, res) => {
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
                users.map(user => {
                    if (user.userName === userDb.userName) {
                        userDb.permission = user.permission
                    }
                })
                return userDb
            })
            formattedUsers.map(async (user) => {
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