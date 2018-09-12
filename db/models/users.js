const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    surName: {
        type: String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    permissionId: {
        type: Number,
        default: Math.random()
    },
    permission: {
        chat: {
            C: {type: Boolean, required: true},
            D: {type: Boolean, required: true},
            R: {type: Boolean, required: true},
            U: {type: Boolean, required: true},
        },
        news: {
            C: {type: Boolean, required: true},
            D: {type: Boolean, required: true},
            R: {type: Boolean, required: true},
            U: {type: Boolean, required: true},
        },
        setting: {
            C: {type: Boolean, required: true},
            D: {type: Boolean, required: true},
            R: {type: Boolean, required: true},
            U: {type: Boolean, required: true},
        }
    }

});

const User = module.exports = mongoose.model('User', schema);