const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');

validateDataExist = (data, message)=>{
    if(!data){
        throw new appError(statusCodeText.FAIL, 400, message);
    }
}

validateItemExist = (item,message) =>{
    if(!item){
        throw new appError(statusCodeText.FAIL, 400, message);
    }
}

validateAllFieldsProvided = (fieldsObj) => {
const [key] = Object.entries(fieldsObj).find(([_, value]) => !value) || [];
  if (key) {
    throw new appError(statusCodeText.FAIL, 400, `Please provide ${key}`);
  }

}


module.exports = {
validateDataExist,
validateItemExist,
validateAllFieldsProvided
}