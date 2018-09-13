const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

schema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if(error) return next(error);
            bcrypt.hash(user.password, salt, (error, hash) => {
                if(error) return next(error);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

schema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
        if(error) return callback(error);
        callback(null, matches);
    });
};

module.exports = mongoose.model('User', schema);