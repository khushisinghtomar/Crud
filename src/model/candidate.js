const  mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
    // username:String,
    // email:String,
    // password:String
    
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobile_number:{
        type:Number,
    },
    password:{
        type :String,
    },
    confirm_password:{
        type:String,  
    },
    otp:{
        type:Number,  
    },
    deleted:{
        type :Boolean,
        default : false
    },
    isVerify:{
        type:Boolean,
        default:false 

    }
},
    {
    timestamps:true,
    versionKey:false
    }
)  
module.exports = mongoose.model("candidate",candidateSchema)