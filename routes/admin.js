const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db")

adminRouter.post("/signup", function(req, res){
  
})

adminRouter.post("/signin", function(req, res){

})

adminRouter.post("/", function(req, res){

})

adminRouter.put("/", function(req, res){

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
  adminRouter: adminRouter
}