import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = (): JSX.Element => {
    const [users, setUsers] = useState<{ _id: string, name: string }[]>([]);
    const [projects, setProjects] = useState<{ _id: string, name: string }[]>([]);
    const navigate = useNavigate();

    const loadusers = async () => {
        const response = await axios.get('http://localhost:3345/user/all');
        setUsers(response.data);
    };
    const loadprojects = async () => {
        const response = await axios.get('http://localhost:3345/projects/all');
        setProjects(response.data);
    };


    useEffect(() => {
        loadusers();
        loadprojects();
    }, [])


    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            project: formData.get('project'),
            assignedTo: formData.get('assignedTo'),
            status: formData.get('status'),
            priority: formData.get('priority'),
            dueDate: formData.get('dueDate'),
        }
        const tokenString = localStorage.getItem('token');
        let token: string | null = null
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        try {
            const response = await axios.post("http://localhost:3345/tasks/task/add", taskData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response);
            navigate('/dashboard/tasks')
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <div className="add-project text-black">
                <h1 className="text-2xl text-center font-bold">Add New Task</h1>
                <form onSubmit={handleSubmit} className="add-task-form p-5 text-white">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-bold">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full p-2 rounded text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-bold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-2 rounded text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="project" className="block text-lg font-bold">Project</label>
                        <select
                            id="project"
                            name="project"
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
                            required
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
                            className="w-full p-2 rounded text-black"
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
                            className="w-full p-2 rounded text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddTask