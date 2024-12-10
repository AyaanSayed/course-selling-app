const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL);

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String 
})

const adminSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String 
})

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  creatorId: ObjectId,
  imageUrl: String 
})
const purchaseSchema = new Schema({
  cousreId: ObjectId,
  userId: ObjectId
})

const userModel =  mongoose.model("user", userSchema)
const adminModel =  mongoose.model("admin", adminSchema)
const courseModel =  mongoose.model("course", courseSchema)
const purchaseModel =  mongoose.model("purchase", purchaseSchema)

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}