const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    date:{
        type: Date,
    },
    user: {
        
    }
});

module.exports = mongoose.model('News', schema);