const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email : {
        type : String,
        required:true,
    },
    name : {
        type : String,
    },
    password : {
        type  :String,
        min : 6,
        max : 24,
    }
});

module.exports = mongoose.model('User', userSchema); // User의 model 값임을 알려준다