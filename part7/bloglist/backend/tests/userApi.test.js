const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const initialUsers = [
  {
    name: "Manas Khatua",
    username: "mkhatua",
    password: "TesT12345",
  },
  {
    name: "Rahul Solanki",
    username: "rsolanki",
    password: "football123",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map((userItem) => new User(userItem));
  const userPromises = userObjects.map((userObject) => userObject.save());
  await Promise.all(userPromises);
});

test("list of users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of users are returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);
});

describe("for a single user", () => {
  test("create a new user successfully", async () => {
    const user = {
      name: "Shovan Maity",
      username: "smaity",
      password: "chickenchilly",
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(initialUsers.length + 1);
  });

  test("username length should be at least 3 chars", async () => {
    const user = {
      name: "Shovan Maity",
      username: "sm",
      password: "chickenchilly",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("password length should be at least 3 chars", async () => {
    const user = {
      name: "Shovan Maity",
      username: "smaity",
      password: "c1",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("username must be unique", async () => {
    const user = {
      name: "Shovan Maity",
      username: "rsolanki",
      password: "c1jhd734",
    };
    await api.post("/api/users").send(user).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
