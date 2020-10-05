## Challengeme


- fork this repo and clone
- cd server && npm i
- cd ../client && npm i
- create new db for development - default name is challenge (can change by .env file)
- run migration: `npm run migrate` (in server folder)
- run seeds `npx sequelize db:seed:all`

- enable Github actions in your forked repo - go to https://github.com/{owner}/{repoName}/actions and press "I understand my workflows, go ahead and enable them"
- create .env file from example and fill the params (repo name / create access token)

