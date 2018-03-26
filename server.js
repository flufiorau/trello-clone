"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");
var mongoose = require("mongoose");
var server = express();
var config = require("./server-config.js"); // get server config file
var User = require("./models/user.js"); // get users mongoose model

server.use(bodyParser.json());
server.use(morgan("dev"));
server.set("superSecret", config.secret);
mongoose.connect(config.database);

server.listen(3000, function () {
    console.log("Server started and listening on port 3000!");
});

server.route("/api/register").post(registerRoute);

function registerRoute(req, res) {
    var newUser = new User({email: req.body.email, password: req.body.password});

    User.create(newUser, function (err, next) {
        if (err) {
            return res.status(500).json({error: err});
        }
        const payload = {userId: next._id};
        var jwtToken = jwt.sign(payload, server.get('superSecret'), {expiresIn: "1h"});
        // send the JWT back to the user
        // set it in the HTTP Response body
        res.status(200).json({jwtToken: jwtToken})
    });
}

server.route("/api/login").post(loginRoute);

function loginRoute(req, res) {
    // find User and validate Email And Password
    User.findOne({email: req.body.email},
        function (err, user) {
            if (err) res.status(500).json({error: err});

            if (!user) {
                res.status(401).json({error: 'Authentication failed. <b>User not found.</b>'})
            } else if (user) {
                // check if password matches
                if (user.password != req.body.password) {
                    res.status(401).json({error: 'Authentication failed. <b>Wrong password.</b>'})
                } else {
                    const payload = {userId: user._id};
                    var jwtToken = jwt.sign(payload, server.get('superSecret'), {expiresIn: "1h"});
                    // send the JWT back to the user
                    // set it in the HTTP Response body
                    res.status(200).json({jwtToken: jwtToken})
                }
            }
        }
    );
}

// route middleware to verify a token
server.route("/api/checklogin").post(checkLoginRoute);

function checkLoginRoute(req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, server.get('superSecret'), function (err, decoded) {
            // if error token
            if (err) {
                return res.send(err);
            } else if (decoded) {
                // if everything is good, save to request for use in other routes
                // and prolongation time of expires
                const payload = {userId: decoded['userId']};
                var jwtToken = jwt.sign(payload, server.get('superSecret'), {expiresIn: "1h"});
                return res.json({jwtToken: jwtToken});
            }
        });
    } else {
        // if there is no token
        return res
    }
}

exports.loginRoute = loginRoute;
