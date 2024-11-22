const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const UserAuthSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        // unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


UserAuthSchema.pre('save',async function(next){
    if(!this.isModified('password'))
        return next();
    const salt = await  bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


UserAuthSchema.methods.matchPassword=async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}

const UserAuthModel=mongoose.model('UserAuth',UserAuthSchema)

module.exports=UserAuthModel
