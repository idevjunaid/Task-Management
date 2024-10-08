import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProjects } from '../Store/project/projectSlice';
import { RootState } from 'Store/store';
import NotFound from '../Pages/NotFound';

interface ProjectsProps {
    isDashboard?: boolean; // Optional prop to indicate if it's on the dashboard
}

const Projects: React.FC<ProjectsProps> = ({ isDashboard }) => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.project.projects);
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    const loadProjects = async () => {
        try {
            const tokenString = localStorage.getItem("token");
            const token = tokenString ? JSON.parse(tokenString) : null;

            if (!token) {
                throw new Error("No token found");
            }
            console.log(token)

            const response = await axios.get("http://localhost:3345/projects", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response)
            const fetchedProjects = response.data;
            dispatch(setProjects(fetchedProjects));
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    useEffect(() => {
        loadProjects();
        console.log(projects)
    }, [dispatch]);

    const filteredProjects = React.useMemo(() => {
        const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };

        return isDashboard
            ? projects
                .filter(project => project.priority === 'high' || project.priority === 'medium')
                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                .slice(0, 3) // Get only the top 3 high-priority projects
            : projects.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); // Create a shallow copy before sorting
    }, [projects, isDashboard]);

    return (
        <>
        {projects.length?             <ul className='project-items'>
                {filteredProjects.map((project) => (
                    <li key={project._id} className="rounded p-2 text-[#2c2c2c] font-semibold project-item flex border-b border-b-[2px] my-2 
                    bg-white bg-opacity-[0.3] backdrop-blur-sm transition-transform transform hover:bg-opacity-[0.5] hover:shadow-lg
                    duration-300 ease-in-out capitalize">
                        <p className="project-name flex-1">{project.name}</p>
                        <span className="project-status flex-[0.5] text-center">{project.status}</span>
                        <div className="links flex-[0.5] flex justify-between">
                            {userRole === 'admin' ? (
                                <Link to={`/dashboard/projects/project/edit/${project._id}`} className='text-[#000]'>Edit</Link>
                            ) : null}
                            <Link to={`/dashboard/projects/project/${project._id}`} className='text-[#000]'>View Project</Link>
                        </div>
                    </li>
                ))}
                {isDashboard ? (
                    <Link
                        to="/dashboard/projects"
                        className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
                        backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                    >
                        View All Projects
                    </Link>
                ) : null}
            </ul>: 
            <NotFound name={'pojects'}/>}
        </>
    );
};

export default Projects;
