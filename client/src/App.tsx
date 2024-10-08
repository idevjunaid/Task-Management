import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.scss';
import Navbar from './Components/Navbar';
import Register from './Components/auth/Register';
import UserDashboard from './Pages/Userdashboard';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Components/auth/Login';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication } from './Store/auth/authSlice';
import { RootState } from './Store/store';
import Loader from './Components/Loader/Loder';

// AuthHandler.tsx (Updated to handle navigation)
const AuthHandler: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      try {
        const response = await axios.get('http://localhost:3345/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const authUser = response?.data.user;
        const authRole = authUser.role;
        dispatch(setAuthentication({ isAuthenticated: true, userRole: authRole }));
        navigate('/dashboard')
      } catch (err) {
        dispatch(setAuthentication({ isAuthenticated: false, userRole: '' }));
        navigate('/signin'); // Redirect to login on error
      }
    } else {
      dispatch(setAuthentication({ isAuthenticated: false, userRole: '' }));
      navigate('/signin'); // Redirect to login if no token
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return null; // This component just handles authentication and navigation
};


const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const ProtectedRoute: React.FC<{ component: React.FC; allowedRoles: string[] }> = ({ component: Component, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
  const DashboardRoute: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    if (userRole === 'admin') {
      return <AdminDashboard />;
    }

    if (userRole === 'user') {
      return <UserDashboard />;
    }

    // You can redirect or return an unauthorized message if the role is not recognized
    return <div>You are not authorized to view this page.</div>;
  };

  return (
    <Router>
      <Navbar />
      <AuthHandler /> {/* This handles the role checking and redirect */}
      <Routes>
        <Route path="/dashboard/*" element={<ProtectedRoute component={DashboardRoute} allowedRoles={['user', 'admin']} />} />
        {/* <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} allowedRoles={['admin']} />} /> */}
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/unauthorized" element={<div>You are not authorized to view this page.</div>} />
      </Routes>
    </Router>
  );
};

export default App;
