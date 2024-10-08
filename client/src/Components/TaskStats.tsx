import React from 'react';

interface TaskStatsProps {
  title: string;
  count: number;
}

const TaskStats: React.FC<TaskStatsProps> = ({ title, count }) => {
  return (
    <div className="main-mor bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
};

export default TaskStats;
