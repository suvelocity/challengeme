const request = require("supertest");
const app = require("../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge } = require("../models");

//mock data

describe("Cities api tests", () => {
    beforeAll(async () => {
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);
      
    });
  
    afterAll(async () => {
      app.close();
    });
  


  });
  