import express from "express";
import {
  check,
  validationResult
} from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../model/User';
import middleware from '../middleware/auth'

const auth = express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@@access  Private
auth.get("/", middleware, async (req, res) => {
   try {
     const  user = await User.findById(req.user).select('-password');
     res.json(user)
   }catch (e) {
        res.status(500).send("Server Error")
   }
});

//@route    POST api/auth
//@desc     Auth  user & get token
//@@access  Public
auth.post("/", [
    check('email','Email is required').isEmail(),
    check('password','Password is required' ).not().isEmpty()
], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({errors: error.array()})
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if(!user) {
      return  res.status(400).json({msg:"Invalid Credential"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
      return  res.status(400).json({msg:"Invalid Credential"})
    }
    jwt.sign({
      user: {
        user : user.id
      }
    },config.get('jwtSecret'),{
      expiresIn: 360000
    },(err,token)=>{
      if(err) throw err;
      res.json({token})
    })
  }catch (error){

  }
});

export default auth;
