const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Products = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    categtory:{
        type:String
    }
});

module.exports = mongoose.model('Products', Products);