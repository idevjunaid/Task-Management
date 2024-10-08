import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../Store/task/taskSlice';
import { RootState } from 'Store/store';
import { Link } from 'react-router-dom';
import NotFound from '../../Pages/NotFound';

interface TaskProps {
    tasks?: any[];   // Optional tasks prop
    isDashboard?: boolean;
}

const Task: React.FC<TaskProps> = ({ tasks: propTasks, isDashboard }): JSX.Element => {
    const dispatch = useDispatch();
    const reduxTasks = useSelector((state: RootState) => state.task.tasks);
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    console.log(propTasks, "props")
    // If propTasks are passed, use them; otherwise, use Redux tasks
    const tasks = propTasks || reduxTasks;
    const loadTasks = async () => {
        try {
            const tokenString = localStorage.getItem("token");
            const token = tokenString ? JSON.parse(tokenString) : null;

            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get("http://localhost:3345/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const fetchedTasks = response.data;
            dispatch(setTasks(fetchedTasks));
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    useEffect(() => {
        if (!propTasks) {
            loadTasks();
        }
    }, [dispatch, propTasks]);

    const filteredTasks = React.useMemo(() => {
        const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };

        return isDashboard
            ? tasks
                  .filter(task => task.priority === 'high' || task.priority === 'medium')
                  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                  .slice(0, 3)
            : tasks.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }, [tasks, isDashboard]);

    return (
        <>
            {tasks.length ? (
                <ul className='project-items'>
                    {filteredTasks.map((task) => (
                        <li
                            key={task._id}
                            className="rounded p-2 text-[#2c2c2c] font-semibold project-item flex border-b border-b-[2px] my-2 
                            bg-white bg-opacity-[0.3] backdrop-blur-sm transition-transform transform hover:bg-opacity-[0.5] hover:shadow-lg
                            duration-300 ease-in-out capitalize"
                        >
                            <p className="project-name flex-1">{task.title}</p>
                            <span className="project-status flex-[0.5] text-center">{task.status}</span>
                            <div className="links flex-[0.5] flex justify-between">
                                {!isDashboard ? (
                                    <Link to={`/dashboard/tasks/task/edit/${task._id}`} className='text-[#000]'>
                                        Edit
                                    </Link>
                                ) : (
                                    ''
                                )}
                                <Link to={`/dashboard/tasks/task/${task._id}`} className='text-[#000]'>
                                    View Task Detail
                                </Link>
                            </div>
                        </li>
                    ))}
                    {isDashboard ? (
                        <Link
                            to="/dashboard/tasks"
                            className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
                            backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                        >
                            View All Tasks
                        </Link>
                    ) : null}
                </ul>
            ) : (
                <NotFound name="Tasks" />
            )}
        </>
    );
};

export default Task;
