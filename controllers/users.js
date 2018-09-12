const Users = require('../db/models/users');


exports.getUser = ({login, password}) => new Promise(async (resolve, reject) => {
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
})