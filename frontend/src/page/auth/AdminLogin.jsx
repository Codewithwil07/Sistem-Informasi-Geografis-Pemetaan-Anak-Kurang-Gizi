import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../../redux/features/auth/authApi';
import {
  selectAuthError,
  selectAuthStatus,
} from '../../redux/features/auth/authSelector';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username: username, password: password }));
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (status === 'successed') {
      navigate('/admin/dashboard');
    }
  });

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 flex-col relative'>
      {status === 'loading' && <p className='font-bold text-center'>Loading</p>}
      {status === 'rejected' && error && (
        <p className='text-red-700 text-base text-center top-32 absolute'>
          Please try again. {error}
        </p>
      )}
      <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md h-80'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>
          Hi, Welcome Admin
        </h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id='username'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='admin'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='••••••••'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
