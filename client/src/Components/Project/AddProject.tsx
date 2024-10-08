import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddProject: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [managers, setManagers] = useState<{ _id: string, name: string }[]>([]);

    // Fetch project managers (example)
    const loadManagers = async () => {
        const response = await axios.get('http://localhost:3345/user/all');
        setManagers(response.data);
    };

    useEffect(() => {
        loadManagers();
    }, []);

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);

        const projectData = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            status: formData.get('status') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            priority: formData.get('priority') as string,
            projectManager: formData.get('projectManager') as string,
            budget: Number(formData.get('budget')),
            client: formData.get('client') as string,
        };

        const tokenString = localStorage.getItem('token');
        let token: string | null = null; // Declare token with the type that allows null

        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        
        try {
            const response = await axios.post("http://localhost:3345/projects/project/add", projectData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            // Navigate back to the projects page after successful creation
            navigate('/dashboard/projects'); // Adjust the path as needed
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    return (
        <div className="add-project text-black">
            <h1 className="text-2xl text-center font-bold">Add New Project</h1>
            <form onSubmit={handleSubmit} className="add-project-form space-y-4 p-4">
                <div className="form-group">
                    <label className="block">Project Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-2 rounded bg-white text-black"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        className="w-full p-2 rounded bg-white text-black"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block">Status:</label>
                    <select
                        name="status"
                        className="w-full p-2 rounded bg-white text-black"
                    >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on hold">On Hold</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">Priority:</label>
                    <select
                        name="priority"
                        className="w-full p-2 rounded bg-white text-black"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block">Project Manager:</label>
                    <select
                        name="projectManager"
                        className="w-full p-2 rounded bg-white text-black"
                    >
                        {managers.map((manager) => (
                            <option key={manager._id} value={manager._id}>
                                {manager.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="block">Budget:</label>
                    <input
                        type="number"
                        name="budget"
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">Client:</label>
                    <input
                        type="text"
                        name="client"
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;
