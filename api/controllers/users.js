const mongoose = require('mongoose');
const Users = require('../db/models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const api = {};

let mockPerrmisions =  {
    chat: {
        C: true,
        D: true,
        R: true,
        U: true,
    },
    news: {
        C: true,
        D: true,
        R: true,
        U: true,
    },
    setting: {
        C: true,
        D: true,
        R: true,
        U: true,
    }
}
api.setup = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        surName: '',
        firstName: '',
        middleName: '',
        password: 'admin',
        image: '',
        permissionId: 11111,
        permission: mockPerrmisions
    });
    admin.save(error => {
        if(error) throw error;
        console.log('Admin acc set up!');
        res.json({success: true});
    });
};

api.index = (User, SuperToken) => (req, res) => {
    const token = SuperToken;
    if(token) {
        User.find({}, (error, users) => {
            if(error) throw error;
            res.status(200).json(users);
        })
    } else return res.status(403).send({success: false, message: 'Unauth'});
}

api.signup = (User) => (req, res) => {
    let result = JSON.parse(req.text);
    if(!result.username || !result.password) res.json({success: false, message: 'Please enter username and password'});
    else {
        const newUser = new User({
            username: result.username,
            surName: result.surName,
            firstName: result.firstName,
            middleName: result.middleName,
            password: result.password,
            image: result.image,
            permissionId: result.permissionId,
            permission: mockPerrmisions
        });
        newUser.save((error) => {
            if(error) return res.status(400).json({success: false, message: 'Username already exist.'});
            const token = jwt.sign({newUser}, config.secret);
            console.log(newUser)
            res.json({
                access_token: token,
                username: newUser.username,
                surName: newUser.surName,
                firstName: newUser.firstName,
                middleName: newUser.middleName,
                password: newUser.password,
                image: newUser.image,
                permissionId: newUser.permissionId,
                permission: newUser.permission
            });
        })
    }
}

module.exports = api;

/* exports.getUser = ({login, password}) => new Promise(async (resolve, reject) => {
    try {
        let user = await Users.find({username: login, password: password});
        resolve(user)
    } catch (error) {
        reject(error)
    }
})


exports.saveNewUser = ({username, surName, firstName, middleName, password, image, permissionId, permission}) => new Promise(async (resolve, reject) => {
    try {
        if (!username || !password) {
            resolve({
                success: false,
                message: 'username & password required'
            });
            return;
        }

        let existedUser = await Users.find({username: username});
        
        if (!existedUser) {
            resolve({
                success: false,
                message: 'username already existed'
            });
            return;
        }

        let mockPerrmisions =  {
            chat: {
                C: true,
                D: true,
                R: true,
                U: true,
            },
            news: {
                C: true,
                D: true,
                R: true,
                U: true,
            },
            setting: {
                C: true,
                D: true,
                R: true,
                U: true,
            }
        }

        let newUser = new Users({
            username,
            surName,
            firstName,
            middleName,
            password,
            image,
            permissionId,
            permission: mockPerrmisions
        });

        let result = await newUser.save();
        console.log(result)
        let responseResult = {
            access_token: result.access_token || '',
            id: result._id,
            username: result.username,
            surName: result.surName,
            firstName: result.firstName,
            middleName: result.middleName,
            password: result.password,
            img: result.img,
            permissionId: result.permissionId,
            permission: result.permission
        }

        resolve(responseResult);
    }
    catch(err) {
        reject(err);
    }
}) */