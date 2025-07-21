const User = require('../models/users.schema');

const createUser = (newUser)=>{
    return new User(newUser);
}


const getUserByEmail = (email)=>{
    return  User.findOne({email});
}

module.exports = {
    createUser,
    getUserByEmail
}