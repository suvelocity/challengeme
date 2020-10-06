THAT BRANCH SHOULD ALWAYS WORK (with npm start at the ./client, and npm run dev at the ./server), ONLY PULL REQUESTS , NO PUSH OR WORKING ON THAT BRANCH


BRANCH OUT!!

example 
"feauture-test"

branch out from dev or the branch that you need
PAY ATTENSION to create Pull Request to dev/your base branch and not to main


## setting the envioremnt
_fork this repo and clone
_cd server && npm i
_cd ../client && npm i
_create new db for development - default name is challenge (can change by .env file)
_run migration: npm run migrate (in server folder)
_run seeds npx sequelize db:seed:all
_change NAME_OF_YOUR_ENV in .env file
