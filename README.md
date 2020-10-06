THAT BRANCH SHOULD ALWAYS WORK (with npm start at the ./client, and npm run dev at the ./server), ONLY PULL REQUESTS , NO PUSH OR WORKING ON THAT BRANCH </br>


BRANCH OUT!!</br>

example: "feature-test" </br> </br>

branch out from dev or the branch that you need</br>
PAY ATTENTION to create Pull Request to dev/your base branch and not to main


## setting the envioremnt

_fork this repo and clone_

_cd server && npm i_

_cd ../client && npm i_

_create new db for development - default name is challenge (can change by .env file)_

_run migration: npm run migrate (in server folder)_

_run seeds npx sequelize db:seed:all_

_change NAME_OF_YOUR_ENV in .env file_
