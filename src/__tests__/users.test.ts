import request from "supertest";
import { app } from "../app";

describe("POST /api/users/create", () => {
  test("Creating with wrong email format", async () => {
    const response = await request(app).post("/api/users/create").send({
      email: "tesate.com.br",
      password: "123",
    });
    expect(response.status).toBe(400);
  });

  test("Creating a user that already exists", async () => {
    const response = await request(app).post("/api/users/create").send({
      email: "teste@teste.com.br",
      password: "123",
    });
    expect(response.status).toBe(401);
  });

  test("Creating a user", async () => {
    const date = new Date();
    const response = await request(app)
      .post("/api/users/create")
      .send({
        email: `${date.getTime()}@jest.com`,
        password: "123",
      });
    expect(response.status).toBe(204);
  });
});

describe("POST /api/users/login", () => {
  test("Login with wrong email format", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "tesate.com.br",
      password: "123",
    });
    expect(response.status).toBe(401);
    expect(response.body.token).toBeUndefined();
  });

  test("Login with right credentials", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "teste@teste.com.br",
      password: "123",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("Login with wrong credentials", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "teste@teste.com.br",
      password: "1243",
    });
    expect(response.status).toBe(400);
    expect(response.body.token).toBeUndefined();
  });

  test("User does not exists", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "Errado@teste.com.br",
      password: "123",
    });
    expect(response.status).toBe(404);
    expect(response.body.token).toBeUndefined();
  });
});
