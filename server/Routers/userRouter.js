import { Router } from "express";
import userModal from '../Modals/userModal.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { addUserToRequest } from "../Middleware/userMiddleware.js";


const userRouter = Router();


userRouter.get('/', addUserToRequest ,async (req, res)=>{
    res.status(200).json({user:req.user});
})

userRouter.get("/all", async(req,res)=>{
    try {
        const users = await userModal.find(); 
        res.status(200).json(users);     
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})
userRouter.post('/register', async (req, res)=>{
    let data = req.body;
    try{
        const existingUser = await userModal.findOne({username:data['username']});
        if(existingUser){
            return res.status(400).json({msg: 'User already exist', name:'error'})
        }
        const name = (data['firstname']? data['firstname']:'')+' '+(data['lastname']? data['lastname']:'');
        
        const newUser = new userModal({
            name: name,
            username: data['username'],
            password: data['password'],
            email:data['email']
        });
        await newUser.save();
        const userRole = newUser.role
        console.log(userRole);
        const payload = JSON.parse(JSON.stringify(newUser));
        const token = jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: '1h'
        })
        return res.status(200).json({token , role:userRole})
    }catch(e){
        return res.status(400).json({msg: e.message, name: 'error'})
    }
})


userRouter.post('/login', async (req, res)=>{
    let data =  req.body;
    try{
        const user = await userModal.findOne({username: data['username']});
        if(!user){
            return res.status(400).json({msg:"user don't exist",name:'error'});
        }
        const isMatch = await bcrypt.compare(data.password, user.password)
        if(!isMatch){
            return res.status(400).json({msg:'password is incorrect', name: 'error'})
        }
        const payload = JSON.parse(JSON.stringify(user))
        const token = jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn: '1h',
        })
        return res.status(200).json({token, role:user.role })
    }catch(e){
        res.status(400).json({msg: e.message, name:'error'})
    }
})


export default userRouter;