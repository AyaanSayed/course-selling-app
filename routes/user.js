const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router()
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");

userRouter.post("/signup", async function(req, res){
  const {email, password, firstName,lastName } = req.body;

  await userModel.create({
    email,
    password,
    firstName,
    lastName
  })

  res.json({
    message : "you have signed up"
  })
})

userRouter.post("/signin", async function(req, res){
  const {email, password} = req.body;

  const user = await userModel.findOne({
    email : email,
    password: password
  })

  if (user){
    const token = jwt.sign({
      id: user._id,
    }, JWT_USER_PASSWORD)

    res.json({
      token: token
    })
  } else {
    res.status(403).json({
      message: "incorrect credentials"
    })
  }

})

userRouter.post("/purchases", function(req, res){

})

module.exports = {
  userRouter: userRouter
}