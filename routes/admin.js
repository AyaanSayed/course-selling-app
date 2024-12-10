const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const {adminMiddleware} = require("../middleware/admin");

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

adminRouter.post("/course", adminMiddleware, async function(req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
      title: title, 
      description: description, 
      imageUrl: imageUrl, 
      price: price, 
      creatorId: adminId
  })

  res.json({
      message: "Course created",
      courseId: course._id
  })
})
/*
 "title": "how to make paneer", 
 "description": "we will learn how to make paneer", 
 "imageUrl": "image.png", 
 "price": 600,
 "courseId": "675884440b2285e5dd9b5a98" 
*/

adminRouter.put("/course", adminMiddleware, async function(req, res){
  const {title, description, price, imageUrl, courseId} = req.body
  const adminId = req.adminId;

  const course = await courseModel.updateOne({
    _id : courseId,
    creatorId : adminId
  }, {
    title: title, 
    description: description, 
    imageUrl: imageUrl, 
    price: price
  })

  res.json({
    message: "course updated",
    courseId: course._id
  })

})

adminRouter.get("/course/bulk",adminMiddleware, async function(req, res){
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId
  })

  res.json({
    courses: courses
  })

})

module.exports = {
  adminRouter: adminRouter
}
