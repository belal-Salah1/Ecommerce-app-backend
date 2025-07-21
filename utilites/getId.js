const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');
const getId = (req)=>{
    const id=+req.params.id || +req.params.pdId;
    if(!id){
        throw new appError(statusCodeText.FAIL, 400, 'Please provide a valid product ID');
    }
    return id;
}

module.exports =  getId
