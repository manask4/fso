const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Manas Khatua",
    url: "https://www.google.co.in",
    likes: 5,
  },
  {
    title: "Javascript is awesome",
    author: "Dan Abramov",
    url: "https://www.google.co.in",
    likes: 25,
  },
];

const user = {
  name: "FSO Tester",
  username: "fsotest",
  password: "mernstack",
};

beforeAll(async () => {
  await api.post("/api/users").send(user);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findOne({ username: "fsotest" });
  const blogObjects = initialBlogs.map(
    (blogItem) => new Blog({ ...blogItem, user: user.id })
  );
  const blogPromises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(blogPromises);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier of blog is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("creates a blog successfully", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;

  const blog = {
    title: "A few short stories",
    author: "Morgan Housel",
    url: "https://www.collaborativefund.com/blog/a-few-short-stories/",
    likes: 100,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(blog.title);
});

test("401 Unauthorized if token is not provided for creating a blog", async () => {
  const blog = {
    title: "Too much, too soon, too fast",
    author: "Morgan Housel",
    url: "https://www.collaborativefund.com/blog/",
  };
  await api.post("/api/blogs").send(blog).expect(401);
});

test("likes property to be set to 0 if not provided", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;

  const blog = {
    title: "Too much, too soon, too fast",
    author: "Morgan Housel",
    url: "https://www.collaborativefund.com/blog/",
  };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test("get 400 Bad Request if url or title is missing", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;

  const blog = {
    title: "Mental Models",
    author: "Shane Parish",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(400);
});

test("delete a blog successfully", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;
  const userId = loggedInUser.body.id;

  const response = await api.get("/api/blogs");
  const blog = response.body.filter(
    (r) => r.user.id.toString() === userId.toString()
  )[0];
  await api
    .delete(`/api/blogs/${blog.id}`)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(204);

  const responseAfterDelete = await api.get("/api/blogs");
  expect(responseAfterDelete.body).toHaveLength(initialBlogs.length - 1);
});

test("update likes in a blog post successfully", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((r) => r.id);
  const payload = { likes: 2 };
  const updatedBlog = await api
    .put(`/api/blogs/${ids[0]}`)
    .send(payload)
    .expect(200);
  expect(updatedBlog.body.likes).toBe(2);
});

afterAll(() => {
  mongoose.connection.close();
});
