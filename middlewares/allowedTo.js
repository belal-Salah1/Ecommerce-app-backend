const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');
module.exports = (...roles)=>{
    return (req , res ,next )=>{
        console.log("current User " , req.currentUser);
        if(!roles.includes(req.currentUser.role)){
            throw new appError(statusCodeText.FAIL, 403, 'You do not have permission to perform this action');
        }
        next();
    }
}