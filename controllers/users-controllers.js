const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let USERS = require("../data").DUMMY_USERS;

exports.getUser = (req, res, next) => {
  res.json({ user: USERS });
};

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  const hasUser = USERS.find((user) => user.email === email);
  if (hasUser) {
    throw new HttpError("This email already exists", 422);
  }

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };

  USERS.push(newUser);
  res.status(201).json({ user: newUser, message: "New user created" });
};

// exports.login = (req, res, next) => {
// //   res.json({ user: USERS });
// };
