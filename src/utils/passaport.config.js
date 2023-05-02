const passport = require("passport");
const passportLocal = require("passport-local");
const BdsessionManager = require("../dao/mongoManager/BdsessionManager");
const GithubStrategy = require('passport-github2');
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY, PRIVATE_KEY_JWT, COOKIE_USER } = require("../config/config");
const { hashPassword, comparePassword } = require("./hashPassword");
const {Strategy, ExtractJwt } = require('passport-jwt');
const { generateToken } = require("./jwt");
const userModel = require("../dao/models/user.model");
const userModelGithub = require("../dao/models/user.modelGithub");

const GITHUB_CLIENT_ID = "290c52ff9d584eb6d62a";
const GITHUB_CLIENT_SECRET = "93c4872e5fe4f1ccc3aa917dc2974100605853a6";


const cookieEstractor = (req) =>{
    let token = null;
    if(req && req.cookies) {
    token = req.cookies[COOKIE_USER]
  }
    return token;
} 


const initPassaport = () => {

passport.use(
  JWT_STRATEGY, new Strategy ({
      jwtFromRequest:ExtractJwt.fromExtractors([cookieEstractor]),
      secretOrKey: PRIVATE_KEY_JWT
}, async(jwt_payload, done) => {
    try {
          const {payload} = jwt_payload
          const user = await userModel.findById(payload.id);
          delete user._doc.password &&
          done (null, {user:user._doc})
    } catch (error) {
      done(error)
    }
})
);


  passport.use(
    REGISTER_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
          const { firstName, lastName, age } = req.body;
        try {
            const exitEmail = await BdsessionManager.getEmail({email:username});
            if (exitEmail) {
              done('register Error', false,{message:"Usuario Existente con ese Emial"} );
            } else {
              const hash = await hashPassword(password);
              if (username === "adminCoder@coder.com") {
                const user = await BdsessionManager.createUser({
                  firstName: firstName,
                  lastName: lastName,
                  age:age,
                  email: username,
                  password: hash,
                  rol: "ADMIN",
                });
                done(null, user);
              } else {
                const user = await BdsessionManager.createUser({
                  firstName: firstName,
                  lastName: lastName,
                  age:age,
                  email: username,
                  password: hash,
                  rol:"USER"
                });  
                done(null, user);
              }
            }
        } catch (error) {
            done(error)
        }
      }
    )
  );


  passport.use(
    LOGIN_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
        try {
          const user = await BdsessionManager.getEmail({email:username})
          const isVadidPassword = await comparePassword(password, user.password)
          if (user && isVadidPassword) {
            const token = generateToken({id:user.id, rol:user.rol})
            if (token) {
              done(null, {token:token})
            } else{
              done(null, false); 
            }
          }else{
            done(null, false);  
          }
        } catch (error) {
          done(null, false);
        }
      }
    )
  );
  

  passport.use(
    "github",
    new GithubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackUrl: "http://localhost:8080/api/session/github/callback",
    },
    async (accessToken , refreshToken , profile , done) => {
        try {
        let user = await userModelGithub.findOne({ email: profile._json?.email});
        if(!user){
            let addNewUser = {
                firstName: profile._json.name,
                email: profile._json?.email,
                password: ""
            };
            let newUser = await userModelGithub.create(addNewUser);
            
            done(null , newUser);
        } else {
            done(null ,user);
        }
        } catch (error) {
            return done(error);
        }
    } 
    )
);

passport.serializeUser((user , done) =>{
    done(null , user._id);
})

passport.deserializeUser(async (id , done) => {
    let user = await userModel.findById({_id: id})
    done (null , user)
});
};




module.exports =  initPassaport
