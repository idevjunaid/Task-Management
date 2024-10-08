import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { setUsername, setPassword, clearAuth, setAuthentication } from '../../Store/auth/authSlice';
import axios from 'axios';

const Login: FC = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const username = useSelector((state: RootState) => state.auth.username);
  const password = useSelector((state: RootState) => state.auth.password);
  const Navigate = useNavigate();


  interface AxiosError {
    response?: {
      data: {
        name: string;
        msg: string;
      };
    };
  }

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();

    try {

      const response = await axios.post('http://localhost:3345/user/login', {
        username,
        password,
      })
      const token = response?.data.token;
      const role = response?.data.role;
      localStorage.setItem('token', JSON.stringify(token))
      dispatch(clearAuth());
      dispatch(setAuthentication({ isAuthenticated: true, userRole: role }));
      Navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.response && error.response.data.name === 'error') {
        setErrorMsg(error.response.data.msg);
      }
      dispatch(clearAuth());
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }


  };

  return (
    <div className='signin-main'>
      <div className='signin-container max-w-[350px] border border-2 p-4 border-black m-[auto]'>
        <h1 className="heading text-[1.5rem] text-black text-center">Sign In</h1>
        <form className='signin-form' method='POST' onSubmit={handleLogin}>
          <input
            name='username'
            type='text'
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            className={`username bg-transparent w-[100%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none ${errorMsg ? 'border-red-600' : ''}`}
            placeholder='Username'
          />
          <input
            name='Password'
            type='password'
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className={`Password bg-transparent w-[100%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none ${errorMsg ? 'border-red-600' : ''}`}
            placeholder='Password'
          />
          {errorMsg ? <p className='text-red-600 capitalize'>{errorMsg}</p> : ''}
          <button className='submit border border-2 border-black p-[10px] w-1/2 flex-1 rounded-[10px] mx-[auto] my-4 hover:bg-gray-700 hover:text-white transition hover:bg-black block'>
            Sign In
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
