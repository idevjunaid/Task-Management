// src/Pages/ProjectDetail.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader/Loder'
import { useSelector } from 'react-redux';
import { RootState } from 'Store/store';


interface project {
    _id: string; // Unique identifier for the project
    name: string; // Name of the project
    description: string; // Description of the project
    client: string; // Client name
    createdBy: string; // ID of the user who created the project
    assignedUsers: string[]; // Array of user IDs assigned to the project
    startDate: string; // Start date in ISO string format
    endDate: string; // End date in ISO string format
    status: string; // Current status of the project (e.g., "in progress")
    priority: 'high' | 'medium' | 'low'; // Priority of the project
    tasks: string[]; // Array of task IDs associated with the project
    createdAt: string; // Date when the project was created
    updatedAt: string; // Date when the project was last updated    
}

const ProjectDetail: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.auth.userRole)
    const { id } = useParams<{ id: string }>(); // Get project ID from URL
    const [project, setProject] = useState<project>(); // Replace 'any' with your project type if defined
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3345/projects/${id}`);
                console.log(response);
                setProject(response.data);
            } catch (error) {
                setError('Failed to fetch project details');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!project) {
        return <div>No project found</div>;
    }
    const handleRemove = async (evt:React.MouseEvent<HTMLButtonElement|HTMLAnchorElement>) => {
        evt.preventDefault();
        let tokenString = localStorage.getItem("token");
        let token: string|null = null
        if(tokenString){
            token = JSON.parse(tokenString);
        }
        try{
            const response = await axios.delete(`http://localhost:3345/projects/project/delete/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/dashboard/projects')

        }catch(error){
            console.error("Error fetching project data:", error);

        }
    }
    const convertDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <>
            <div className='project-detail main-mor p-5 text-white mb-5'>
                <h1 className="title text-center text-[1.8rem] font-bold">{project.name}</h1>
                <p className="description my-5">{project.description}</p>
                <div className="flex gap-[20px]">
                    <div className="other-detail border flex-1 p-2 rounded">
                        <div className='priority flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>prioriy:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{project.priority}</p>
                        </div>
                        <div className='status flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>Status:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{project.status}</p>
                        </div>
                        <div className='client flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>client:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{project.client}</p>
                        </div>
                        <div className="creation-dates flex gap-5">
                            <div className="created flex gap-2">
                                <h1 className="font-bold capitalize text-lg">created At:</h1>
                                <p className="capitilize text-[#2c2c2c] font-semibold">{convertDate(project.createdAt)}</p>
                            </div>
                            <div className="updated flex gap-2">
                                <h1 className="font-bold capitalize text-lg">updated at:</h1>
                                <p className="capitilize text-[#2c2c2c] font-semibold">{convertDate(project.updatedAt)}</p>
                            </div>
                        </div>
                        <div className="due-dates flex gap-5">
                            <div className="start-date flex gap-2">
                                <h1 className="font-bold capitalize text-lg">Start date:</h1>
                                <p className="capitilize text-[#2c2c2c] font-semibold">{convertDate(project.startDate)}</p>
                            </div>
                            <div className="end-date flex gap-2">
                                <h1 className="font-bold capitalize text-lg">end date:</h1>
                                <p className="capitilize text-[#2c2c2c] font-semibold">{convertDate(project.endDate)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tasks-list border flex-1 p-2 rounded">
                        {project.tasks}
                    </div>
                </div>
            </div>
            {userRole === 'admin' ? (
                <div className='flex gap-5'>
                    <Link
                        to={`/dashboard/projects/project/edit/${id}`}
                        className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                    >
                        Edit Project
                    </Link>
                    <button className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg" onClick={handleRemove}>Remove</button>
                </div>
            ) : null}
        </>
    );
};

export default ProjectDetail;
