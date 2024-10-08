import React from 'react'
import Task from '../Components/Task/Task'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/store'
import { Link } from 'react-router-dom'

const AllTasks:React.FC = ():JSX.Element => {
  const userRole = useSelector((state:RootState)=> state.auth.userRole)

  return (
    <>
      <div className="container">
        <h2 className="title text-[1.8rem] font-bold text-white text-center">All Projects</h2>
        <div className="task-container my-2">
          <Task isDashboard={false} />
        </div>
        {userRole === 'admin' ? (
          <Link
            to="/dashboard/tasks/task/add"
            className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
          >
            Add New Task
          </Link>
        ) : null}

      </div>
    </>
  )
}

export default AllTasks