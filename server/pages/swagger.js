require('dotenv').config();

module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Challenges",
    "description": "Back to ChallengeMe",
    "license": {
      "name": process.env.SWAGGER_IP,
      "url": process.env.IP_ADDRESS
    }
  },
  "host": process.env.SWAGGER_IP,
  "basePath": "/",
  "tags": [
    {
      "name": "Auth",
      "description": "Auth API for Authentication users"
    },
    {
      "name": "Challenges",
      "description": "Challenges API"
    },
    {
      "name": "Images",
      "description": "Images API for challenges images"
    },
    {
      "name": "Types",
      "description": "Types API for challenges types"
    },
    {
      "name": "Labels",
      "description": "Labels API for challenges labels"
    },
    {
      "name": "Submissions",
      "description": "Submissions API for challenges submissions"
    },
    {
      "name": "Reviews",
      "description": "Reviews API for challenges reviews"
    },
    {
      "name": "Teams",
      "description": "Teams API for teams controls and info"
    },
    {
      "name": "Assignments",
      "description": "Assignments API for attach assignments to teams"
    },
    {
      "name": "Insights",
      "decryption": "Insights API for statistics insights"
    },
    {
      "name": "Users",
      "description": "Users API for managing users and info"
    },
    {
      "name": "Webhooks",
      "description": "Webhooks API for ChallengeMe Developers tools"
    },
    {
      "name": "Git Tokens",
      "description": "Github Tokens API for challenges test using CI platform(actions) on github  - only admin access"
    },
    {
      "name": "Services",
      "description": "API Services"
    }

  ],
  "paths": {
    "/api/v1/auth/validate-admin": {
      "get": {
        "tags": [
          "Auth"
        ],
        "summary": "validate if user is admin",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/password-update": {
      "patch": {
        "tags": [
          "Auth"
        ],
        "summary": "reset password- update the password",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/validate-answer": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "reset password- validate the question",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/get-question": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "reset password- send security question for user (check if it exist first)",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/logout": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "logout from the sysytem- will destroy refresh token",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/token": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "refresh token- genarate new access token for user",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "login to the system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/validate-token": {
      "get": {
        "tags": [
          "Auth"
        ],
        "summary": "check if token valid",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/user-exist": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "check if user exist",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/create-user": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "the server will get the email token from users mail, decode it information and create the user from it",
        "responses": {
          "201": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "register to the system- email will be sent to user for extra validation contains his all information",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/webhook/:id": {
      "get": {
        "tags": [
          "Webhooks"
        ],
        "summary": "get the status for certain submission",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/users/info": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "get user information",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/users/permission": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "change iser permission user/admin",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/users/all": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "get all users after cleaning sesetive data- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/types": {
      "get": {
        "tags": [
          "Types"
        ],
        "summary": "get challenge type ???",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/remove-team/:id": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "remove team- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/permission/:teamId": {
      "patch": {
        "tags": [
          "Teams"
        ],
        "summary": "change permission student/teacher- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/create-team": {
      "post": {
        "tags": [
          "Teams"
        ],
        "summary": "create team- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/single-team/:id": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "get team information- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/all-teams": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "get all teams- admin only",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/remove-user/:teamId": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "add users to team",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/add-users/:teamId": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "add users to team",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/teacher-area/:teamId": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "get all the users of the teachers team",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/all-teams-by-user": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "get all teams for the user that logged in with all members",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/teams/team-page/:teamId": {
      "get": {
        "tags": [
          "Teams"
        ],
        "summary": "check if user is a part of a team",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/submissions/by-user/:challengeId": {
      "get": {
        "tags": [
          "Submissions"
        ],
        "summary": "get all submissions for certain challnge for certain user",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/submissions/:challengeId": {
      "get": {
        "tags": [
          "Submissions"
        ],
        "summary": "get all submissions for certain challnge and the users who submitted it",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/apply/:challengeId": {
      "get": {
        "tags": [
          "Submissions"
        ],
        "summary": "aply submission- the stsus will be change to PENDING and the trigger the actions in github",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/labels": {
      "get": {
        "tags": [
          "Labels"
        ],
        "summary": "get all labels for all challnges",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/labels/:challengeId": {
      "post": {
        "tags": [
          "Labels"
        ],
        "summary": "add label for certain challnges",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/reviews/:reviewId": {
      "delete": {
        "tags": [
          "Reviews"
        ],
        "parameters": {
          "name": "reviewId",
          "in": "path",
          "description": "ID of the requested review",
          "required": true,
          "type": "string"
        },
        "summary": "delete review for challenge- admin access",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/reviews/:challengeId": {
      "get": {
        "tags": [
          "Reviews"
        ],
        "summary": "get all reviews for certain challnges",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      },
      "post": {
        "tags": [
          "Reviews"
        ],
        "summary": "add review for certain challnges",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/image": {
      "get": {
        "tags": [
          "Images"
        ],
        "summary": "get all challenge images by request query",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      },
      "post": {
        "tags": [
          "Images"
        ],
        "summary": "add new image for challenge",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/git": {
      "get": {
        "tags": [
          "Git Tokens"
        ],
        "summary": "Get all challenges in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      },
      "post": {
        "tags": [
          "Git Tokens"
        ],
        "summary": "Creates a Token",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Add a Github Token",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Gittoken"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Git Tokens"
        ],
        "summary": "update token status",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/git/:token": {
      "delete": {
        "tags": [
          "Git Tokens"
        ],
        "summary": "delete token",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/challenges": {
      "get": {
        "tags": [
          "Challenges"
        ],
        "summary": "Get all challenges in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      },
      "post": {
        "tags": [
          "Challenges"
        ],
        "summary": "add new challenge to the system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/challenges/user-challenges": {
      "get": {
        "tags": [
          "Challenges"
        ],
        "summary": "get challenges that the user add to the system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/challenges/info/{challengeId}": {
      "get": {
        "tags": [
          "Challenges"
        ],
        "summary": "get challenge by id with all information",
        "parameters": [
          {
            "name": "challengeId",
            "in": "path",
            "required": true,
            "description": "Parameter description in CommonMark or HTML.",
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/challenges/no-matter-the-state": {
      "get": {
        "tags": [
          "Challenges"
        ],
        "summary": "get all challenges no matter the state",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    },
    "/api/v1/challenges/state-update/:challengeId": {
      "get": {
        "tags": [
          "Challenges"
        ],
        "summary": "update challenge state",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": ""
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Challenge": {
      "required": [
        "name",
        "Description",
        "type"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "repositoryName": {
          "type": "string"
        },
        "authorId": {
          "type": "string"
        },
        "state": {
          "type": "enum",
          "enum": [
            "pending",
            "denied",
            "approved"
          ]
        }
      }
    },
    "Gittoken": {
      "type": "object",
      "required": [
        "token",
        "gitAccount",
        "actionsLimit"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "uniqueItems": true
        },
        "status": {
          "type": "enum",
          "enum": [
            "blocked",
            "available"
          ]
        },
        "token": {
          "type": "string",
          "example": "blablabla"
        },
        "resetsAt": {
          "type": "string",
          "format": "date-time"
        },
        "gitAccount": {
          "type": "string",
          "example": "githab123"
        },
        "actionsLimit": {
          "type": "integer",
          "format": "int64",
          "example": 5000
        },
        "authorId": {
          "type": "string"
        },
        "state": {
          "type": "enum",
          "enum": [
            "pending",
            "denied",
            "approved"
          ]
        }
      }
    },
    "Images": {
      "required": [
        "challengeId",
        "img"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "challengeId": {
          "type": "integer"
        },
        "img": {
          "type": "long text"
        }
      }
    },
    "Review": {
      "required": [
        "challengeId",
        "img"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "userId": {
          "type": "integer"
        },
        "title": {
          "type": "string"
        },
        "content": {
          "type": "text"
        },
        "rating": {
          "type": "integer"
        }
      }
    },
    "Lable": {
      "required": [],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "name": {
          "type": "string"
        }
      }
    },
    "RefreshToken": {
      "required": [
        "userName",
        "token"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "userName": {
          "type": "string"
        },
        "token": {
          "type": "text"
        }
      }
    },
    "LabelChallenge": {
      "required": [
        "labelId",
        "challengeId"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "labelId": {
          "type": "integer"
        },
        "challengeId": {
          "type": "integer"
        }
      }
    },
    "Submission": {
      "required": [
        "challengeId",
        "userId"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "challengeId": {
          "type": "integer"
        },
        "userId": {
          "type": "integer"
        },
        "state": {
          "type": "string"
        },
        "solutionRepository": {
          "type": "string"
        }
      }
    },
    "Team": {
      "required": [
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "name": {
          "type": "integer"
        }
      }
    },
    "UserTeam": {
      "required": [
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "teamId": {
          "type": "integer"
        },
        "userId": {
          "type": "integer"
        }
      }
    },
    "User": {
      "required": [
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "uniqueItems": true
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "userName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "birthDate": {
          "type": "date"
        },
        "country": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "phoneNumber": {
          "type": "integer"
        },
        "githubAccount": {
          "type": "string"
        },
        "reasonOfRegistration": {
          "type": "string"
        },
        "securityQuestion": {
          "type": "string"
        },
        "securityAnswer": {
          "type": "string"
        },
        "permission": {
          "type": "string"
        }
      }
    },
    "examples": {
      "Gittoken": {
        "summary": "An example of a Token",
        "type": "object",
        "properties": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string"
            },
            "gitAccount": {
              "type": "string"
            },
            "actionsLimit": {
              "type": "number"
            }
          }
        }
      }
    }
  },
  "schemes": [
    "http",
    "https"
  ],
  "securityDefinitions": {
    "authorization": {
      "description": "JWT authentication header using the Bearer scheme. Example: \"bearer {token}\"",
      "type": "apiKey",
      "name": "authorization",
      "in": "Header"
    }
  },
  "security": [
    {
      "authorization": []
    }
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ]
}
