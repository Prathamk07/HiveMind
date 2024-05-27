const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const cookies = require('cookie-parser')
const router = express.Router();

router.use(cookies())

let userToken = ''
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.get('/profile',(req,res,next)=>{
 
  console.log('usertoken : ',userToken)
  decryptedToken=jwt.verify(userToken,"secret_this_should_be_longer",(err,userData)=>{
    if (err) throw err

    res.json({message: "User Fetched",
      user:userData
    })
  })
})  

 
router.post("/login", (req, res, next) => {
  let fetchedUser;
  //mach email with signin time email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        //user is not exist
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      //compiar password hash to signin time password hash
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      userToken = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id },"secret_this_should_be_longer");
      console.log(userToken);
      res.cookie('cookie',userToken)
      res.status(200).json({
        token: userToken,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
