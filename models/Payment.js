const mongoose = require('mongoose');
 const PaymentSchema = new mongoose.Schema({
     //write your model attribute here

     createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
 });

 module.exports = mongoose.model('Payment', PaymentSchema);
 