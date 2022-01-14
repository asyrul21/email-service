process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const server = require("../server");
const {
  assertInternalError,
  isSuccessData,
  shouldBeAnErrorObject,
} = require("./testUtils");

describe("Email Routes", () => {
  before(function () {
    //
  });

  describe("POST /api/email => Send Emails", async function () {
    beforeEach(() => {});

    it("should return error when one of body parameters is missing", async () => {
      const result = await chai.request(server).post("/api/email/").send({});

      assertInternalError(result);

      result.should.have.status(400);
      result.should.be.json;
      const data = { ...result.body };
      shouldBeAnErrorObject(data);
    });

    it("should be successful when all parameters are given", async () => {
      const result = await chai.request(server).post("/api/email/").send({
        sender: "exampleSender@mail.com",
        recipient: "exampleRecipient@mail.com",
        subject: "Test Email Service Works ✔",
        message:
          "<b>Hello world!</b><br>This is our first message sent with Nodemailer",
      });

      assertInternalError(result);

      result.should.have.status(200);
      result.should.be.json;
      const data = { ...result.body };
      isSuccessData(data);
      data.status.should.equal("queued");
    });
  });
});
