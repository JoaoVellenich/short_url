import request from "supertest";
import { app } from "../app";

beforeAll(async () => {
  await request(app).post("/api/users/create").send({
    email: `teste@jest.com`,
    password: "123",
  });
  await request(app).post("/api/users/create").send({
    email: `teste2@jest.com`,
    password: "123",
  });
  const token = await loginUser();
  await request(app)
    .get("/api/url/short")
    .set("Authorization", "bearer " + token)
    .send({
      url: "https://URLTESTE.com.br",
    });
});

describe("GET /api/url/{id}", () => {
  test("Passing wrong id", async () => {
    // should response url not found
    // should response status code 404
    const response = await request(app).get("/api/url/30");
    expect(response.statusCode).toBe(404);
    expect(response.body.shortenedUrl).toBeUndefined();
    expect(response.body.originalUrl).toBeUndefined();
    expect(response.body.clickCount).toBeUndefined();
  });

  test("Passing right id", async () => {
    // should response url not found
    // should response status code 404
    const response = await request(app).get("/api/url/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.shortenedUrl).toBeDefined();
    expect(response.body.originalUrl).toBeDefined();
    expect(response.body.clickCount).toBeDefined();
  });
});

describe("GET /api/url/list", () => {
  test("Without authorization", async () => {
    const response = await request(app).get("/api/url/list");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });
  test("With wrong authorization", async () => {
    const response = await request(app)
      .get("/api/url/list")
      .set("Authorization", "bearer token");
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBeDefined();
  });
  test("With right authorization and having url", async () => {
    const token = await loginUser();

    const response = await request(app)
      .get("/api/url/list")
      .set("Authorization", "bearer " + token);
    expect(response.statusCode).toBe(200);
    expect(response.body.urls).toBeDefined();
  });
  test("With right authorization but no url", async () => {
    const authResponse = await request(app).post("/api/users/login").send({
      email: "teste2@jest.com",
      password: "123",
    });

    const response = await request(app)
      .get("/api/url/list")
      .set("Authorization", "bearer " + authResponse.body.token);
    expect(response.statusCode).toBe(200);
    expect(response.body.urls).toBeUndefined();
  });
});

describe("POST /api/url/short", () => {
  test("Short URL without user", async () => {
    const response = await request(app)
      .post("/api/url/short")
      .send({
        url: "https://teddydigital.io/" + new Date().getTime(),
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.shortedUrl).toBeDefined();
    expect(response.body.id).toBeDefined();
  });
  test("Short URL with user", async () => {
    const token = await loginUser();
    const date = new Date();
    const response = await request(app)
      .post("/api/url/short")
      .set("Authorization", "bearer " + token)
      .send({
        url: `https://teddydigital.io/${date.getTime()}`,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.shortedUrl).toBeDefined();
    expect(response.body.id).toBeDefined();
  });
});

async function loginUser() {
  const response = await request(app).post("/api/users/login").send({
    email: "teste@jest.com",
    password: "123",
  });
  return response.body.token;
}
