import { Router } from "express";
import { addUserToRequest, checkAdmin } from "../Middleware/userMiddleware.js";
import project from "../Modals/projectModal.js";



const projectRouter = Router();

projectRouter.use(addUserToRequest);

projectRouter.get('/' , async (req,res)=>{
    try {
        const user = req.user;
        let projects;
    
        if (user.role === 'admin') {
          projects = await project.find();
        } else {
          // If not admin, return only the projects assigned to the user
          projects = await project.find({ projectManager: user._id });
          console.log(projects)
        }

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
      }
})
projectRouter.get("/all", async(req,res)=>{
    try {
        const users = await project.find(); 
        res.status(200).json(users);     
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})
projectRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    let projectDetail;
    try {
        projectDetail = await project.findById(id);

        if (!projectDetail) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(projectDetail);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'Server error', error });
    }
});
projectRouter.post('/project/add', checkAdmin, async (req, res) => {
    const { name, description, status, startDate, endDate, tasks, assignedUsers, priority, budget, client } = req.body;

    try {
        const newProject = new project({
            name,
            description,
            status,
            startDate,
            endDate,
            tasks,
            assignedUsers,
            createdBy: req.user._id,
            priority,
            budget,
            client,
        });

        await newProject.save();
        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
projectRouter.get("/:id", async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    try{
        const gproject = await project.findById(id);
        console.log(gproject)
        if(gproject){
            return res.status(200).json(gproject);
        }
        return res.status(404).json({msg:"project not found",name:"error"})
    }catch(err){
        return res.status(200).json({msg:err.message,name:"error"})
    }
})
// Update Project
projectRouter.put('/project/edit/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
        const updated = await project.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) {
            return res.status(404).json({ msg: "Project not found" });
        }
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
projectRouter.delete('/project/delete/:id', checkAdmin, async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const deleted = await project.findByIdAndDelete(id);
        if(!deleted){
            response.status(404).json({msg:"project not found", name: "error"})
        } 
        res.status(200).json({msg:"project deleted successfully"})
    }catch(e){
        res.status(400).json({msg:e.message, name:"error"})
    }
})




export default projectRouter