import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication } from '../../Store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../Store/store';
import Loader from '../Loader/Loder';

const AuthWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Now inside Router context
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      try {
        const response = await axios.get('http://localhost:3345/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const authUser = response?.data.user;
        const authRole = authUser.role;

        dispatch(setAuthentication({ isAuthenticated: true, userRole: authRole }));

        // Navigate based on the role
        if (authRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (err) {
        dispatch(setAuthentication({ isAuthenticated: false, userRole: '' }));
      }
    } else {
      dispatch(setAuthentication({ isAuthenticated: false, userRole: '' }));
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return children; // Render children (protected routes) once authentication is done
};

export default AuthWrapper;
