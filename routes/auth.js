import express from "express";

const auth = express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@@access  Private
auth.get("/", (req, res) => {
  res.send(" Get Auth");
});

//@route    POST api/auth
//@desc     Auth  user & get token 
//@@access  Public
auth.post("/", (req, res) => {
  res.send("Auth  user & get token ");
});

export default auth;
