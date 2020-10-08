const request = require('supertest');
const app = require('../app');
const ngrok = require('ngrok');
const port=4040;
app.listen(port, () => {
    console.log('LISTENING ASDFSADF ', port)
})
const {Submission, Challenge} = require('../models');
const {challengeArr, solutionRepos, failRepos} = require('./mockData');
const axios = require('axios');

jest.setTimeout(200000);
describe('testing this', () => {
    beforeAll(async () => {
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await Challenge.bulkCreate(challengeArr);
        const requests = solutionRepos.forEach(solution => {
            return axios.post(`http://localhost:${port}/challenges/${solution.challengeId}/apply`)
        })
        console.log(solutionRepos)
        const url = await ngrok.connect(port);
        await Promise.all(requests).then(values =>{
            console.log('success');
        }) 
        process.env.MY_URL = url; 
        console.log(process.env.MY_URL)
      });
    //     async function testFunction(){
    // }
    // await testFunction();
    test('Can get all tickets', () => {
        
        expect(1).toBe(1);
    });
});  
