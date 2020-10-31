const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    }
    ,
    user_type : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
},
{ timestamps: true });


//hash user password before save


module.exports = User = mongoose.model("users", UserSchema);
