import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    logged:{type:Boolean,default:false},
    wrongtries:{type:Number,default:0},
    lockeduntil:{type:Date}
})

const User = mongoose.model('User',userSchema);
export default User;