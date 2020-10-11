const challengeArr = [
  {
    id: 1,
    name: "Promise Implementation",
    description: "https://github.com/suvelocity/PromiseBoilerplate",
    type: "static",
    repositoryName: "suvelocity/PromiseChallenge",
    cover: "https://storage.googleapis.com/challenges-cover/promise.jpeg",
    created_at: "2020-10-04T14:30:00.000Z",
    updated_at: "2020-10-04T14:30:00.000Z",
    deleted_at: null
    },
    {
    id: 2,
    name: "React - Calculator",
    description: "https://github.com/suvelocity/calculator-challenge",
    type: "client",
    repositoryName: "suvelocity/calculator-challange-tests",
    cover: "https://storage.googleapis.com/challenges-cover/calc.jpg",
    created_at: "2020-10-01",
    updated_at: "2020-10-01",
    deleted_at: null
    },
    {
    id: 3,
    name: "React - Chat app",
    description: "https://github.com/suvelocity/Chat-App-Template",
    type: "fullstack",
    repositoryName: "suvelocity/Chat_App-Challange",
    cover: "https://storage.googleapis.com/challenges-cover/chat_f.png",
    created_at: "2020-10-01",
    updated_at: "2020-10-01",
    deleted_at: null
    },
    {
    id: 4,
    name: "Mysql - My Nodejs ORM",
    description: "https://github.com/suvelocity/challenge-sequelize-template",
    type: "static-mysql",
    repositoryName: "suvelocity/challenge-sequelize",
    cover: "https://storage.googleapis.com/challenges-cover/orm.jpeg",
    created_at: "2020-10-01",
    updated_at: "2020-10-01",
    deleted_at: null
    }
];

const solutionRepos = [
    {repo:'royc67/PromiseBoilerplate', challengeId:1},
    {repo:'ZBejavu/calculator-challenge', challengeId:2},
    {repo:'giladyavneh/challenge-sequelize-template', challengeId:4}
];
const failRepos = [
    {repo:'ZBejavu/noneexistingrepo', challengeId:3},
]

module.exports = {challengeArr, solutionRepos, failRepos}