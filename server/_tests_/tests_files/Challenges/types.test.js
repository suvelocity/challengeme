const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../../app");

const mockUser = require("../../mocks/users");

function generateToken(currentUser) {
    const infoForCookie = {
        userId: currentUser.id,
        userName: currentUser.userName,
    };
    return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "900s",
    });
}

describe("testing types endpoints", () => {

    test("Can get all github types", async (done) => {
        const response = await request(app)
            .get("/api/v1/types")
            .set("authorization", `bearer ${generateToken(mockUser[0])}`);
        expect(response.body.length).toBe(6);
        expect(response.status).toBe(200);
        done();
    });

});