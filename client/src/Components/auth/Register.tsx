import axios from 'axios';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, setAuthentication } from '../../Store/auth/authSlice';
import { RootState } from 'Store/store';

interface AxiosError {
  response?: {
    data: {
      name: string;
      msg: string;
    };
  };
}

const Register: FC = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const Navigate = useNavigate();


  const handleRegister = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const username = formData.get('username');
    const password = formData.get('password');
    const cpassword = formData.get('cpassword');
    const email = formData.get('email');
    if(password !== cpassword){
      setErrorMsg('Password and Confirm Password should be same');
      return;
    }
    try{
      const response = await axios.post('http://localhost:3345/user/register',{
        firstname,
        lastname,
        username,
        password,
        email
      })
      const token = response?.data.token;
      const role = response?.data.role;
      localStorage.setItem('token', JSON.stringify(token))
      dispatch(clearAuth());
      dispatch(setAuthentication({ isAuthenticated: true, userRole: role }));
      Navigate('/');
  
    }catch(err: unknown){

      const error = err as AxiosError;

      if(error.response && error.response?.data.name === 'error'){
        setErrorMsg(error.response.data.msg)
      }

      setTimeout(() => {
        setErrorMsg('')
      }, 5000);
    }
  
  };
  return (
    <div className='signin-main'>
      <div className='signin-container max-w-[400px] border border-2 p-4 border-black m-[auto]'>
        <form onSubmit={handleRegister}>
          <div className='flex justify-between'>
            <input
              name='firstname'
              type='text'
              required
              className='bg-transparent w-[48%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
              placeholder='First Name'
            />
            <input
              name='lastname'
              type='text'
              className='bg-transparent w-[48%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
              placeholder='Last Name'
            />
          </div>
          <input
            name='username'
            type='text'
            className='bg-transparent w-[100%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
            placeholder='Username'
            required
          />
          <div className='flex justify-between'>
            <input
              name='password'
              type='password'
              className='bg-transparent w-[48%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
              placeholder='Password'
              required
            />
            <input
              name='cpassword'
              type='password'
              className='bg-transparent w-[48%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
              placeholder='Confirm Password'
              required
            />
          </div>
          <input
            name='email'
            type='email'
            className='bg-transparent w-[100%] p-2 text-[1.2rem] placeholder-gray-700 focus:placeholder-transparent border-b-2 border-black focus:outline-none'
            placeholder='Email'
            required
            
          />
          {errorMsg? <p>{errorMsg}</p>: ''}
          <button className='submit border border-2 border-black p-[10px] w-1/2 flex-1 rounded-[10px] mx-[auto] my-4 hover:bg-gray-700 hover:text-white transition hover:bg-black block'>
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already Have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
