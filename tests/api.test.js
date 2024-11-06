import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { baseUrl, userId, user, password } from "../helpers/data.js";

let token_response;
describe("Api tests", () => {
  it.skip("get request", async () => {
    const response = await spec().get(`${baseUrl}/BookStore/v1/Books`);
    const responseB = JSON.stringify(response.body);
    expect(response.statusCode).to.eql(200);
    expect(responseB).to.include("Learning JavaScript Design Patterns");
    expect(responseB).to.include("You Don't Know JS");
    expect(responseB).to.include("Kyle Simpson");
  });

  it.skip("Create a user", async () => {
    const response = await spec().post(`${baseUrl}/Account/v1/User`).withBody({
      userName: user,
      password: password,
    });
    expect(response.statusCode).to.eql(201);
  });

  it.only("Generate token", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    console.log(token_response);
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  it.skip("Add new book", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books`)
      .withBearerToken(token_response)
      .withBody({
        userId: userId,
        collectionOfIsbns: [
          {
            isbn: "9781449331818",
          },
        ],
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it.only("Check books in user", async () => {
    const response = await spec().get(`${baseUrl}/Account/v1/User/${userId}`)
    .inspect()
    .withBearerToken(token_response);
    expect(response.statusCode).to.eql(200)
  });
});
//   it.only("Delete book", async () => {
//     const response = await spec()
//       .delete(`${baseUrl}/BookStore/v1/Book`)
//       .withBearerToken(token_response)
//       .withBody({
//         isbn: "9781449331818",
//         userId: userId,
//       })
//       .inspect();
//     expect(response.statusCode).to.eql(204);
//   });
