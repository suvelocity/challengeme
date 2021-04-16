require('dotenv').config();

module.exports = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "ChallengeMe",
        "description": "Back to ChallengeMe:",
        "license": {
            "name": process.env.SWAGGER_IP,
            "url": process.env.IP_ADDRESS
        }
    },
    "host": process.env.SWAGGER_IP,
    "basePath": "/",
    "tags": [
        {
            "name": "Authentication",
            "description": "API for Authentication users"
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
        "/api/v1/challenges/": {
            "get": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Get all challenges",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Create new challenge",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a challenge",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/challenges/user-challenges": {
            "get": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Get challenges that create by the logged in user",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/challenges/info/{challengeId}": {
            "get": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Get challenge information",
                "parameters": [
                    {
                        "in": "path",
                        "name": "challengeId",
                        "description": "Id of Challenges",
                        "required": true,
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
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/challenges/boiler-plate/{challengeId}": {
            "get": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Get the challenge boiler-plate when logged in",
                "parameters": [
                    {
                        "in": "path",
                        "name": "challengeId",
                        "description": "Id of Challenges",
                        "required": true,
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
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/challenges/no-matter-the-state": {
            "get": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Get all challenges even the not approves (admin only)",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/challenges/state-update/{challengeId}": {
            "patch": {
                "tags": [
                    "Challenges"
                ],
                "summary": "Approve challenge as admin",
                "parameters": [
                    {
                        "in": "path",
                        "name": "challengeId",
                        "description": "Id of challenge",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update challenge",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/images/": {
            "get": {
                "tags": [
                    "Images"
                ],
                "summary": "Get image",
                "parameters": [
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Images"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Images"
                ],
                "summary": "Add a image",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a image",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Images"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Images"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/labels/": {
            "get": {
                "tags": [
                    "Labels"
                ],
                "summary": "Get label",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Labels"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/labels/{challengeId}": {
            "post": {
                "tags": [
                    "Labels"
                ],
                "summary": "Add a label",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a label",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Labels"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Labels"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/reviews/{challengeId}": {
            "get": {
                "tags": [
                    "Reviews"
                ],
                "summary": "Get review",
                "parameters": [
                    {
                        "in": "path",
                        "name": "reviewId",
                        "description": "Id of Reviews",
                        "required": true,
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
                            "$ref": "#/definitions/Reviews"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Reviews"
                ],
                "summary": "Add a review",
                "parameters": [
                    {
                        "in": "path",
                        "name": "challengeId",
                        "description": "Id of Challenge",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a review",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Reviews"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Reviews"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/reviews/{reviewId}": {
            "delete": {
                "tags": [
                    "Reviews"
                ],
                "summary": "Delete review",
                "parameters": [
                    {
                        "in": "path",
                        "name": "reviewId",
                        "description": "Id of review",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/auth/client-id-google": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Get google client id third party for authentication",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "clientId": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/auth/authentication-with-google": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Execute third party authentication with google",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Login"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/client-id-github": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Get github client id third party for authentication",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "clientId": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/auth/authentication-with-github": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Execute third party authentication with github",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Login"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/register": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Register to the system",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/create-user": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Create user using the token authentication",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Login"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/user-exist": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Check if username already exist in the system",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userName": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "notExist": {
                                    "type": "boolean"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/validate-token": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Validate token is still valid",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "valid": {
                                    "type": "boolean"
                                },
                                "isAdmin": {
                                    "type": "boolean"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/auth/login": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Login authentication",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userName": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "rememberMe": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Login"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/token": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Get new access token using refresh token",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                },
                                "isAdmin": {
                                    "type": "boolean"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/logout": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Logout from system",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/get-question": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Get authentication question for reset password season",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userName": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "securityQuestion": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/validate-answer": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Validate authentication answer for reset password",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userName": {
                                    "type": "string"
                                },
                                "securityAnswer": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "resetToken": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/auth/password-update": {
            "patch": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Update logged in user password",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update auth",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "resetToken": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/auth/validate-admin": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Validate the requested user is admin",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "admin": {
                                    "type": "boolean"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/submissions/{id}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Github Update Submission status",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Submission result",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/Submissions"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/teams/": {
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Create a team using webhook",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "New Team Data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "teamName": {
                                    "type": "string"
                                },
                                "leaders": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                                "usersToCreate": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Users"
                                    }
                                },
                                "eventsRegistration": {
                                    "type": "object",
                                    "properties": {
                                        "webhookUrl": {
                                            "type": "string"
                                        },
                                        "events": {
                                            "type": "array",
                                            "items": {
                                                "type": "string",
                                            }
                                        },
                                        "authorizationToken": {
                                            "type": "string"
                                        },
                                    }
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Create Team Success",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Create <team name> Team With <number> New Users Success"
                                },
                                "leaders": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                                "teamId": {
                                    "type": "string",
                                },
                                "newUsers": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                            "password": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                                "eventRegistrationStatus": {
                                    "type": "number",
                                    "example": 201
                                },
                                "eventRegistrationMessage": {
                                    "type": "string",
                                    "example": "Events Registration Success"
                                },
                            }
                        }
                    },
                    "207": {
                        "description": "Create Team Success, But error with the events",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Create <team name> Team With <number> New Users Success"
                                },
                                "leaders": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                                "teamId": {
                                    "type": "string",
                                },
                                "newUsers": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                            "password": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                                "eventRegistrationStatus": {
                                    "type": "number",
                                    "example": 404
                                },
                                "eventRegistrationMessage": {
                                    "type": "string",
                                    "example": "There is no such events"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "you don't have permission for team <teamId>"
                    },
                    "409": {
                        "description": "Conflict",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "There are usernames that already exists"
                                },
                                "userNamesTakenAlready": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "example": "romy, billie, harry"
                                    }
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Bad teamId",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "There is no such team with 77d2ccb6-e6e2-4e85-92b2-73bf7c642ada team id"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Missing usernames",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "romy,billie,harry do not Exist In The System, Please Add Them Inside 'usersToCreate' Array"
                                },
                            }
                        }
                    }

                }
            }
        },
        "/api/v1/webhooks/teams/add-users/{externalId}": {
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Add users to team using webhook",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Users Data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "usersToCreate": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Users"
                                    }
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Create Team Success",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Add <number> users to MyTeam team Success"
                                },
                                "leaders": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                    }
                                },
                                "newUsers": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "userName": {
                                                "type": "string"
                                            },
                                            "password": {
                                                "type": "string"
                                            },
                                        }
                                    }
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "you don't have permission for team <teamId>"
                    },
                    "409": {
                        "description": "Conflict",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "There are usernames that already exists"
                                },
                                "userNamesTakenAlready": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "example": "romy, billie, harry"
                                    }
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Bad teamId",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "There is no such team with 77d2ccb6-e6e2-4e85-92b2-73bf7c642ada team id"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Missing usernames",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "romy,billie,harry do not Exist In The System, Please Add Them Inside 'usersToCreate' Array"
                                },
                            }
                        }
                    }

                }
            }
        },
        "/api/v1/webhooks/teams/change-permissions/{externalId}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook team permissions",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update Users permissions",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "externalId": {
                                    "type": "string",
                                },
                                "usersToBeLeaders": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Update <number> Users Permission"
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/events/all": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get All events are available in the system ",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                }
            }
        },
        "/api/v1/webhooks/events/registered/{externalId}": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get all events of team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of Webhooks",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/events/registration/{externalId}": {
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Register new events to a team",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Registration information",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "webhookUrl": {
                                    "type": "string"
                                },
                                "events": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                    }
                                },
                                "authorizationToken": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Events Registration Success"
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "No such events"
                    }
                }
            }
        },
        "/api/v1/webhooks/events/authorization/{externalId}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook authorization token",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "webhookUrl": {
                                    "type": "string"
                                },
                                "authorizationToken": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "201": {
                            "description": "Update Authorization Token Success"
                        },
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/events/url/{externalId}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook url",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "oldWebhookUrl": {
                                    "type": "string"
                                },
                                "newWebhookUrl": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Update Url Success",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/events/logout/{externalId}": {
            "delete": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "logout from webhook events",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Logout Events",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "webhookUrl": {
                                    "type": "string"
                                },
                                "events": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Logout from Events Success"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/access-key/": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get webhook access-key",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Add a webhook access-key",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "entityName": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "accessKey": {
                                    "type": "string"
                                },

                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/access-key/{id}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook access-key",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "updateKey": {
                                    "type": "string"
                                },
                                "entityName": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Delete webhook access-key",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/events/": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get webhook events",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Add a webhook events",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/events/{id}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook events",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Delete webhook events",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/teams/": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get webhook teams",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Add a webhook teams",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "teamId": {
                                    "type": "string"
                                },
                                "authorizationToken": {
                                    "type": "string"
                                },
                                "webhookUrl": {
                                    "type": "string"
                                },
                                "events": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },

                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/teams/{id}": {
            "patch": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Update webhook teams",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "webhookUrl": {
                                    "type": "string"
                                },
                                "authorizationToken": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Delete webhook teams",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/errors/": {
            "get": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Get webhook errors",
                "parameters": [
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string"
                                    },
                                    "webhookId": {
                                        "type": "string"
                                    },
                                    "team": {
                                        "type": "string"
                                    },
                                    "entity": {
                                        "type": "string"
                                    },
                                    "statusCode": {
                                        "type": "number",
                                        "example": 500
                                    },
                                    "message": {
                                        "type": "string"
                                    },
                                    "date": {
                                        "type": "object",
                                    },
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/admin/errors/{id}": {
            "delete": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Delete webhook error",
                "parameters": [
                    {
                        "in": "path",
                        "name": "webhookId",
                        "description": "Id of webhook",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/webhooks/trigger-events/start-challenge/{id}": {
            "post": {
                "tags": [
                    "Webhooks"
                ],
                "summary": "Trigger a webhook user started challenge",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a webhook",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "challengeName": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/submissions/by-user/{challengeId}": {
            "get": {
                "tags": [
                    "Submissions"
                ],
                "summary": "Get user submissions",
                "parameters": [
                    {
                        "in": "path",
                        "name": "submissionId",
                        "description": "Id of Submissions",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Submissions"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/submissions/apply/{challengeId}": {
            "post": {
                "tags": [
                    "Submissions"
                ],
                "summary": "User submit a challenge solution",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Submission Information",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Submissions"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Submissions"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/submissions/{challengeId}": {
            "get": {
                "tags": [
                    "Submissions"
                ],
                "summary": "Get submissions by challenge",
                "parameters": [
                    {
                        "in": "path",
                        "name": "submissionId",
                        "description": "Id of Submissions",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Submissions"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/info": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get user information (only his own)",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user information",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "new user information",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Updated Personal Details Success"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/change-password": {
            "patch": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user password",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "user passwords",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "oldPassword": {
                                    "type": "string"
                                },
                                "newPassword": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Updated Password Success"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Old Password Incorrect"
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "409": {
                        "description": "You should choose new password"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/teacher/{teamId}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get users by team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of team",
                        "required": true,
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
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/Users"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/admin": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get user as admin",
                "parameters": [
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "query",
                        "name": "name",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/admin/{id}": {
            "patch": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id of user",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update user",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Updated Personal Details Success"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/admin-password/{id}": {
            "patch": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user password as admin",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id of user",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update user",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "newPassword": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Updated Password Success"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/permission/{id}": {
            "patch": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user",
                "parameters": [
                    {
                        "in": "path",
                        "name": "userId",
                        "description": "Id of user",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update user",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "permission": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/{id}": {
            "delete": {
                "tags": [
                    "Users"
                ],
                "summary": "Delete user",
                "parameters": [
                    {
                        "in": "query",
                        "name": "hardDelete",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id of user",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/restore/{id}": {
            "put": {
                "tags": [
                    "Users"
                ],
                "summary": "Restore deleted user",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id of user",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "User Restore Successfully"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/users/bind": {
            "put": {
                "tags": [
                    "Users"
                ],
                "summary": "A very dangerous endpoint that bind all users with same email (only for admin)",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update user",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/services/public-repo": {
            "get": {
                "tags": [
                    "Services"
                ],
                "summary": "Check with Github if its a public/exist repository",
                "responses": {
                    "200": {
                        "description": "repository exist and public",
                        "schema": {
                            "type": "string",
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/types/": {
            "get": {
                "tags": [
                    "Types"
                ],
                "summary": "Get the types that support on the system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Types"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/team-submissions/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of users submissions",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Team",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "query",
                        "name": "challenge",
                        "description": "Id of Challenge",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Submissions"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/success-challenge/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of  the top challenges, with the most successful submissions in the team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Team",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "challengeId": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/last-week-submissions/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of last week team submissions count",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Team",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "submissionsCount": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/challenges-submissions/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the team submissions per challenge",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Insights",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "query",
                        "name": "onlyLast",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "challengeId": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/users-submissions/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the team submissions per user",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Insights",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "query",
                        "name": "onlyLast",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "userName": {
                                        "type": "string"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/teacher/top-user/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the users in the team with ordered submissions by date",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "userName": {
                                        "type": "string"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/all-submissions/": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the submissions status(total amount, success, fail, not submitted)",
                "parameters": [
                    {
                        "in": "query",
                        "name": "challenge",
                        "description": "Id of challenge",
                        "required": true,
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "total": {
                                    "type": "number"
                                },
                                "amount": {
                                    "type": "number"
                                },
                                "success": {
                                    "type": "number"
                                },
                                "fail": {
                                    "type": "number"
                                },
                                "not submitted": {
                                    "type": "number"
                                },
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/success-challenge": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the top challenges, with the most successful submissions",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "challengeId": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/last-week-submissions": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of last week submissions count",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "submissionsCount": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/challenges-submissions": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the submissions per challenge",
                "parameters": [
                    {
                        "in": "query",
                        "name": "onlyLast",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "challengeId": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/users-submissions": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the submissions per user",
                "parameters": [
                    {
                        "in": "query",
                        "name": "onlyLast",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "userName": {
                                        "type": "string"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/top-user": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of all the users with ordered submissions by date",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "userName": {
                                        "type": "string"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/top-challenges": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the 5 challenges with most submissions",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "challengeId": {
                                        "type": "number"
                                    },
                                    "submissionsCount": {
                                        "type": "number"
                                    },
                                    "Submissions": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/Submissions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/challenges-type": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight count of challenges from same type('type name' + 'count')",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "number"
                                },
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/challenges-by-reviews": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of top 5 challenges ordered by rating average (from reviews)",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "ratingAVG": {
                                    "type": "number"
                                },
                                "challenge": {
                                    "$ref": "#/definitions/Challenges"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/admin/top": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the 5 teams with the most successful submissions",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "teamName": {
                                    "type": "string"
                                },
                                "teamSuccessSubmissions": {
                                    "type": "number"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/student/top-user/{teamId}": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the 5 users with the most successful submissions",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Team",
                        "required": true,
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
                            "type": "object",
                            "properties": {
                                "userName": {
                                    "type": "string"
                                },
                                "success": {
                                    "type": "number"
                                },
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/student/user-success": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the amount of successful and failed submissions from all submissions",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "CountByUserID": {
                                        "type": "number"
                                    },
                                    "userId": {
                                        "type": "number"
                                    },
                                    "userName": {
                                        "type": "string"
                                    },
                                    "Submissions": {
                                        "$ref": "#/definitions/Submissions"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/student/sub-by-date": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the submissions per day from the last 5 days",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "date": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "CountSubByDate": {
                                        "type": "number"
                                    },
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/student/sub-by-type": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight of the count of submissions with the same challenge type",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string"
                                    },
                                    "CountByType": {
                                        "type": "number"
                                    },
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/insights/student/unsolved-challenges": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get insight count of unsolved challenges",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Submissions"
                            }
                        }
                    }
                },
                "401": {
                    "description": "Access Token Required / Unauthorized"
                },
                "404": {
                    "description": "Not found"
                }
            }
        },
        "/api/v1/insights/mixpanel/": {
            "get": {
                "tags": [
                    "Insights"
                ],
                "summary": "Get mixpanel events insights on the system",
                "parameters": [
                    {
                        "in": "query",
                        "name": "from",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "in": "query",
                        "name": "to",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "in": "query",
                        "name": "event",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "query",
                        "name": "limit",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "number"
                        }
                    },
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": 'object',
                                "properties": {
                                    "$browser": {
                                        "type": "string",
                                    },
                                    "$browser_version": {
                                        "type": "number",
                                    },
                                    "$city": {
                                        "type": "string",
                                    },
                                    "$current_url": {
                                        "type": "string",
                                    },
                                    "$device": {
                                        "type": "string",
                                    },
                                    "$device_id": {
                                        "type": "string",
                                    },
                                    "$initial_referrer": {
                                        "type": "string",
                                    },
                                    "$initial_referring_domain": {
                                        "type": "string",
                                    },
                                    "$insert_id": {
                                        "type": "string",
                                    },
                                    "$lib_version": {
                                        "type": "number",
                                    },
                                    "$mp_api_endpoint": {
                                        "type": "string",
                                    },
                                    "$os": {
                                        "type": "string",
                                    },
                                    "$region": {
                                        "type": "string",
                                    },
                                    "$screen_height": {
                                        "type": "number",
                                    },
                                    "$screen_width": {
                                        "type": "number",
                                    },
                                    "distinct_id": {
                                        "type": "string",
                                    },
                                    "id": {
                                        "type": "string",
                                    },
                                    "mp_country_code": {
                                        "type": "string",
                                    },
                                    "mp_lib": {
                                        "type": "string",
                                    },
                                    "mp_processing_time_ms": {
                                        "type": "number",
                                    },
                                    "time": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/team-name/{teamId}": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get team name",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Teams",
                        "required": true,
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
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "example": ""
                                },
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/team-page/{teamId}": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get users from same team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Teams",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/all-teams-by-user": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get all teams user logged in participates in",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Teams"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/teacher-area/{teamId}": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get team users as leader of team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Teams",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/add-users/{teamId}": {
            "post": {
                "tags": [
                    "Teams"
                ],
                "summary": "Bring back user that was in the team",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a team",
                        "required": true,
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/teams/teacher-permission/{teamId}": {
            "patch": {
                "tags": [
                    "Teams"
                ],
                "summary": "Make users to be Leaders permissions on the team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of team",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update team",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userId": {
                                    "type": "number"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/UsersTeams"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/remove-user/{teamId}": {
            "delete": {
                "tags": [
                    "Teams"
                ],
                "summary": "Remove user from team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of team",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "query",
                        "name": "userId",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/single-team/{teamId}": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get team information",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Teams",
                        "required": true,
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
                            "$ref": "#/definitions/Teams"
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/all-teams": {
            "get": {
                "tags": [
                    "Teams"
                ],
                "summary": "Get all teams as admin",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Teams"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/create-team": {
            "post": {
                "tags": [
                    "Teams"
                ],
                "summary": "Create a team",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Team data",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Teams"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/teams/admin-add-users/{teamId}": {
            "post": {
                "tags": [
                    "Teams"
                ],
                "summary": "Add users to team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Teams",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Users and team data",
                        "required": true,
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            }
        },
        "/api/v1/teams/permission/{teamId}": {
            "patch": {
                "tags": [
                    "Teams"
                ],
                "summary": "Change user permissions on a team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of team",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update team",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userId": {
                                    "type": "number"
                                },
                                "permission": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/UsersTeams"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/teams/remove-team/{id}": {
            "delete": {
                "tags": [
                    "Teams"
                ],
                "summary": "Delete team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of team",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/assignments/{teamId}": {
            "get": {
                "tags": [
                    "Assignments"
                ],
                "summary": "Get all assignments by team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "teamId",
                        "description": "Id of Assignments",
                        "required": true,
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
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Assignments"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Assignments"
                ],
                "summary": "Add new assignment for team",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a assignment",
                        "required": true,
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Uploaded new assignment!"
                                },
                            }
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Assignments"
                ],
                "summary": "Remove assignment from team",
                "parameters": [
                    {
                        "in": "path",
                        "name": "assignmentId",
                        "description": "Id of assignment",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "query",
                        "name": "challengeId",
                        "description": "Data query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/git/": {
            "get": {
                "tags": [
                    "Git Tokens"
                ],
                "summary": "Get all git token are in the system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/GitTokens"
                            }
                        }
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            },
            "post": {
                "tags": [
                    "Git Tokens"
                ],
                "summary": "Add new git token",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add a git",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GitTokens"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    }
                }
            },
            "patch": {
                "tags": [
                    "Git Tokens"
                ],
                "summary": "Update git token",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Update git",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GitTokens"
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Updated",
                        "schema": {
                            "$ref": "#/definitions/GitTokens"
                        }
                    },
                    "400": {
                        "description": "Cannot Process Request"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/v1/git/{token}": {
            "delete": {
                "tags": [
                    "Git Tokens"
                ],
                "summary": "Delete git token",
                "parameters": [
                    {
                        "in": "path",
                        "name": "token",
                        "description": "Id of git",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Deleted"
                    },
                    "401": {
                        "description": "Access Token Required / Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        }
    },
    "definitions": {
        "Assignments": {
            "required": [
                "challenge_id"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "challenge_id": {
                    "type": "integer"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Challenges": {
            "required": [
                "name",
                "Description",
                "type",
                "repository_name",
                "boiler_plate",
                "author_id"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
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
                "repository_name": {
                    "type": "string"
                },
                "boiler_plate": {
                    "type": "string"
                },
                "author_id": {
                    "type": "integer"
                },
                "state": {
                    "type": "enum",
                    "enum": [
                        "pending",
                        "denied",
                        "approved"
                    ]
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "GitTokens": {
            "required": [
                "token",
                "git_account",
                "actions_limit"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "token": {
                    "type": "string"
                },
                "status": {
                    "type": "enum",
                    "enum": [
                        "blocked",
                        "available"
                    ]
                },
                "resets_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "git_account": {
                    "type": "string",
                    "example": "githab123"
                },
                "actions_limit": {
                    "type": "integer",
                    "format": "int64",
                    "example": 5000
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Images": {
            "required": [
                "challenge_id",
                "img"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "challenge_id": {
                    "type": "integer"
                },
                "img": {
                    "type": "long text"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Labels": {
            "required": [
                "name"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "LabelsToChallenges": {
            "required": [
                "label_id",
                "challenge_id"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "label_id": {
                    "type": "integer"
                },
                "challenge_id": {
                    "type": "integer"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "RefreshTokens": {
            "required": [
                "user_name",
                "token"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "user_name": {
                    "type": "string"
                },
                "token": {
                    "type": "text"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Reviews": {
            "required": [
                "user_id",
                "challenge_id",
                "rating"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "user_id": {
                    "type": "integer"
                },
                "challenge_id": {
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
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Submissions": {
            "required": [
                "challenge_id",
                "user_id",
                "solution_repository"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "challenge_id": {
                    "type": "integer"
                },
                "user_id": {
                    "type": "integer"
                },
                "state": {
                    "type": "enum",
                    "enum": [
                        "SUCCESS",
                        "FAIL",
                        "PENDING"
                    ]
                },
                "solution_repository": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Teams": {
            "required": [
                "name",
                "external_id",
                "creator"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "name": {
                    "type": "string"
                },
                "external_id": {
                    "type": "string",
                    "format": "uuid"
                },
                "creator": {
                    "type": "integer"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "UsersTeams": {
            "required": [
                "team_id",
                "user_id",
                "permission"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "uniqueItems": true
                },
                "team_id": {
                    "type": "integer"
                },
                "userId": {
                    "type": "integer"
                },
                "permission": {
                    "type": "enum",
                    "enum": [
                        "teacher",
                        "student"
                    ]
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "updated_at": {
                    "type": "string",
                    "format": "date-time"
                },
                "deleted_at": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "Users": {
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
        "Login": {
            "properties": {
                "userName": {
                    "type": "string"
                },
                "isAdmin": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
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
