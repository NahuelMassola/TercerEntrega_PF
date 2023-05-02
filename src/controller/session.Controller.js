const DtoUser = require("../dao/DTOs/dtoUser")
const BdProductManager = require("../dao/mongoManager/BdProductManager")
const { COOKIE_USER } = require("../config/config")


const sessionLogin = async (req,res)=>{
    res
    .cookie(COOKIE_USER, req.user.token, { maxAge: 300000, httpOnly: true })
    .send( req.user )
}

const loginRegister = async (req,res)=>{
    res.send(req.user) 
}  
const getCurrent = async (req,res)=>{
    newUser = DtoUser(req.user)
    res.send(req.user) 
}  

const github = async(req, res) =>{
    try {
        const products = await BdProductManager.getProduct();
        req.user.rol = "USER"
        res.render("viewProduct", {
            products: products,
            firstName: req.user.firstName,
            rol: req.user.rol
            });
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    sessionLogin,
    loginRegister,
    getCurrent,
    github
}