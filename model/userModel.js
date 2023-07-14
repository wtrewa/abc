
const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    dob:{type:Date,required:true},
    role:{type:String,enum:['Admin','Explorer'],required:true},
    location:{type:String,required:true},
    password:{type:String,required:true}
})

const userModel = mongoose.model('usercollection',userSchema)
module.exports = userModel;