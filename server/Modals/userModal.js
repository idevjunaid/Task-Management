import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";

dotenv.config();



const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user' 
    }
}, {
    timestamp: true,
})


userSchema.pre('save', async function(next){
    let user = this;
    if(user.isModified('password')){
        try{
            const hash = await bcrypt.hash(user.password,+process.env.SWF)
            console.log(hash)
            user.password = hash;
            next();
        }catch(e){
            next(e)
        }
    }else{
        next();
    }
})


userSchema.methods.comparePassword = async function(canPassword, cb){
    try{
        const isMatch = bcrypt.comparePassword(canPassword,this.password)
        cb(null, isMatch)
    }catch(e){
        cb(err)
    }
}


const user = mongoose.model('user', userSchema);


export default user