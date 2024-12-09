const express = require("express");
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const app = express();
const mongoose = require('mongoose')

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function  main(){
  await mongoose.connect("mongodb+srv://admin:%40Sayedayyu1234@cluster0.mqwi7.mongodb.net/");
  app.listen(3000);
  console.log('listening on port 3000');
  
}
main();
