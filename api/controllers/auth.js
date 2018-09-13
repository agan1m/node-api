const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const api = {};

api.login = (User) => (req, res) => {
    let result = JSON.parse(req.text);
    User.findOne({username: result.username}, (error, user) => {
        if(error) throw error;

        if(!user) res.status(401).send({success: false, message: 'User not found.'});

        else {
            user.comparePassword(result.password, (error, matches) => {
                if(matches && !error) {
                    const token = jwt.sign({user}, config.secret);
                    res.json({success: true, message: 'Token granted', token});
                } else {
                    res.status(401).send({success: false, message: 'Wrong password.'});
                }
            });
        }
    });
};

api.verify = (headers) => {
    if(headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if(split.length === 2) return split[1];
        else return null;
    } else return null;
};

module.exports = api;