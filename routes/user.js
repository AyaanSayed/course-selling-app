const { Router } = require("express")

const userRouter = Router()

userRouter.post("/user/signup", function(req, res){
  
})

userRouter.post("/user/signin", function(req, res){

})

userRouter.post("/user/purchases", function(req, res){

})

module.exports = {
  userRouter: userRouter
}