require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Boom = require("boom");
const glob = require("glob");
const path = require("path");
// Mongoose.connect(process.env.MONGODB_URI, {
Mongoose.connect('mongodb://localhost/kajuy',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// creating new server instance
const server = new Hapi.Server({
    // debug: { request: ['error'] },
    host: process.env.HOST,
    port: process.env.PORT || 3000,
    routes: {
        files: {
            relativeTo: path.join(__dirname, "/uploads"),
        },
        cors: {
            origin: ["*"],
            // allowCredentials: true,
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: [
                "X-Requested-With",
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
            ],
        },
    },
});

//validation function for the token
const validateFunc = async (decoded, request) => {
    if (decoded) {
        return { isValid: true };
    }
    return { isValid: false };
};

//SERVER BOOTUP
const bootUpServer = async () => {
    await server.register(require("@hapi/inert"));
    await server.register([require("hapi-auth-jwt2")]);

    server.auth.strategy("jwtokenization", "jwt", {
        key: process.env.SECRET,
        verify: {
            // ignoreExpiration: true,
            algorithms: ['HS256'] },
        validate: validateFunc,
    });
    glob
    .sync("routes/*.js", {
        root: __dirname,
    })
    .forEach((file) => {
        const route = require(path.join(__dirname, file));
        server.route(route);
    });
    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
    process.on("unhandledRejection", (err) => {
        console.log(err);
        process.exit(1);
    });
};
bootUpServer();

module.exports = server;