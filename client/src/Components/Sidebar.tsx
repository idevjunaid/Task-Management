import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'Store/store';

const Sidebar = () => {
  const userRole = useSelector((state:RootState)=> state.auth.userRole)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="main-sidebar w-64 h-100 bg-white bg-opacity-20 backdrop-blur-md backdrop-brightness-125 text-gray py-5 rounded-lg shadow-lg px-4">
      <ul className="menu-items space-y-2">
        <li className="menu-item">
          
          
          {userRole === 'admin'?<>
          <Link to="/dashboard/tasks" className="block w-full text-left py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">Tasks</Link>
          </>:<>
            <button 
            onClick={toggleDropdown} 
            className="block w-full text-left py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg"
          >
            Tasks
          </button>
            <ul className={`menu-child-items space-y-1 ${isDropdownOpen ? 'block' : 'hidden'} bg-white bg-opacity-30 p-2 rounded-lg`}>
            <li className="menu-item">
              <Link to="/dashboard/tasks" className="block py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">
                All Tasks
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/dashboard/assignedtasks" className="block py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">
                Assigned Tasks
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/dashboard/completedtasks" className="block py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">
                Completed Tasks
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/dashboard/revisedtasks" className="block py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">
                Tasks Need Revision
              </Link>
            </li>
          </ul>
          </>}
          
        </li>

        <li className="menu-item">
          <Link to="/dashboard/projects" className="block py-2 px-4 hover:bg-white hover:bg-opacity-50 rounded-lg">
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
