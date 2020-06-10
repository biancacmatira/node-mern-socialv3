const HttpError = require("../models/http-error");
// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const User = require("../models/user");
// let USERS = require("../data").DUMMY_USERS;

exports.getUser = async (req, res, next) => {
  let users;
  try {
    // add all field names except password
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetching users failed, please try again", 500));
  }
  res.json({ users: users });
};

exports.signup = async (req, res, next) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    //   return next(new HttpError(errs.array()[0].msg, 422));
    return next(new HttpError(errs.array()[0].msg, 422));
  }

  const { username, email, password } = req.body;

  //     const hasUser = USERS.find((user) => user.email === email);
  //     if (hasUser) {
  //       throw new HttpError("This email already exists", 422);
  //     }

  //   const newUser = {
  //     id: uuidv4(),
  //     username,
  //     email,
  //     password,
  //   };

  //   USERS.push(newUser);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Sign up failed", 500));
  }

  if (existingUser) {
    return next(new HttpError("Email already exists", 422));
  }

  const newUser = new User({
    username,
    email,
    imageUrl:
      "https://images.unsplash.com/photo-1591622778011-fbef25c297ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Email already exists", 422));
  }

  res.status(201).json({ user: newUser, message: "New user created" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //   const identifiedUser = USERS.find((user) => user.email === email);

  //   if (!identifiedUser || identifiedUser.password !== password) {
  //     throw new HttpError("Incorrect email/password", 401);
  //   }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Login failed", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Incorrect email/password", 401));
  }

  res
    .status(200)
    .json({ message: "Successfully logged in", userProp: existingUser });
};
