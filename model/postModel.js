
const mongoose = require('mongoose')

const postSchema =  new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'usercollection',required:true},
    name:{type:String,required:true},
    likes:{type:[String],default:[]},
    comments:{type:[String],default:[]},
    tags:[String],
})

const postModel = mongoose.model('postcollection',postSchema)
module.exports = postModel;