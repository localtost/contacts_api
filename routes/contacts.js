import express from "express";

const contacts = express.Router();
//@route    POST api/contacts
//@desc     Send post data
//@@access  Private
contacts.post("/", (req, res) => {
  res.send("Send post data");
});
//@route    GET api/contacts
//@desc     Get post data
//@@access  Private
contacts.get("/", (req, res) => {
  res.send("Get post data");
});
//@route    PUT api/contacts/:id
//@desc     Change post data by id
//@@access  Private
contacts.put("/:id", (req, res) => {
  res.send("Change post data by id");
});
//@route    DELETE api/contacts/:id
//@desc     Delete post data by id
//@@access  Private
contacts.delete("/:id", (req, res) => {
  res.send("Delete post  data by id");
});

export default contacts;