import { Router } from "express";
import { addUserToRequest, checkAdmin } from "../Middleware/userMiddleware.js";
import task from '../Modals/taskModal.js'

const taskRouter = Router();

taskRouter.use(addUserToRequest);

taskRouter.get("/", async (req, res) => {
    const user = req.user;
    try {

        let tasks;
        if (user.role && user.role === 'admin') {
            tasks = await task.find()
        }
        else {
            tasks = await task.find({ assignedTo: user._id });
        }
        return res.status(200).json(tasks);
    } catch (e) {
        return res.status(400).json({ msg: e.message, name: "error" })
    }

})
taskRouter.get("/all", async(req,res)=>{
    try {
        const users = await task.find(); 
        res.status(200).json(users);     
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})
taskRouter.get("/:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const getTask = await task.findById(id);
        if(!getTask){
            return res.status(404).json({msg:"task not found",name:'error'})
        }
        return res.status(200).json(getTask);
    }
    catch(err){
        return res.status(400).json({msg:err.message,name:'error'})
    }
})
taskRouter.post('/task/add', checkAdmin, async (req, res) => {
    const user = req.user;
    const { title, description, project, assignedTo, status, dueDate, priority } = req.body;
    try {
        const newTask = new task({
            title,
            description,
            project,
            assignedTo,
            status,
            dueDate,
            priority
        })
        await newTask.save();
        return res.status(200).json({ msg: "task added successfully" })
    } catch (e) {
        return res.status(400).json({ msg: e.message, name: 'error' })
    }
})

taskRouter.put('/task/edit/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const existingTask = await task.findById(id);
        if (!existingTask) {
            return res.status(404).json({ msg: "Task not found" })
        }
        const isAdmin = req.user.role === 'admin';
        if (isAdmin) {
            const updated = await task.findByIdAndUpdate(id, updates, { new: true });
            if (!updated) {
                return res.status(404).json({ msg: "Task not found" });
            }
            return res.status(200).json(updated);
        }
        else if (existingTask.assignedTo._id.toString() === req.user._id.toString()) {
            existingTask.status = updates.status;
            await existingTask.save();
            return res.status(200).json(existingTask);
        } else {
            return res.status(403).json({ message: "Forbidden: You do not have permission to update this task" });
        }
    } catch (e) {
        return res.status(400).json({ msg: e.message, name: "error" })
    }
})
taskRouter.delete('/task/delete/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await task.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ msg: "task not found" })
        }
        return res.status(200).json({ msg: "task deleted successfully" })
    } catch (e) {
        return res.status(400).json({ msg: e.message, name: "error" })
    }
})

export default taskRouter