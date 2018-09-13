const mongoose = require('mongoose');
const Users = require('../db/models/users');

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
    console.log('!!!!!', req.body)
    if(!req.body.username || !req.body.password) res.json({success: false, message: 'Please enter username and password'});
    else {
        const newUser = new User({
            username: req.body.username,
            surName: req.body.surName,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            password: req.body.password,
            image: req.body.image,
            permissionId: req.body.permissionId,
            permission: mockPerrmisions
        });
        newUser.save((error) => {
            if(error) return res.status(400).json({success: false, message: 'Username already exist.'});
            res.json({success: true, message: 'Account created'});
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