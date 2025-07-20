const mongoose = require('mongoose');
const validator = require('validator');
const userSchema= mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[
            validator.isEmail,
            "Please provide a valid email address"
        ]
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['USER', 'ADMIN', 'MANAGER'],
        default:'user'
    },

});

module.exports = mongoose.model('User', userSchema);