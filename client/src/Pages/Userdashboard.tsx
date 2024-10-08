import Sidebar from '../Components/Sidebar';
import Projects from '../Components/Projects';
import TaskStats from '../Components/TaskStats';
import { Route, Routes } from 'react-router-dom';
import AllProjects from './AllProjects';
import ProjectDetail from '../Pages/ProjectDetail';
import Task from '../Components/Task/Task';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import AllTasks from './AllTasks';
import TaskDetail from './TaskDetail';
import EditTask from '../Components/Task/EditTask';
import ACRTasks from './ACRTasks';

function Userdashboard() {
  const projects = useSelector((state:RootState)=>state.project.projects)
  console.log(projects)
  return (
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

                {/* Tasks Teaser */}
                <Task isDashboard={true} />
              </div>
            </>
          } />
          <Route path="/projects" element={<AllProjects />}/>
          <Route path="/projects/project/:id" element={<ProjectDetail />} /> {/* New Route */}
          <Route path="/tasks/*" element={<AllTasks />} />
          <Route path="/tasks/task/:id" element={<TaskDetail />}/>
          <Route path="/tasks/task/edit/:id" element={<EditTask />} />
          <Route path="/assignedtasks/*" element={<ACRTasks title='Assigned'  />}/>
          <Route path="/completedtasks/*" element={<ACRTasks pageType="completed" title='Completed'/>}/>
          <Route path="/revisedtasks/*" element={<ACRTasks  pageType="revision" title='Revision'/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Userdashboard;
