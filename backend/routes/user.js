const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserToken=require('../models/UserToken')
const User = require("../models/user");
const cookies = require('cookie-parser')
const router = express.Router();
const nodemailer=require('nodemailer')

router.use(cookies())
let resetToken=''
let userToken = ''
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username : req.body.username,
      dob : req.body.dob,
      fullname : req.body.fullname,
      emailverified : req.body.emailverified
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

router.get('/profile/:username?',async (req,res,next)=>{
  const username=req.params.username
  if(username){

    console.log('username : ',username)
    const user=await User.findOne({username})
    const userData = {
      id : user.id,
      email : user.email,
      username : user.username,
      dob : user.dob,
      fullname : user.fullname,
      emailverified : user.emailverified
    }
    res.status(200).json({message : 'Fetched User Profile', user : userData})
  }
  else{

    decryptedToken=jwt.verify(userToken,"secret_this_should_be_longer",(err,userData)=>{
      if (err) throw err
      console.log("User fetched" , userData)
      res.json({message: "User Fetched",
        user:userData
      })
    })
  }
})    

router.post('/forgotpassword',async (req,res,next)=>{
  const email = req.body.email;
  const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
  if (!user)
  {
      return next(CreateError(404, "User not found to rest the email!"))
  }
  const payload = {
      email: user.email
  }
  const expiryTime = 300;
  const token = jwt.sign(payload, 'this_is_secret_key', { expiresIn: expiryTime });
  resetToken=token
  const newToken = new UserToken({
      userId: user._id,
      token: token
  });

  const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: 'lunatieempire418@gmail.com',
          pass: 'cxdd mvwf kyvr lkag'
      }
  });
  let mailDetails = {
      from: "your email",
      to: email,
      subject: "Reset Password!",
      html: `

<h1>Password Reset Request</h1>
<p>Dear ${user.username},</p>
<p>We have received a request to reset your password for your account with BookMYBook. To complete the password reset process, please click on the button below:</p>
<a href=http://localhost:4200/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none;
   cursor: pointer; border-radius: 4px;">Reset Password</button></a>
<p>Please note that this link is only valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
<p>Thank you,</p>
<p>Let's Program Team</p>

`,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) =>
  {
      if (err)
      {
          throw err
          // return next(CreateError(500, "Something went wrong while sending the email"))
      } else
      {
          await newToken.save();
          // return next(CreateSuccess(200, "Email Sent Successfully!"))
          res.status(200).json(token)
      }
  })
})
 
router.put('/reset/:token',async(req,res,next)=>{
  const token=req.params.token
  const password=req.body.password;
  console.log(token)
  jwt.verify(token,'this_is_secret_key',async(err,data)=>{
    if (err) throw err
    const user = await User.findOne({ email: { $regex: '^' + data.email + '$', $options: 'i' } });
    if (!user)
    {
        res.status(404).json("User not found to rest the email!")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
            user.password = encryptedPassword;
            try
            {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true }
              )
              console.log(updatedUser)
              res.status(200).json('Password reset successfull')
            } catch (error)
            { 
              throw error
              // res.status(500).json(error)
            }
          })

}
)
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
      userToken = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id ,fullname : fetchedUser.fullname,dob : fetchedUser.dob,username:fetchedUser.username,emailverified:fetchedUser.emailverified},"secret_this_should_be_longer");
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
