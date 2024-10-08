import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../Loader/Loder'
import { useSelector } from "react-redux";
import { RootState } from "Store/store";


const EditTask: React.FC = (): JSX.Element => {
    const [users, setUsers] = useState<{ _id: string, name: string }[]>([]);
    const [projects, setProjects] = useState<{ _id: string, name: string }[]>([]);
    const [taskData , setTaskdata] = useState<any>(null)
    const userRole = useSelector((state:RootState)=> state.auth.userRole)
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const loadusers = async () => {
        const response = await axios.get('http://localhost:3345/user/all');
        setUsers(response.data);
    };
    const loadprojects = async () => {
        const response = await axios.get('http://localhost:3345/projects/all');
        setProjects(response.data);
    };
    const loadTaskData = async()=>{
        try{
            const response = await axios.get(`http://localhost:3345/tasks/${id}`)
            setTaskdata(response.data);

        }catch(err){
            console.error(err)
        }
    }


    useEffect(() => {
        loadusers();
        loadprojects();
        loadTaskData();
        console.log(taskData);
    }, [id])
    if (!taskData || !taskData.title) {
        return <Loader />
    }

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        for(const[key, value] of formData.entries()){
            console.log(`${key}:${value}`)
        }

        const updateTaskData = {
            title:formData.get('title') as string,
            description:formData.get('description') as string,
            project:formData.get('project') as string,
            assignedTo:formData.get('assignedTo') as string,
            status:formData.get('status') as string,
            dueDate:formData.get('dueDate') as string,
            priority:formData.get('priority') as string
        }
        let tokenString = localStorage.getItem('token');
        let token : string | null = null
        if(tokenString){
            token = JSON.parse(tokenString)
        }

        try{
            const response = await axios.put(`http://localhost:3345/tasks/task/edit/${id}`,updateTaskData, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response){
                navigate(`/dashboard/tasks/task/${id}`)
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <div className="edit-project text-black">
            <h1 className="text-2xl text-center font-bold">Edit Project</h1>
            <form onSubmit={handleSubmit} className="add-task-form p-5 text-white">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-bold">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            disabled = {userRole !== 'admin'}
                            defaultValue={taskData.title}
                            className="w-full p-2 rounded text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-bold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={taskData.description}
                            disabled = {userRole !== 'admin'}

                            className="w-full p-2 rounded text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="project" className="block text-lg font-bold">Project</label>
                        <select
                            id="project"
                            name="project"
                            defaultValue={taskData.project}
                            disabled = {userRole !== 'admin'}

                            className="w-full p-2 rounded text-black"
                            required
                        >
                            <option value="">Select a Project</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>{project.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="assignedTo" className="block text-lg font-bold">Assign To</label>
                        <select
                            id="assignedTo"
                            name="assignedTo"
                            className="w-full p-2 rounded text-black"
                            defaultValue={taskData.assignedTo}
                            required
                            disabled = {userRole !== 'admin'}

                        >
                            <option value="">Select a User</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-lg font-bold">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={taskData.status}
                            className="w-full p-2 rounded text-black"

                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="revision">Revision</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-lg font-bold">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            disabled = {userRole !== 'admin'}

                            className="w-full p-2 rounded text-black"
                            defaultValue={taskData.priority}

                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-lg font-bold">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            disabled = {userRole !== 'admin'}

                            defaultValue={taskData.dueDate?.split('T')[0]}
                            className="w-full p-2 rounded text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Update Task

                    </button>
                </form>
        </div>
        </>
    )
};

export default EditTask;
