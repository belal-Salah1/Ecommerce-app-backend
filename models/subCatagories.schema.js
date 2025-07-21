const mongoose = require('mongoose');
const subCatagorySchema =  mongoose.Schema({
    id :{
        type: Number,
        required: true,
        unique: true
    },
    categories :{
        type: String,
        required: true
    },
    subcategories : {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('SubCatagory', subCatagorySchema);