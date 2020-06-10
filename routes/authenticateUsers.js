const Boom = require("boom");
const User = require("../models/users");
const authenticateUserSchema = require("../schemas/authenticateUser.js");
const verifyCredentials = require("../util/userFunctions").verifyCredentials;
const createToken = require("../util/token");
const cookie_options = require("../util/cookies_options");
module.exports = {
    method: "POST",
    path: "/login/users",
    config: {
        //check user's password against DB
        pre: [
            { method: verifyCredentials, assign: "user" }, //assigning a key to the user/admin trying login method
        ],
        handler: async (req, res) => {
            //if the password is correct we issue a token
            // if incorrect, the error will bubble up from the pre method
            // return res
            // .response({
            //     id_token: createToken(req.pre.user),
            //     user_info: req.pre.user,
            // })
            // .code(201);
            return res.response({'check Browser Cookie or Auth Header for your Token (JWT), here is the user_info:': req.pre.user})
            .header("id_token", createToken(req.pre.user))
            .state("token", createToken(req.pre.user), cookie_options)
            .code(201);
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
        validate: {
            payload: authenticateUserSchema,
        },
    },
};
