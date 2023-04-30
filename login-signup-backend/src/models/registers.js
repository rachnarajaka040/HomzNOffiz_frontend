const mongoose=require('mongoose');
const logInSchema=new mongoose.Schema({
//blueprint
name:{type:String,required:true},
password:{type:String,required:true}
},
{
    timestamps:true,
})
const LogInCollection=new mongoose.model('LoginCollection',logInSchema);
module.exports=LogInCollection;