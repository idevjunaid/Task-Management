import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import React from 'react'
import TaskStats from '../Components/TaskStats';
import Projects from '../Components/Projects';
import AllProjects from './AllProjects';
import ProjectDetail from './ProjectDetail';
import AddProject from '../Components/Project/AddProject';
import EditProject from '../Components/Project/EditProject';
import AllTasks from './AllTasks';
import TaskDetail from './TaskDetail';
import AddTask from '../Components/Task/AddTask';
import EditTask from '../Components/Task/EditTask';
import Task from '../Components/Task/Task';
import ACRTasks from './ACRTasks';

const AdminDashboard:React.FC = ():JSX.Element => {
  return (
    <>
        <div className="main flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={
            <>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-[20px]">
                <TaskStats title="Assigned Tasks" count={5} />
                <TaskStats title="Completed Tasks" count={3} />
                <TaskStats title="Revision Tasks" count={2} />
              </div>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {/* Projects Teaser */}
                <Projects isDashboard={true} />
                <Task isDashboard={true} />
                {/* Tasks Teaser */}
              </div>
            </>
          } />
          <Route path="/projects/*" element={<AllProjects />}/>
          <Route path="/projects/project/:id" element={<ProjectDetail />} /> {/* New Route */}
          <Route path="/projects/project/add" element={<AddProject />} /> {/* New Route */}
          <Route path="/projects/project/edit/:id" element={<EditProject />} /> {/* New Route */}
          <Route path="/tasks/*" element={<AllTasks />}/>
          <Route path="/tasks/task/:id" element={<TaskDetail />}/>
          <Route path="/tasks/task/add" element={<AddTask />} /> {/* New Route */}
          <Route path="/tasks/task/edit/:id" element={<EditTask />} /> {/* New Route */}
        </Routes>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard