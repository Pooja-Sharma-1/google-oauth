var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const user = require('./users.js')
require('dotenv').config()

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'https://google-oauth-ix3i.onrender.com/oauth2/redirect/google',
  scope: ['email', 'profile']
},
  async function verify(issuer, profile, cb) {
    console.log(profile)
    try{
      let existingUser= await user.findOne({email:profile.emails[0].value})
      if(existingUser){
        return cb(null,existingUser)
      }
      else{
        let newUser=await user.create({name:profile.displayName,email:profile.emails[0].value})
        return cb(null,newUser)
      }
    }
    catch(err){
      console.log(err)
      return err;
    }

  }));

/* GET home page. */
router.get('/', function (req, res, next) {
  if(req.user){
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect('/login')
  }
});


router.get('/login', function (req, res, next) {
  if(!req.user){
    res.render('login');
  }
  else{
    res.redirect('/')
  }
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
