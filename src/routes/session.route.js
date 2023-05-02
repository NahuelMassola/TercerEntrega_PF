const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const { REGISTER_STRATEGY, LOGIN_STRATEGY} = require('../config/config')
const handlePolicies = require('../middleware/handle-policies')
const router = Router()

// login
router.post('/login',passport.authenticate(LOGIN_STRATEGY,{session:false}), sessionController.sessionLogin)

// Register
router.post('/register', passport.authenticate(REGISTER_STRATEGY,{session:false}) , sessionController.loginRegister)

// Current

router.get('/current', handlePolicies(["PUBLIC" , "ADMIN"]) , sessionController.getCurrent)



//Github
router.get('/github', passport.authenticate("github" , {scope: ["user:email"]}), async (req , res ) => {});
router.get('/github/callback' , passport.authenticate("github" , {failureRedirect: "/login"}), sessionController.github);

module.exports = router;