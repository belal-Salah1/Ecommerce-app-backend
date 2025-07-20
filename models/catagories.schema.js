const mongoose = require('mongoose');

const catagoriesSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    imgSrc:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('Catagorie' , catagoriesSchema);