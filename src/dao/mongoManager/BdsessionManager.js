const userModel = require ('../models/user.model')

class BdsessionManager {
  getSession = async (email, password) => {
    return await userModel.findOne({email, password});
  }

  getEmail = async (email) => {
    return await userModel.findOne(email);
  }
  
  createUser = async (user)=>{
      const { firstName,lastName, email, age, password,rol ,cart} = user
      return await userModel.create({firstName , lastName, email, age, password, rol , cart })
  }

  getUserId = async (id) => {
    return await userModel.findById({ id})
  }
}

module.exports = new BdsessionManager