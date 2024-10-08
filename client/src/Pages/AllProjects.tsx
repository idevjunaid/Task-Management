import { RootState } from 'Store/store';
import Projects from '../Components/Projects'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';


const AllProjects = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  return (
    <>
      <div className="container">
        <h2 className="title text-[1.8rem] font-bold text-white text-center">All Projects</h2>
        <div className="projects-container my-2">
          <Projects isDashboard={false} />
        </div>
        {userRole === 'admin' ? (
          <Link
            to="/dashboard/projects/project/add"
            className="btn btn-primary border border-1 tracking-wide border-white text-white px-5 py-2 inline-block capitalize font-bold rounded bg-transparent hover:bg-white hover:border-transparent hover:text-[#2c2c2c] transition
    backdrop-blur-lg backdrop-opacity-30 bg-white/10 hover:bg-white/60 shadow-lg"
          >
            Add New Project
          </Link>
        ) : null}

      </div>
    </>
  )
}

export default AllProjects