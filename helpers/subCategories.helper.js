const appError = require('../utilites/appError');
const statusCodeText = require('../utilites/statusCodeText');

const validateRequiredFields = (...fields) => {
   fields.forEach(field => {
        if(!field){
            throw new appError(statusCodeText.FAIL, 400, `Please provide ${field}`);
        }
    });
};

const validateSubCategoryExists = (subcategory) => {
    if (!subcategory) {
        throw new appError(statusCodeText.FAIL, 400, 'Subcategory not found');
    }
}

const validateSubCategoriesExist = (SubCatagories) => {
        if(!SubCatagories){
        throw new appError(statusCodeText.FAIL, 400, 'No subcategories found');
    }
}

module.exports = {
    validateRequiredFields,
    validateSubCategoryExists,
    validateSubCategoriesExist
};