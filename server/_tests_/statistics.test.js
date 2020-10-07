const request = require("supertest");
const app = require("../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const {
  Patients,
  CovidTests,
  Symptoms,
  SymptomsByPatients,
  Cities,
  Hospitals,
} = require("../models");

//mock data
const patientsMock = require("./mockData/patientMock");
const covidTestMock = require("./mockData/covidTestMock");
const citiesMock = require("./mockData/citiesMock");
const symptomMock = require("./mockData/symptomsMock");
const SymptomsByPatientsMock = require("./mockData/symptomsByPatientMock");
const hospitalsMock = require("./mockData/hospitalsMock");
const updateCity = {name: "Zihron Yakov" , population: 1};

describe("Cities api tests", () => {
    beforeAll(async () => {
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);
      await Patients.destroy({ truncate: true, force: true });
      await CovidTests.destroy({ truncate: true, force: true });
      await Symptoms.destroy({ truncate: true, force: true });
      await SymptomsByPatients.destroy({ truncate: true, force: true });
      await Cities.destroy({ truncate: true, force: true });
      await Hospitals.destroy({ truncate: true, force: true }); 
      const patientsResult = await Patients.bulkCreate(patientsMock);
      expect(patientsResult.length).toBe(5);
  
      const covidTestResult = await CovidTests.bulkCreate(covidTestMock);
      expect(covidTestResult.length).toBe(5);
  
      const citiesResult = await Cities.bulkCreate(citiesMock);
      expect(citiesResult.length).toBe(2);
  
      const symptomsResult = await Symptoms.bulkCreate(symptomMock);
      expect(symptomsResult.length).toBe(3);
  
      const symptomsByPatientsResult = await SymptomsByPatients.bulkCreate(
        SymptomsByPatientsMock
      );
      expect(symptomsByPatientsResult.length).toBe(5);
  
      const hospitalsResult = await Hospitals.bulkCreate(hospitalsMock);
      expect(hospitalsResult.length).toBe(2);
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it("Can get all cities", async () => {
        const { body } = await request(app).get("/api/v1/cities").expect(200);
    
        expect(body.length).toBe(2);
      });
    it("Can get a city by id with the number of patients from that city", async () => {
      const { body } = await request(app).get("/api/v1/cities/byId/2").expect(200);
  
      expect(body.name).toBe(citiesMock[1].name);
      expect(body.Patients.length).toBe(3);
      expect(body.Patients[0].name).toBe(patientsMock[0].name);
      expect(body.Patients[1].name).toBe(patientsMock[3].name);
      expect(body.Patients[2].name).toBe(patientsMock[4].name);
    });
    it("Can get the most sick city", async () => {
      const { body } = await request(app).get("/api/v1/cities/mostsick").expect(200);
      
      expect(body[0].name).toBe(citiesMock[1].name);
      expect(body[0].Patients.length).toBe(3);
      expect(body[0].Patients[0].name).toBe(patientsMock[0].name);
      expect(body[0].Patients[1].name).toBe(patientsMock[3].name);
      expect(body[0].Patients[2].name).toBe(patientsMock[4].name);
    });

    it("Can update a cities name and population", async () => {
        await request(app).put("/api/v1/cities/1").send(updateCity).expect(200);
        const { body } = await request(app).get("/api/v1/cities/byId/1");
        expect(body.name).toBe(updateCity.name);
        expect(body.population).toBe(1);
    });

    it("Can delete a city by id", async () => {
        await request(app).delete("/api/v1/cities/1");
        const { body } = await request(app).get("/api/v1/cities");
        expect(body.length).toBe(1);
    });
  });
  