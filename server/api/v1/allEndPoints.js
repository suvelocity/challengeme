//                 Challenges
challengeRouter.get("/")                         // gets all 
challengeRouter.get('/labels')                   // gets all of challenge labels
challengeRouter.get("/:challengeId") // add creator (name and github)    // gets a specific challenge
challengeRouter.get("/:challengeId/submissions") // gets all the challenge's submissions 
challengeRouter.post("/:challengeId/apply") //****CHANGE******** */     // posts a submission for a challenge

//                 Images
ImageRouter.get('/')    // gets a specific img #### full path: /api/v1/image?id= 
ImageRouter.post('/')   // posts a new img    #### full path: /api/v1/image

//                 Reviews
reviewsRouter.get("/byChallenge/:challengeId") //add creator (name and github)
reviewsRouter.post("/:challengeId")

//                 User
usersRouter.post("/register") // register
usersRouter.post('/createuser') // Create User
usersRouter.post("/userexist")// Check if user exists in the DB
usersRouter.post("/getquestion")// Geting Sequrity Question

//                 Tokens
usersRouter.post("/login")// Log In
usersRouter.post("/token")//Get new access token after the previous expired
usersRouter.post("/logout")// Logout request
usersRouter.get("/validateToken")
usersRouter.post("/info")// validate token
usersRouter.post("/validateanswer")// Validate Answer
usersRouter.patch("/passwordupdate")// Password Update
