const challengeArr = [
    {
    id: 1,
    name: "JWT - Node.js",
    description: "https://github.com/suvelocity/Authentication-Challenge-TEMPLATE",
    type: "static",
    repository_name: "suvelocity/Authentication-Challenge",
    cover: "https://storage.googleapis.com/challenges-cover/jwt.png",
    created_at: "2020-10-01",
    updated_at: "2020-10-01",
    deleted_at: null
    },
    {
    id: 2,
    name: "React - Calculator",
    description: "https://github.com/suvelocity/calculator-challenge",
    type: "client",
    repository_name: "suvelocity/calculator-challange-tests",
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
    repository_name: "suvelocity/Chat_App-Challange",
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
    repository_name: "suvelocity/challenge-sequelize",
    cover: "https://storage.googleapis.com/challenges-cover/orm.jpeg",
    created_at: "2020-10-01",
    updated_at: "2020-10-01",
    deleted_at: null
    }
]
const solutionRepos = [
    {repo:'david35008/Authentication-Challenge-SOLUTION', challengeId:1},
    {repo:'ZBejavu/calculator-challenge', challengeId:2},
    {repo:'giladyavneh/challenge-sequelize-template', challengeId:4}
];
const failRepos = [
    {repo:'ZBejavu/noneexistingrepo', challengeId:3},
]

module.exports = {challengeArr, solutionRepos, failRepos}