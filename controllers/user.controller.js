const asyncWrapper = require('../middlewares/asyncWrapper');
const bcrypt = require('bcryptjs');
const User = require('../models/users.schema');
const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');
const generateJwt = require('../utilites/generateJwt');

const userRegister = asyncWrapper(async (req, res) => {
    const {name , email , password , role } = req.body;
    if(!name || !email || !password){
        throw new appError(statusCodeText.FAIL, 400, 'Please provide all required fields: name, email, and password');
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = {name, email, password: hashedPassword, role};
    const existUser = await User.findOne({email}) 
    if(existUser){
        throw new appError(statusCodeText.FAIL, 400, 'User already exists ,please login');
    }
    const user = await new User(newUser);
    const token = await generateJwt({email: user.email , password: user.password, role: user.role});
    user.token = token;
    await user.save();
    res.status(201).json({ status: statusCodeText.SUCCESS, message : "user created succefully" });

});




const userLogIn = asyncWrapper(async(req, res)=>{
    const  {email , password} = req.body;
    if(!email || !password){
        throw new appError(statusCodeText.FAIL, 400, 'Please provide email and password');
    }
    const user = await User.findOne({email});
    if(!user){
        throw new appError(statusCodeText.FAIL, 400, 'User not exist, please register');
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(user && matchedPassword){
        const token = await generateJwt({email: user.email , password: user.password, role: user.role});
        res.status(200).json({ status: statusCodeText.SUCCESS, message : "user logged in successfully", data:{user: {name: user.name, email: user.email ,token,role: user.role} }});
    }else{
        throw new appError(statusCodeText.FAIL, 400, 'Invalid email or password');
    }

})



module.exports = {
    userRegister,
    userLogIn
}