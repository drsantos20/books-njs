var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

// custom libraries
// routes
var route = require('../app/routes/route');
// model
var Model = require('../app/routes/model');

  passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

    var app = express();
    app.use(express.static(__dirname + '/public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(session({secret: 'secret strategic xxzzz code'}));
    app.use(passport.initialize());
    app.use(passport.session());



    // GET
    app.get('/', route.index);

    // signin
    // GET
    app.get('/signin', route.signIn);
    // POST
    app.post('/signin', route.signInPost);

    // signup
    // GET
    app.get('/signup', route.signUp);
    // POST
    app.post('/signup', route.signUpPost);

    // logout
    // GET
    app.get('/signout', route.signOut);

    
    load('routes',{cwd: 'app',verbose:true})
        .then('infra')
        .into(app);

    app.use(function(req, res, next){
        res.status(404).render("erros/404");
        next();
    });

    app.use(function(error,req, res, next){
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
            console.log(error);
            return;
        }
        next(error);        
    });

    
    //tem que colocar na ordem, caso contrário ele passa pelo middleware e 
    //ainda não vai ter acontecido nenhum erro.

    return app;
};