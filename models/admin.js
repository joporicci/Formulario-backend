import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    wrongtries:{type:Number,default:0},
    lockeduntil:{type:Date}
})

const Admin =  mongoose.model('Admin',adminSchema);

export default Admin;