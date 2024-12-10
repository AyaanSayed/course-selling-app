const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const adminMiddleware = require("adminMiddleware")

adminRouter.post("/signup", async function(req, res){
  const {email, password, firstName,lastName } = req.body;

  await adminModel.create({
    email,
    password,
    firstName,
    lastName
  })

  res.json({
    message : "you have signed up"
  })
})

adminRouter.post("/signin", async function(req, res){
  const {email, password} = req.body;

  const admin = await adminModel.findOne({
    email : email,
    password: password
  })

  if (admin){
    const token = jwt.sign({
      id: admin._id,
    }, JWT_ADMIN_PASSWORD)

    res.json({
      token: token
    })
  } else {
    res.status(403).json({
      message: "incorrect credentials"
    })
  }
})

adminRouter.post("/course", adminMiddleware, function(req, res){
  const adminId = req.adminId;
  const {title, description, price, imageUrl} = req.body;
  const course = courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId
  })

  res.json({
    message: "course created",
    courseId: course._id
  })
})

adminRouter.put("/course", adminMiddleware, function(req, res){
  const adminId = req.adminId;

  

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
  adminRouter: adminRouter
}
