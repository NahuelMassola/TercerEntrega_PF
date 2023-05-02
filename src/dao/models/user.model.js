const mongoose = require('mongoose');
const userCollection = ('users')

const roleType = {
  PUBLIC: "PUBLIC",
  USER: "USER",
  ADMIN: "ADMIN",
}

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type:Number,
      require:true,
    },
    cart: [
        {
          type:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"carts"            
          }
        },
    ], 
    rol:{
      type: String,
      enum: Object.values(roleType)
    },
    
  });
  
  const userModel = mongoose.model(userCollection, userSchema);
  module.exports = userModel;