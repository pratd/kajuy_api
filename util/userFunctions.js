const Boom = require('boom');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const Provider = require('../models/providers');
const Buyer = require('../models/buyers');
async function verifyUniqueUser (req, res){
    //TODO finding the entry in database that matches
    //TODO either email or username

    const user = await User.findOne({
        $or:[
            {email: req.payload.email},
            {username: req.payload.username}
        ]
    });
    //!check whether the username or email
    //!is already taken and error out if so
    if(user){
        if(user.username === req.payload.username){
            throw (Boom.badRequest('Username taken'));
        }
        if(user.email === req.payload.email){
            throw (Boom.badRequest('Email exists'));
        }
    }
    //if everything checks out send the payload through
    //the route handler
    return res.response(req.payload);
}
//TODO: verify credentials after loggedIn

async function verifyCredentials(req, res ){
    const password = req.payload.password;
    //finding the entry from database that 
    //matched either the email or username
    const user = await User.findOne({
        $or:[
            { email: req.payload.email},
            { username: req.payload.username}
        ]
    });
    if(user){
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            throw (Boom.badRequest('Incorrect password! '));
        }
        //send back the provider or buyer item
        if(user.role=="provider"){
            let provider = await Provider.findOne({
                $or:[
                    { email: req.payload.email},
                    { username: req.payload.username}
                ]
            });
            return res.response(provider);
        }else{
            let buyer = await Buyer.findOne({
                $or:[
                    { email: req.payload.email},
                    { username: req.payload.username}
                ]
            });
            return res.response(buyer);
        }
    }
    else{
        throw (Boom.badRequest('Incorrect username or email!'));
    }
}
module.exports = {
    verifyUniqueUser : verifyUniqueUser,
    verifyCredentials: verifyCredentials
};