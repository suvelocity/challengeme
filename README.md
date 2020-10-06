THAT BRANCH SHOULD ALWAYS WORK (with npm start at the ./client, and npm run dev at the ./server), ONLY PULL REQUESTS , NO PUSH OR WORKING ON THAT BRANCH


BRANCH OUT!!

example 
"feauture-test"

branch out from dev or the branch that you need
PAY ATTENSION to create Pull Request to dev/your base branch and not to main


## setting the envioremnt
fork this repo and clone
cd server && npm i
cd ../client && npm i
create new db for development - default name is challenge (can change by .env file)
run migration: npm run migrate (in server folder)
run seeds npx sequelize db:seed:all
change NAME_OF_YOUR_ENV in .env file
