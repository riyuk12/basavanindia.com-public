const mongoose=require('mongoose')

const Token=mongoose.model('token' ,new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    token:{
        type:String
    }
},{timestamps:true}))

module.exports=Token