import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loder'
import axios from 'axios';

const EditProject: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<any>(null);
    const [managers, setManagers] = useState<{ _id: string, name: string }[]>([]); // State to hold managers

    // Fetch project data
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:3345/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProjectData();
    }, [id]);

    // Fetch managers
    useEffect(() => {
        const loadManagers = async () => {
            const response = await axios.get('http://localhost:3345/user/all');
            setManagers(response.data);
        };

        loadManagers();
    }, []);

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);
        const updatedProjectData = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            status: formData.get('status') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            priority: formData.get('priority') as string,
            projectManager: formData.get('projectManager') as string, // Get project manager ID
            budget: Number(formData.get('budget')),
            client: formData.get('client') as string,
        };
        let tokenString = localStorage.getItem("token");
        let token: string | null = null; // Declare token with the type that allows null
        if (tokenString) {
            token = JSON.parse(tokenString);
        }


        try {
            const response = await axios.put(`http://localhost:3345/projects/project/edit/${id}`, updatedProjectData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/dashboard/projects');
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    if (!project) return <Loader />;

    return (
        <div className="edit-project text-black">
            <h1 className="text-2xl text-center font-bold">Edit Project</h1>
            <form onSubmit={handleSubmit} className="edit-project-form space-y-4 p-4">
                <div className="form-group">
                    <label className="block">Project Name:</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={project.name}
                        className="w-full p-2 rounded bg-white text-black"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        defaultValue={project.description}
                        className="w-full p-2 rounded bg-white text-black"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block">Status:</label>
                    <select
                        name="status"
                        defaultValue={project.status}
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
                        defaultValue={project.startDate?.split('T')[0]}
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={project.endDate ? project.endDate.split('T')[0] : ''}
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">Priority:</label>
                    <select
                        name="priority"
                        defaultValue={project.priority}
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
                        defaultValue={project.projectManager} // Set default to the current project manager ID
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
                        defaultValue={project.budget}
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <div className="form-group">
                    <label className="block">Client:</label>
                    <input
                        type="text"
                        name="client"
                        defaultValue={project.client}
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                >
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default EditProject;
