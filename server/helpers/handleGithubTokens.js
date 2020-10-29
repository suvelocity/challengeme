const { GitToken } = require("../models");

module.exports = async function handleGithubTokens(headers) {
    console.log('---------------------------------------------------------------------');
    console.log('Will Reset In - ', Math.round((((new Date(headers['x-ratelimit-reset'] * 1000) - new Date()) % 86400000) % 3600000) / 60000), 'Minutes');
    console.log('Remain Actions - ', headers['x-ratelimit-remaining']);
    console.log('Total Action Alowed - ', headers['x-ratelimit-limit']);
    console.log('Actions Alredy Used - ', headers['x-ratelimit-used']);
    console.log('---------------------------------------------------------------------');

    try {
        const allTokens = await GitToken.findAll({})
        const tokensArray = allTokens.map(token => token.dataValues.token)

        console.log('BEFORE WE DO AMAZING', process.env.GITHUB_ACCESS_TOKEN);

        let location = tokensArray.indexOf(process.env.GITHUB_ACCESS_TOKEN)
        if (tokensArray.length === location + 1) {
            location = -1
        }
        if (headers['x-ratelimit-remaining'] > 4500 ) {
            process.env.GITHUB_ACCESS_TOKEN = tokensArray[location + 1];
        }

        console.log('AFTER SWITCH', process.env.GITHUB_ACCESS_TOKEN);

    } catch (error) {
        console.error(error);
    }
};
