import express from "express";
import User from '../model/User';
import {
    check,
    validationResult
} from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config'

const users = express.Router();
//@route    POST api/users
//@desc     Get logged in user
//@@access  Public
users.post("/", [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', "Please enter password").isLength({
        min: 6
    })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()})
    }
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({msg:'User already exist'})
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            email,
            name,
            password: await bcrypt.hash(password, salt)
        })
        await user.save();
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
    } catch (e) {
        res.status(500)
    }
});

export default users;
