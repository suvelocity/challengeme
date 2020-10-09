

const request = require('supertest');
const app = require('./app');
const appForWebhook = require('./app');
const ngrok = require('ngrok');
const port = process.env.PORT || 4040;
// const fs = require('fs');
// const filePath = 'urlForTest.json';
// const data = fs.readFileSync(filePath);
// const url = JSON.parse(data).url;
// process.env.MY_URL= url;
const {Submission, Challenge} = require('./models');
const {challengeArr, solutionRepos, failRepos} = require('./mockData');

jest.setTimeout(300000);
describe('Submission process', () => {
    beforeAll(async () => {
        const url = await ngrok.connect(port);
        process.env.MY_URL = url;
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
          })
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await Challenge.bulkCreate(challengeArr);
        console.log(solutionRepos)
        console.log(process.env.MY_URL)
      });
    test('Posting submisson and status change to PENDING', async () => {

        await request(app).post(`/api/v1/challenges/${solutionRepos[0].challengeId}/apply`).send({solutionRepository:solutionRepos[0].repo});
        await request(app).post(`/api/v1/challenges/${solutionRepos[1].challengeId}/apply`).send({solutionRepository:solutionRepos[1].repo});
        await request(app).post(`/api/v1/challenges/${solutionRepos[2].challengeId}/apply`).send({solutionRepository:solutionRepos[2].repo});
        await request(app).post(`/api/v1/challenges/${failRepos[0].challengeId}/apply`).send({solutionRepository:failRepos[0].repo});
        let submissions = await Submission.findAll();
        expect(submissions.length).toBe(4);
        submissions.forEach(submission => expect(submission.state).toBe('PENDING'));
    });
    test('Getting Submission Status back to database', async () => {
        let submissions;
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
    });
    test('Correct status on the Submissions', async () => {
        const allSubmissions = await Submission.findAll();
        let success = allSubmissions.filter(submission => submission.state === 'SUCCESS');
        expect(success.length).toBe(3);
        let fails = allSubmissions.filter(submission => submission.state === 'FAIL');
        expect(fails.length).toBe(1);
    });
});  
