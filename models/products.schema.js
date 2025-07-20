const mongoose = require('mongoose');
const productSizes = require('../utilites/productSize')
const productsSchema = mongoose.Schema({
    pdId:{
        type:Number,
        required: true,
        unique: true
    },
    pdName:{
        type:String,
        required: true
    },
    pdDesc:{
        type : String,
        required: true
    },
    pdPrice:{
        type:Number,
        required: true
    },
    pdCategory:{
        type:String,
        required: true
    },
    pdSubCategory:{
        type:String,
        required: true
    },
    pdImg:{
        type:String,
        required: true
    },
    pdSize: {
  type: [mongoose.Schema.Types.Mixed],
  validate: {
    validator: function (arr) {
      const stringSizes = productSizes.productSizesString;
      const numberSizes = productSizes.productSizesNumbers;

      return arr.every((item) => 
        stringSizes.includes(item) || numberSizes.includes(item)
      );
    },
    message: props => `${props.value} contains invalid size`
  }
}
}
)

module.exports = mongoose.model('Product' , productsSchema);

