let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User MOdel instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next ) => {
    res.render('index', {title: 'home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next ) => {
    res.render('index', {title: 'about',displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req, res, next ) => {
    res.render('index', {title: 'projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next ) => {
    res.render('index', {title: 'services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayBusinesscontactlistPage = (req, res, next ) => {
    res.render('index', {title: 'businesscontactlist', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next ) => {
    res.render('index', {title: 'contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next ) => {
    res.render('index', {title: 'login', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayListPage = (req, res, next) => {
    res.render('index', {title: 'data', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
     // server error
     if(err)
     {
        return next(err);
     }
     // is ther a user login error?
     if(!user)
     {
        req.flash('loginMessage', 'Authentication Error');
        return res.redirect('/login');
     }
     req.login(user, (err) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        return res.redirect('/data');
     });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    //checlk if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>{
    // instantiate a user object

    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err, ) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registraion Error: User Already Exists'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exist, then registration is successful

            // redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/data')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}