const asyncWrapper = require('../middlewares/asyncWrapper');
const bcrypt = require('bcryptjs');
const User = require('../models/users.schema');
const statusCodeText = require('../utilites/statusCodeText');
const generateJwt = require('../utilites/generateJwt');
const userService = require('../services/user.service ');
const validationHelper = require('../helpers/validation');

const userRegister = asyncWrapper(async (req, res) => {
    const {name , email , password , role } = req.body;
    validationHelper.validateAllFieldsProvided({name , email , password });
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = {name, email, password: hashedPassword, role};
    const existUser = await userService.getUserByEmail(email);
    validationHelper.validateItemExist(!existUser, 'User already exists ,please login');
    const user = await userService.createUser(newUser);
    const token = await generateJwt({email: user.email , password: user.password, role: user.role});
    user.token = token;
    await user.save();
    res.status(201).json({ status: statusCodeText.SUCCESS, message : "user created succefully" });

});



const userLogIn = asyncWrapper(async(req, res)=>{
    const  {email , password} = req.body;
    validationHelper.validateAllFieldsProvided({email, password});
    const user = await userService.getUserByEmail(email);
    validationHelper.validateItemExist(user, 'User does not exist, please register');
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(matchedPassword === false){
        throw new appError(statusCodeText.FAIL, 400, "Invalid password ,please try again");
    }
    if(user && matchedPassword){
        const token = await generateJwt({email: user.email , password: user.password, role: user.role});
        res.status(200).json({ status: statusCodeText.SUCCESS, message : "user logged in successfully", data:{user: {name: user.name, email: user.email ,token,role: user.role} }});
    }

})



module.exports = {
    userRegister,
    userLogIn
}