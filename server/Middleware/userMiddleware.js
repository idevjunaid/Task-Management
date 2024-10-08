import jwt from "jsonwebtoken";
import userModal from "../Modals/userModal.js";


const verifyToken =async (req, res, next)=>{
    let auth = req.headers['authotization'];
    let parts = auth.split(" ");
    let token = parts[1];
    req.token = token;
    try{
        jwt.verify(token, process.env.SECET_KEY);
        req.userInfo = jwt.decode(token);
        next();
    }catch(e){
        json.status(400).json({msg:e.message, name:'error'})
    }
} 
const authRoute =async (req, res, next)=>{
    if(!req.user){
        res.status(403).json({msg:'not authorize to access this page',name:'error'})
        return;
    }
    next();
}
const addUserToRequest = async (req,res,next)=>{
    req.user = null;
    try {
        let auth = req.headers["authorization"];
        if (!auth) {
            return next();
        }
        let parts = auth.split(" ");
        let token = parts[1];
        jwt.verify(token, process.env.SECRET_KEY);
        let { username } = jwt.decode(token);
        let user = await userModal.findOne({ username: username });
        req.user = user;

    } catch (err) {
        console.error('Error in middleware:', err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
    return next();
}

const checkAdmin = async(req, res, next)=>{
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied: Only admins can add projects.' });
    }
    next();
}

export { addUserToRequest, verifyToken, authRoute, checkAdmin }