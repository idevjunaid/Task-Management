import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store/store';
import Task from '../Components/Task/Task';

interface ACRTasksProps {
    title: string;
    pageType? :  'completed' | 'revision'; // Task page type
}

const ACRTasks: React.FC<ACRTasksProps> = ({ title, pageType  }): JSX.Element => {
    const tasks = useSelector((state: RootState) => state.task.tasks);

    // Filter tasks based on the provided pageType (completed, revision)
    const filteredTasks = React.useMemo(() => {
        const filtered = tasks.filter(task => {
            if (pageType === 'completed') {
                return task.status === 'completed';
            } else if (pageType === 'revision') {
                return task.status === 'revision';
            } else {
                return true;
            }
        });

        return filtered;
    }, [tasks, pageType]);

    return (
        <div className="container">
            <h2 className="title text-[1.8rem] font-bold text-white text-center">{title} Tasks</h2>
            <div className="task-container my-2">
                <Task tasks={filteredTasks} isDashboard={false} />
            </div>
        </div>
    );
};

export default ACRTasks;
