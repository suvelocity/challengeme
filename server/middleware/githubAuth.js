require('dotenv').config();
module.exports = async function githubAuth(req, res, next) {
    const data = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.body.code,
    }

    const headers = {
        "Content-Type": "application/json",
        'Content-Length': JSON.stringify(data).length,
    }

    axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        data,
        headers,
    })
        .then(results => {
            const accessToken = results.data.split("&")[0].split("=")[1]
            console.log('accessToken : ', accessToken)
            headers.authorization = `Bearer ${accessToken}`
            // res.json({body : res.body})
            axios({
                method: 'get',
                url: 'https://api.github.com/user',
                data: {},
                headers,

            }).then(async (results2) => {
                req.body.gitUser = results2.data;
                next();
            }).catch(() => {
                res.status(400).json({ message: "Github Authentication failed" })
            })
        }).catch(() => {
            res.status(400).json({ message: "Github Authentication failed, Invalid Temp Code" })
        })
}