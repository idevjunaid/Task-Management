import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Store/store';
import { setAuthentication } from '../Store/auth/authSlice';

const Navbar: React.FC = (): JSX.Element => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        dispatch(setAuthentication({ isAuthenticated: false, userRole: '' })); // Reset Redux state
        navigate('/'); // Navigate to home page
    };
    return (
        <>
            <nav className="bg-white bg-opacity-20 backdrop-blur-md backdrop-brightness-125 w-full text-white py-5 rounded-lg shadow-lg">
                <div className='container m-[auto]'>
                    <div className='flex justify-between items-center'>
                        <div className='Branding text-[1.5rem] font-bold cursor-none'>Task Manager</div>
                        <ul className='nav-links'>
                            <li className='nav-link font-semibold'>
                                <Link to='/dashboard'>Dashboard</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? <button
                            className="logout border border-white border-2 rounded-md p-2 hover:bg-white hover:text-black transition mx-2"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button> : <div className='user-auth'>
                            <button className="signup border border-white border-2 rounded-md p-2 hover:bg-white hover:text-black transition mx-2">
                                <Link to='/signin'>Sign In</Link>
                            </button>
                            <button className="signup border border-white border-2 rounded-md p-2 hover:bg-white hover:text-black transition mx-2">
                                <Link to='/signup'>Sign Up</Link>
                            </button>
                        </div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
