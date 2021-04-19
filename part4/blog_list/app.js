const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const tokenExtractor = require("./middlewares/auth").tokenExtractor;
const errorHandler = require("./middlewares/error");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error.message);
  });

app.use(cors());
app.use(express.json());

// middleware
app.use(tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);

// middleware
app.use(errorHandler);

module.exports = app;
