import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config';
import { baseUrl, userId } from "../helpers/data.js";

describe("Api tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get(`${baseUrl}/BookStore/v1/Books`)
    const responseB = JSON.stringify(response.body);
    expect(response.statusCode).to.eql(200);
    expect(responseB).to.include("Learning JavaScript Design Patterns");
    expect(responseB).to.include("You Don't Know JS");
    expect(responseB).to.include("Kyle Simpson");
  });

  it.skip("Create a user", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/User`)
      .withBody({
        userName: "AsiaTestWarez2024",
        password: process.env.SECRET_PASSWORD,
      })
    expect(response.statusCode).to.eql(201);
  });
});
