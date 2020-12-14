import express from "express";

const users = express.Router();
//@route    POST api/users
//@desc     Get logged in user
//@@access  Public
users.post("/", (req, res) => {
  res.send("Auth");
});

export default users;
