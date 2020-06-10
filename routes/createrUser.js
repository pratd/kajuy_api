const bcrypt = require("bcrypt");
const Boom = require("boom");
const User = require("../models/users");
const Providers = require("../models/providers");
const Buyer = require("../models/buyers");
const createUserSchema = require("../schemas/createUser");
const verifyUniqueUser = require("../util/userFunctions").verifyUniqueUser;
const createToken = require("../util/token");
const cookie_options = require("../util/cookies_options");
async function hashPassword(password) {
    //generate a salt at level 10 strength
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
        });
    });
    return hashedPassword;
}

module.exports = {
    method: "POST",
    path: "/signup",
    config: {
        // before running the route handler, verify the user is unique
        pre: [{ method: verifyUniqueUser }],
        handler: async (req, res) => {
        let user = new User();
        user.email = req.payload.email;
        user.username = req.payload.username;
        user.role = req.payload.role;

        const hash = await hashPassword(req.payload.password);
        if (!hash) {
            throw Boom.badRequest(err);
        }
        user.password = hash;
        const savedUser = await new Promise((resolve, reject) => {
            //assuming a new promise enable save
            user.save(function (err, user) {
            if (err) {
                throw Boom.badRequest(err);
            }
            resolve(user);
            });
        });
        //if user is saved successfully, issue a JWT
        // and add a new provider or buyer based on the role
        if(user.role == "provider"){
            let providers = new Providers();
            providers.username = req.payload.username;
            providers.email = req.payload.email;
            providers.password = hash;
            providers.user_id = savedUser._id;
            providers.role = req.payload.role;
            const savedProvider = await new Promise((resolve, reject) => {
                //assuming a new promise enable save
                providers.save(function (err, user) {
                if (err) {
                    throw Boom.badRequest(err);
                }
                resolve(providers);
                });
            });
            // return res.response({text: 'Check Browser Cookie or Auth Header for your Token (JWT)'})
            // .header("Authorization: provider", createToken(savedProvider))
            // .state("token", createToken(savedProvider), cookie_options);
            return res.response({ id_token: createToken(savedProvider) }).code(201);
        }else{
            let buyers = new Buyer();
            buyers.username = req.payload.username;
            buyers.email = req.payload.email;
            buyers.password = hash;
            buyers.user_id = savedUser._id;
            buyers.role = req.payload.role;
            const savedBuyer = await new Promise((resolve, reject) => {
                //assuming a new promise enable save
                buyers.save(function (err, user) {
                if (err) {
                    throw Boom.badRequest(err);
                }
                resolve(buyers);
                });
            });
            return res.response({ id_token: createToken(savedBuyer) }).code(201);
        }
        //return res.response({ id_token: createToken(savedUser) }).code(201);
        },
        payload: {
        allow: [
            "application/json",
            "multipart/form-data",
            "image/jpeg",
            "application/pdf",
            "application/x-www-form-urlencoded",
        ],
        multipart: true,
        },
        // //validate the payload against the Joi schema
        validate: {
        payload: createUserSchema,
        //! show the error returned in the fields for POSTMAN
        failAction: (request, h, err) => {
            return err;
        },
        },
    },
};
