import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="Login-container flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="Login-bg w-full p-6 rounded-lg bg-gray-600">
        <h1 className="Login-header text-3xl font-semibold text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="Login-form"
        >
          <div className="Username-container">
            <label
              htmlFor="username"
              className="label p-2"
            >
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Password-container">
            <label
              htmlFor="password"
              className="label p-2"
            >
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to={'/signup'}
            className="text-sm hover:underline hover:text-blue-600 cursor-pointer mt-2"
          >
            Don't have an account?{' '}
          </Link>
          <button className="btn btn-block btn-sm mt-2">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
