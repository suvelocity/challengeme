

const request = require('supertest');
const app = require('../app');
const ngrok = require('ngrok');
const port = process.env.TEST_PORT || 4040;
const {Submission, Challenge} = require('../models');
const {challengeArr, solutionRepos, failRepos} = require('./mockData');
let server;

describe('Submission process', () => {
    beforeAll(async (done) => {
        const url = await ngrok.connect(port);
        process.env.MY_URL = url;
        server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
          })
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await Challenge.bulkCreate(challengeArr);
        console.log(solutionRepos)
        console.log(process.env.MY_URL)
        done();
      });
    test('Posting submisson and status change to PENDING', async (done) => {

        await request(app).post(`/api/v1/challenges/${solutionRepos[0].challengeId}/apply`).send({solutionRepository:solutionRepos[0].repo});
        await request(app).post(`/api/v1/challenges/${solutionRepos[1].challengeId}/apply`).send({solutionRepository:solutionRepos[1].repo});
        await request(app).post(`/api/v1/challenges/${solutionRepos[2].challengeId}/apply`).send({solutionRepository:solutionRepos[2].repo});
        await request(app).post(`/api/v1/challenges/${failRepos[0].challengeId}/apply`).send({solutionRepository:failRepos[0].repo});
        let submissions = await Submission.findAll();
        expect(submissions.length).toBe(4);
        submissions.forEach(submission => expect(submission.state).toBe('PENDING'));
        done();
    });
    test('Getting Submission Status back to database', async (done) => {
        let submissions;
        const solution = await Submission.findOne({challengeId:1});
        // changing the state of a successed submission to 'FAIL' to see if it will get resolved
        await solution.update({state: 'FAIL'});
        function checkingPending (){
            return new Promise((resolve, reject) => {
                function checking(){
                    setTimeout(async()=>{
                        submissions = await Submission.findAll();
                        if(submissions.every(submission => submission.state !== 'PENDING')){
                            console.log('success');
                            return resolve('success');
                        }else{
                            console.log('checking again')
                            return checking();
                    }
                    }, 10000);
                }
                checking();
            });
        }
        await checkingPending();
        done();
    },200000);
    
    test('Correct status on the Submissions', async (done) => {
        const allSubmissions = await Submission.findAll();
        solutionRepos.forEach(solution => {
            const index = allSubmissions.findIndex(submission => submission.solutionRepository === solution.repo && submission.state === 'SUCCESS');
            expect(index).toBeGreaterThan(-1);
        })
        failRepos.forEach(fail => {
            const index = allSubmissions.findIndex(submission => submission.solutionRepository === fail.repo && submission.state === 'FAIL');
            expect(index).toBeGreaterThan(-1);
        })
        const resolvedSubmission = await Submission.findOne({challengeId:1});
        expect(resolvedSubmission.state).toBe('SUCCESS')
        done();
    })

    afterAll(async (done) => {
        server.close();
        await ngrok.disconnect();
        done();
    })
});  
