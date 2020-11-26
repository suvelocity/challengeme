const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { User, UserTeam, Team, Assignment } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');
const assignmentMock = require('../../mocks/assignments');

function generateToken(currentUser) {
    const infoForCookie = {
        userId: currentUser.id,
        userName: currentUser.userName,
    };
    return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '900s',
    });
}

describe('Testing assignments routes', () => {
    beforeEach(async () => {
        await User.destroy({ truncate: true, force: true });
        await UserTeam.destroy({ truncate: true, force: true });
        await Team.destroy({ truncate: true, force: true });
        await Assignment.destroy({ truncate: true, force: true });
    });

    test('Can student and teacher get info about his team assignments', async (done) => {
        await User.bulkCreate(userMock);
        await UserTeam.bulkCreate(userTeamMock);
        await Team.bulkCreate(teamMock);
        await Assignment.bulkCreate(assignmentMock);

        const assignmentsForTeam = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(assignmentsForTeam.status).toBe(200);
        expect(assignmentsForTeam.body.length).toBe(assignmentMock.filter(assign => assign.teamId === teamMock[0].id).length)

        const unauthorized = await request(app)
            .get(`/api/v1/assignments/${teamMock[1].id}`)
            .set('authorization', `bearer ${generateToken(userMock[1])}`);

        expect(unauthorized.status).toBe(401);

        const adminNotInTeam = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[2])}`);

        expect(adminNotInTeam.status).toBe(200);

        done();
    });

    test('Can teacher add assignments to his own team', async (done) => {
        await User.bulkCreate(userMock);
        await UserTeam.bulkCreate(userTeamMock);
        await Team.bulkCreate(teamMock);
        await Assignment.bulkCreate(assignmentMock);

        const assignmentsForTeam = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(assignmentsForTeam.status).toBe(200);
        expect(assignmentsForTeam.body.length).toBe(assignmentMock.filter(assign => assign.teamId === teamMock[0].id).length)


        const addAssignment = await request(app)
            .post(`/api/v1/assignments/${teamMock[0].id}`)
            .send({ challenges: [{ value: 3 }, { value: 4 }] })
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(addAssignment.status).toBe(201);

        const assignmentsForTeamAfterAdded = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(assignmentsForTeamAfterAdded.status).toBe(200);
        expect(assignmentsForTeamAfterAdded.body.length)
            .toBe(assignmentMock.filter(assign => assign.teamId === teamMock[0].id).length + 2);

        const unauthorized = await request(app)
            .post(`/api/v1/assignments/${teamMock[1].id}`)
            .send({ challenges: [{ value: 5 }, { value: 6 }] })
            .set('authorization', `bearer ${generateToken(userMock[1])}`);

        expect(unauthorized.status).toBe(401);

        const adminNotTeacherInTeam = await request(app)
            .post(`/api/v1/assignments/${teamMock[0].id}`)
            .send({ challenges: [{ value: 5 }] })
            .set('authorization', `bearer ${generateToken(userMock[2])}`);

        expect(adminNotTeacherInTeam.status).toBe(201);

        done();
    });

    test('Can teacher remove assignments from his own team', async (done) => {
        await User.bulkCreate(userMock);
        await UserTeam.bulkCreate(userTeamMock);
        await Team.bulkCreate(teamMock);
        await Assignment.bulkCreate(assignmentMock);

        const assignmentsForTeam = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(assignmentsForTeam.status).toBe(200);
        expect(assignmentsForTeam.body.length).toBe(assignmentMock.filter(assign => assign.teamId === teamMock[0].id).length)

        const removeUser = await request(app)
            .delete(`/api/v1/assignments/${teamMock[0].id}`)
            .query({ challengeId: 2 })
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(removeUser.status).toBe(204);

        const assignmentsForTeamAfterRemove = await request(app)
            .get(`/api/v1/assignments/${teamMock[0].id}`)
            .set('authorization', `bearer ${generateToken(userMock[0])}`);

        expect(assignmentsForTeamAfterRemove.status).toBe(200);
        expect(assignmentsForTeamAfterRemove.body.length).toBe(assignmentMock.filter(assign => assign.teamId === teamMock[0].id).length - 1)

        const unauthorized = await request(app)
            .delete(`/api/v1/assignments/${teamMock[0].id}`)
            .query({ challengeId: 2 })
            .set('authorization', `bearer ${generateToken(userMock[1])}`);

        expect(unauthorized.status).toBe(401);

        const adminNotTeacherInTeam = await request(app)
            .delete(`/api/v1/assignments/${teamMock[0].id}`)
            .query({ challengeId: 1 })
            .set('authorization', `bearer ${generateToken(userMock[2])}`);

        expect(adminNotTeacherInTeam.status).toBe(204);

        done();
    });
});
