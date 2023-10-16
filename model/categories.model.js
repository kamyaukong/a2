const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categories = new Schema({
    name:{
        type:String
    }
});

module.exports = mongoose.model('Categories', Categories);