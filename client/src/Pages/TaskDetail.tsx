import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; // Imported Link correctly here
import { RootState } from 'Store/store'; // Assuming you have the correct store path

interface Task {
    _id: string;
    title: string;
    description?: string;
    project: string;
    assignedTo: string;
    status: 'pending' | 'in-progress' | 'completed' | 'revision';
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
}

const TaskDetail: React.FC = (): JSX.Element => {
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null); // Use `null` instead of `undefined` for better type safety
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3345/tasks/${id}`);
                if (response) {
                    setTask(response.data);
                }
            } catch (err) {
                setError('Task not found');
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const convertDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleRemove = () => {
        // Implement remove logic
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Ensure task is not null before trying to access its properties
    if (!task) {
        return <p>No task details available.</p>;
    }

    return (
        <>
            <div className='task-detail main-mor p-5 text-white mb-5'>
                <h1 className="title text-center text-[1.8rem] font-bold">{task.title}</h1>
                <p className="description my-5">{task.description}</p>
                <div className="flex gap-[20px]">
                    <div className="other-detail border flex-1 p-2 rounded">
                        <div className='priority flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>Project:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{task.project}</p>
                        </div>
                        <div className='priority flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>Priority:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{task.priority}</p>
                        </div>
                        <div className='status flex gap-2'>
                            <h1 className='font-bold capitalize text-lg'>Status:</h1>
                            <p className='capitalize text-[#2c2c2c] font-semibold'>{task.status}</p>
                        </div>
                        <div className="creation-dates flex gap-5">
                            <div className="created flex gap-2">
                                <h1 className="font-bold capitalize text-lg">Created At:</h1>
                                <p className="capitalize text-[#2c2c2c] font-semibold">{convertDate(task.createdAt)}</p>
                            </div>
                            <div className="updated flex gap-2">
                                <h1 className="font-bold capitalize text-lg">Updated At:</h1>
                                <p className="capitalize text-[#2c2c2c] font-semibold">{convertDate(task.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tasks-list border flex-1 p-2 rounded">
                        {/* Assuming task.tasks exists */}
                        {/* <p>{task.tasks}</p> */}
                    </div>
                </div>
            </div>
            {userRole === 'admin' ? (
                <div className='flex gap-5'>
                    <Link
                        to={`/dashboard/tasks/task/edit/${id}`}
                        className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
                        backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                    >
                        Edit Task
                    </Link>
                    <button
                        className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
                        backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default TaskDetail;
